import {
  getInvitebyEmailAsync,
  inactivateInviteAsync,
  inviteModel,
} from "../models/invitesModel";
import { generateInviteToken, verifyInviteToken } from "../utils/inviteToken";
import {
  IInviteService,
  IInvite,
  IInviteAdd,
  IInviteDelete,
  IInviteUpdate,
} from "../interfaces/inviteInterface";
import UserService from "./userService";
import { InviteStatuses } from "../constants/InviteStatuses";
import { InviteTypes } from "../constants/InviteType";
import { Types } from "mongoose";
import ChoreListService from "./choreListService";
import { IChoreListUpdate } from "../interfaces/choreListInterfaces";
import { Role } from "../constants/Roles";

export default class InviteService implements IInviteService {
  userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  inactivateInviteAsync = async (
    inviteDelete: IInviteDelete,
  ): Promise<boolean> => await inactivateInviteAsync(inviteDelete);

  getInvitebyIdAsync = async (id: Types.ObjectId): Promise<IInvite | null> =>
    await this.getInvitebyIdAsync(id);

  createInviteAsync = async (invite: IInviteAdd): Promise<boolean> => {
    // Logic to send an invite to the provided email
    const hasInvitepending = await getInvitebyEmailAsync(invite.email);
    if (hasInvitepending) {
      return false;
    }

    const userDoc = await this.userService.getUserbyEmailAddressAsync(
      invite.email,
    );
    let token = "";
    invite.status = InviteStatuses.Pending;

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

      //Todo: send email logic would go here
    } else {
      //user will need to signup first
      invite.type = InviteTypes.Registration;
      //Todo: send email to have the user signup
    }

    await inviteModel.create({
      email: invite.email,
      listId: invite.listId,
      role: invite.role,
      token: token,
      type: invite.type,
      status: invite.status,
    });
    return true;
  };

  verifyInviteandUpdateAsync = async (
    invite: IInviteUpdate,
  ): Promise<boolean> => {
    const existingInvite = await inviteModel.findById({ token: invite.token });
    if (!existingInvite) {
      throw new Error("Invite not found");
    }

    const decodedToken = await verifyInviteToken(existingInvite.token);

    if (decodedToken.status == InviteStatuses.Expired) {
      existingInvite.status = InviteStatuses.Expired;
      existingInvite.isNew = false;
      await existingInvite.save();

      const token = generateInviteToken(
        existingInvite.listId,
        existingInvite.email,
        existingInvite.role,
        InviteTypes.ChoreList,
      );

      inviteModel.create({
        email: existingInvite.email,
        listId: existingInvite.listId,
        role: existingInvite.role,
        token: token,
        type: existingInvite.type,
        status: InviteStatuses.Pending,
      });

      //Todo: send new token
      return false;
    }

    if (decodedToken.status === InviteStatuses.Revoked) {
      console.log("Invalid token payload");
      existingInvite.status = InviteStatuses.Revoked;
      existingInvite.isNew = false;
      await existingInvite.save();
      return false;
    }

    console.log("Invite token was successful");
    // Update the invite details
    existingInvite.status = InviteStatuses.Accepted;

    const wasListUpdated = await this.addInvitedUserToChoreListAsync(
      decodedToken.email,
      decodedToken.listId,
      decodedToken.role,
    );

    if (!wasListUpdated) {
      return false;
    }
    await existingInvite.save();
    return true;
  };

  private addInvitedUserToChoreListAsync = async (
    email: string,
    listId: string,
    role: Role,
  ) => {
    const userService = new UserService();
    const user = await userService.getUserbyEmailAddressAsync(email);

    const choreListService = new ChoreListService();
    return await choreListService.updateDocumentAsync(listId, {
      shareWith: [{ userId: user?.id, role: role }],
    } as IChoreListUpdate);
  };
}
