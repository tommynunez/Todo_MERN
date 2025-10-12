import inviteModel from "../models/invitesModel";
import { IInviteService, IInvite, IInviteAdd, IInviteDelete, IInviteUpdate } from "../interfaces/inviteInterface";

export default class InviteService implements IInviteService {
  constructor() {}

  insertDocumentAsync = async (invite: IInviteAdd) : Promise<boolean> => {
    // Logic to send an invite to the provided email
    console.log(`Invite sent to ${invite.email}`);
    await inviteModel.create({ 
      email: invite.email, 
      listId: invite.listId, 
      role: invite.role, 
      token: invite.token, 
      expiresAt: invite.expiresAt,
     });
     
  }
}