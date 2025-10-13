import inviteModel from "../models/invitesModel";
import { generateInviteToken, verifyInviteToken } from "../utils/inviteToken";
import {
  IInviteService,
  IInvite,
  IInviteAdd,
  IInviteDelete,
  IInviteUpdate,
} from "../interfaces/inviteInterface";
import UserService from "./userService";
import { InviteStatuses, InviteStatus } from "../constants/InviteStatuses";
import { InviteTypes } from "../constants/InviteType";

export default class InviteService implements IInviteService {
  constructor() {}

  createInviteAsync = async (invite: IInviteAdd): Promise<boolean> => {
    // Logic to send an invite to the provided email
    const userService = new UserService();
    const userDoc = await userService.getUserbyEmailAddressAsync(invite.email);
    let token = "";
    invite.status = InviteStatuses.Pending;

    //user exists, lets send the email for the invite
    if (userDoc) {
      console.log(
        `Generate token for ${invite.email} and list ${invite.listId} with role ${invite.role}`
      );
      token = await generateInviteToken(
        invite.listId,
        invite.email,
        invite.role
      );

      invite.type = InviteTypes.ChoreList;

      //Todo: send email logic would go here
    } else {
      //user will need to signup first
      //Todo: send email to have the user signup
      invite.type = InviteTypes.Registration;
    }

    await inviteModel.create({
      email: invite.email,
      listId: invite.listId,
      role: invite.role,
      token: token,
    });
    return true;
  };

  verifyInviteandUpdateAsync = async (
    id: string,
    invite: IInviteUpdate
  ): Promise<boolean> => {
    const existingInvite = await inviteModel.findById(id);
    if (!existingInvite) {
      throw new Error("Invite not found");
    }

    const decodedToken = await verifyInviteToken(invite.token);

    if (typeof decodedToken === typeof InviteStatuses) {
      //Todo: handle invalid token case
      console.log("Invalid token payload");
      existingInvite.status = decodedToken as InviteStatus;
      existingInvite.isNew = false;
      await existingInvite.save();
      return false;
    }

    const userService = new UserService();
    const userDoc = await userService.getUserbyEmailAddressAsync(
      decodedToken.email
    );

    if (!userDoc) {
      throw new Error("User not found");
    }

    if (userDoc.includes(decodedToken.listId)) {
      console.log("User is already a member of this list");
      return false;
    }

    // Update the invite details
    existingInvite.status = InviteStatuses.Accepted;
    existingInvite.accepted = invite.accepted;

    await existingInvite.save();
    return true;
  };

  inactivateInviteAsync = async (
    inviteDelete: IInviteDelete
  ): Promise<boolean> => {
    const existingInvite = await inviteModel.findById(inviteDelete.id);
    if (!existingInvite) {
      throw new Error("Invite not found");
    }
    await inviteModel.findByIdAndDelete(inviteDelete.id);
    return true;
  };

  getInvitebyIdAsync = async (id: string): Promise<IInvite | null> => {
    const invite = await inviteModel.findById(id);
    return invite;
  };
}
