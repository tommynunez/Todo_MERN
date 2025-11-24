import { InviteRepository } from "../repositories/inviteRepository";
import { generateInviteToken, verifyInviteToken } from "../utils/inviteToken";
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
import { InviteStatuses } from "../constants/InviteStatuses";
import { InviteTypes } from "../constants/InviteType";
import { Types } from "mongoose";
import ChoreListService from "./choreListService";
import { IChoreListUpdate } from "../interfaces/choreListInterfaces";
import { Role } from "../constants/Roles";
import { sendEmail } from "../infrastructure/email/maileroo.wraper";

export class InviteService implements IInviteService {
  constructor(
    private choreListService: ChoreListService,
    private userService: UserService,
    private inviteRepository: InviteRepository
  ) {}

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

  getInvitebyIdAsync = async (
    id: Types.ObjectId
  ): Promise<IInviteResponse | null> =>
    await this.inviteRepository.getInvitebyIdAsync(id);

  inactivateInviteAsync = async (
    inviteDelete: IInviteDelete
  ): Promise<boolean> =>
    await this.inviteRepository.inactivateInviteAsync(inviteDelete);

  verifyInviteandUpdateAsync = async (
    invite: IInviteUpdate
  ): Promise<boolean> => {
    const existingInvite = await this.inviteRepository.getInvitebyTokenAsync(
      invite.token
    );
    if (!existingInvite) {
      throw new Error("Invite not found");
    }

    const decodedToken = await verifyInviteToken(existingInvite.token);

    const wasTokenResent = await this.resendInviteonExpiretokensAsync(
      decodedToken,
      existingInvite
    );
    const wasTokenRevoked = await this.revokedTokenAsync(
      decodedToken,
      existingInvite
    );

    if (wasTokenResent || wasTokenRevoked) {
      return false;
    }

    console.log("Invite token was successful");
    // Update the invite details
    existingInvite.status = InviteStatuses.Accepted;

    const wasListUpdated = await this.addInvitedUserToChoreListAsync(
      decodedToken.email,
      decodedToken.listId,
      decodedToken.role
    );

    if (!wasListUpdated) {
      console.error(
        `Couldn't add user to the chore list ${decodedToken.listId}`
      );
      return false;
    }
    await existingInvite.save();
    return true;
  };

  private addInvitedUserToChoreListAsync = async (
    email: string,
    listId: string,
    role: Role
  ) => {
    const user = await this.userService.getUserbyEmailAddressAsync(email);

    return await this.choreListService.updateChorelistAsync(listId, {
      shareWith: [{ userId: user?.id, role: role }],
    } as IChoreListUpdate);
  };

  private sendInviteAsync = async (invite: IInviteAdd): Promise<string> => {
    const userDoc = await this.userService.getUserbyEmailAddressAsync(
      invite.email
    );
    let token = "";
    invite.status = InviteStatuses.Pending;

    //user exists, lets send the email for the chore list invite
    if (userDoc) {
      console.log(
        `Generate token for ${invite.email} and list ${invite.listId} with role ${invite.role}`
      );
      token = await generateInviteToken(
        invite.listId,
        invite.email,
        invite.role,
        InviteTypes.ChoreList
      );

      invite.type = InviteTypes.ChoreList;
      //send email to user with invite link
      await sendEmail("INVITE_EMAIL", userDoc.emailAddress, {
        inviterName: invite.inviterName,
        recipientName: invite.email,
        inviteLink: "https://yourapp.com/invite/abc123",
      });
    } else {
      //user will need to signup first
      invite.type = InviteTypes.Registration;

      //send email to have the user signup
      await sendEmail("INVITE_REGISTRATION_EMAIL", invite.email, {
        inviterName: invite.inviterName,
        recipientName: invite.email,
        registrationLink: "https://yourapp.com/invite/abc123",
      });
    }

    return token;
  };

  private resendInviteonExpiretokensAsync = async (
    decodedToken: InvitePayload,
    existingInvite: IInvite
  ): Promise<Boolean> => {
    if (decodedToken.status == InviteStatuses.Expired) {
      existingInvite.status = InviteStatuses.Expired;
      existingInvite.isNew = false;
      await existingInvite.save();

      const token = generateInviteToken(
        existingInvite.listId,
        existingInvite.email,
        existingInvite.role,
        InviteTypes.ChoreList
      );

      await this.inviteRepository.createInviteAsync({
        email: existingInvite.email,
        listId: existingInvite.listId,
        role: existingInvite.role,
        token: token,
        type: existingInvite.type,
        status: InviteStatuses.Pending,
      } as IInvite);

      //Todo: send new token
      return true;
    }
    return false;
  };

  private revokedTokenAsync = async (
    decodedToken: InvitePayload,
    existingInvite: IInvite
  ): Promise<Boolean> => {
    if (decodedToken.status === InviteStatuses.Revoked) {
      console.log("Invalid token payload");
      existingInvite.status = InviteStatuses.Revoked;
      existingInvite.isNew = false;
      await existingInvite.save();
      return false;
    }
    return true;
  };
}
