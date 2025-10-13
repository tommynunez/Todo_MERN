import inviteModel from "../models/invitesModel";
import { generateInviteToken, verifyInviteToken } from "../utils/inviteToken";
import { IInviteService, IInvite, IInviteAdd, IInviteDelete, IInviteUpdate } from "../interfaces/inviteInterface";
import UserService from "./userService";

export default class InviteService implements IInviteService {
  constructor() {}

  createInviteAsync = async (invite: IInviteAdd) : Promise<boolean> => {
    // Logic to send an invite to the provided email
    const userService = new UserService();
    const userDoc = await userService.getUserbyEmailAddressAsync(invite.email);

    if(userDoc){
      console.log(`Generate token for ${invite.email} and list ${invite.listId} with role ${invite.role}`);
      const token = await generateInviteToken(invite.listId, invite.email, invite.role);
      
      //Todo: send email logic would go here

      await inviteModel.create({ 
        email: invite.email, 
        listId: invite.listId, 
        role: invite.role, 
        token: token, 
        expiresAt: invite.expiresAt,
      });
    } else {
      //user will need to signup first
      //Todo: send email to have the user signup
      
    }
    return true; 
  }

  verifyInviteandUpdateAsync = async (id: string, invite: IInviteUpdate): Promise<boolean> => {
    const existingInvite = await inviteModel.findById(id);
    if (!existingInvite) {
      throw new Error('Invite not found');
    }

    const decodedToken = await verifyInviteToken(invite.token);

    if (typeof decodedToken === 'boolean' 
      || typeof decodedToken === 'string') {
      //Todo: handle invalid token case
      console.log('Invalid token payload');
      return false;
    }

    const userService = new UserService();
    const userDoc = await userService.getUserbyEmailAddressAsync(decodedToken.email);

    if (!userDoc) {
      throw new Error('User not found');
    }

    if(userDoc..includes(decodedToken.listId)) {
      console.log('User is already a member of this list');
      return false;
    }

    // Update the invite details
    existingInvite.accepted = invite.accepted;
    existingInvite.updatedAt = invite.updatedAt;

    await existingInvite.save();
    return true;
  }

  inactivateInviteAsync = async (inviteDelete: IInviteDelete): Promise<boolean> => {
    const existingInvite = await inviteModel.findById(inviteDelete.id);
    if (!existingInvite) {
      throw new Error('Invite not found');
    }
    await inviteModel.findByIdAndDelete(inviteDelete.id);
    return true;
  }

  getInvitebyIdAsync = async (id: string): Promise<IInvite | null> => {
    const invite = await inviteModel.findById(id);
    return invite;
  }
}