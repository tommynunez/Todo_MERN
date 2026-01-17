import { InviteRepository } from "../repositories/inviteRepository";
import {
  IInviteService,
  IInvite,
  IInviteAdd,
  IInviteDelete,
  IInviteUpdate,
  InvitePayload,
  IInviteResponse,
} from "../interfaces/inviteInterface";
import UserService from "./userService";
import { TokenStatuses } from "../constants/TokenStatuses";
import { InviteTypes } from "../constants/InviteType";
import { Types } from "mongoose";
import ChoreListService from "./choreListService";
import { IChoreListUpdate } from "../interfaces/choreListInterfaces";
import { Role } from "../constants/Roles";
import { sendEmail } from "../infrastructure/email/maileroo.wraper";
import { generateInviteToken, verifyToken } from "../utils/token";

export class InviteService implements IInviteService {
  constructor(
    private choreListService: ChoreListService,
    private userService: UserService,
    private inviteRepository: InviteRepository,
  ) {}

  //#region Public Methods
  /**
   * Create an invite and send email
   * @param invite
   * @returns boolean
   */
  createInviteAsync = async (invite: IInviteAdd): Promise<boolean> => {
    // Logic to send an invite to the provided email
    try {
      const hasInvitepending =
        await this.inviteRepository.getInvitebyEmailAsync(invite.email);
      if (hasInvitepending) {
        return false;
      }

      const token = await this.sendInviteAsync(invite);

      await this.inviteRepository.createInviteAsync({
        email: invite.email,
        listId: invite.listId,
        role: invite.role,
        token: token,
        type: invite.type,
        status: invite.status,
      } as IInvite);
      return true;
    } catch (error) {
      console.error("Something went wrong will sending an invite");
      return false;
    }
  };

  /**
   * Get invite by ID
   * @param id
   * @returns IInviteResponse | null
   */
  getInvitebyIdAsync = async (
    id: Types.ObjectId,
  ): Promise<IInviteResponse | null> =>
    await this.inviteRepository.getInvitebyIdAsync(id);

  /**
   *  Inactivate an invite
   * @param inviteDelete
   * @returns boolean
   */
  inactivateInviteAsync = async (
    inviteDelete: IInviteDelete,
  ): Promise<boolean> =>
    await this.inviteRepository.inactivateInviteAsync(inviteDelete);

  /**
   * Verify invite token and update chore list sharing
   * @param invite
   * @returns boolean
   */
  verifyInviteandUpdateAsync = async (
    invite: IInviteUpdate,
  ): Promise<boolean> => {
    const existingInvite = await this.inviteRepository.getInvitebyTokenAsync(
      invite.token,
    );
    if (!existingInvite) {
      throw new Error("Invite not found");
    }

    const decodedToken = await verifyToken(
      existingInvite.token,
      process.env.NODE_INVITE_JWT_SECRET,
    );

    const wasTokenResent = await this.resendInviteonExpiretokensAsync(
      decodedToken,
      existingInvite,
    );
    const wasTokenRevoked = await this.revokedTokenAsync(
      decodedToken,
      existingInvite,
    );

    if (wasTokenResent || wasTokenRevoked) {
      return false;
    }

    console.log("Invite token was successful");
    // Update the invite details
    existingInvite.status = TokenStatuses.Accepted;

    const wasListUpdated = await this.addInvitedUserToChoreListAsync(
      decodedToken.email,
      decodedToken.listId,
      decodedToken.role,
    );

    if (!wasListUpdated) {
      console.error(
        `Couldn't add user to the chore list ${decodedToken.listId}`,
      );
      return false;
    }
    await existingInvite.save();
    return true;
  };
  //#endregion

  //#region Private Methods
  /**
   * Add invited user to chore list
   * @param email
   * @param listId
   * @param role
   * @returns boolean
   */
  private addInvitedUserToChoreListAsync = async (
    email: string,
    listId: string,
    role: Role,
  ) => {
    const user = await this.userService.getUserbyEmailAddressAsync(email);

    return await this.choreListService.updateChorelistAsync(listId, {
      shareWith: [{ userId: user?.id, role: role }],
    } as IChoreListUpdate);
  };

  private sendInviteAsync = async (invite: IInviteAdd): Promise<string> => {
    const userDoc = await this.userService.getUserbyEmailAddressAsync(
      invite.email,
    );
    let token = "";
    invite.status = TokenStatuses.Pending;

    //user exists, lets send the email for the chore list invite
    if (userDoc) {
      console.log(
        `Generate token for ${invite.email} and list ${invite.listId} with role ${invite.role}`,
      );
      token = await generateInviteToken(
        invite.listId,
        invite.email,
        invite.role,
        InviteTypes.ChoreList,
      );

      invite.type = InviteTypes.ChoreList;
      //send email to user with invite link
      await sendEmail("INVITE_EMAIL", userDoc.emailAddress, {
        inviterName: invite.inviterName,
        recipientName: invite.email,
        inviteLink: "https://yourapp.com?token=" + token,
      });
    } else {
      //user will need to signup first
      invite.type = InviteTypes.Registration;

      //send email to have the user signup
      await sendEmail("INVITE_REGISTRATION_EMAIL", invite.email, {
        inviterName: invite.inviterName,
        recipientName: invite.email,
        registrationLink: "https://yourapp.com?token=" + token,
      });
    }

    return token;
  };

  /**
   * Resend invite on expired tokens
   * @param decodedToken
   * @param existingInvite
   * @returns boolean
   */
  private resendInviteonExpiretokensAsync = async (
    decodedToken: InvitePayload,
    existingInvite: IInvite,
  ): Promise<Boolean> => {
    if (decodedToken.status == TokenStatuses.Expired) {
      existingInvite.status = TokenStatuses.Expired;
      existingInvite.isNew = false;
      await existingInvite.save();

      const token = generateInviteToken(
        existingInvite.listId,
        existingInvite.email,
        existingInvite.role,
        InviteTypes.ChoreList,
      );

      await this.inviteRepository.createInviteAsync({
        email: existingInvite.email,
        listId: existingInvite.listId,
        role: existingInvite.role,
        token: token,
        type: existingInvite.type,
        status: TokenStatuses.Pending,
      } as IInvite);

      //send new token
      await sendEmail("INVITE_EMAIL", existingInvite.email, {
        inviterName: existingInvite.inviterName,
        recipientName: existingInvite.email,
        inviteLink: "https://yourapp.com?token=" + token,
      });
      return true;
    }
    return false;
  };

  /**
   * Handle revoked tokens
   * @param decodedToken
   * @param existingInvite
   * @returns boolean
   */
  private revokedTokenAsync = async (
    decodedToken: InvitePayload,
    existingInvite: IInvite,
  ): Promise<Boolean> => {
    if (decodedToken.status === TokenStatuses.Revoked) {
      console.log("Invalid token payload");
      existingInvite.status = TokenStatuses.Revoked;
      existingInvite.isNew = false;
      await existingInvite.save();
      return false;
    }
    return true;
  };
  //#endregion
}
