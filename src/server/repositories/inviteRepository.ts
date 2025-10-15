import { Types } from "mongoose";
import { IInvite, IInviteDelete } from "../interfaces/inviteInterface";
import { inviteModel } from "../models/invitesModel";

export class InviteRepository {
  constructor() {}

  createInviteAsync = async (invite: IInvite) => {
    await inviteModel.create({
      email: invite.email,
      listId: invite.listId,
      role: invite.role,
      token: invite.token,
      type: invite.type,
      status: invite.status,
    });
  };

  inactivateInviteAsync = async (
    inviteDelete: IInviteDelete
  ): Promise<boolean> => {
    try {
      const existingInvite = await inviteModel.findByIdAndUpdate(
        inviteDelete.id,
        {}
      );
      if (!existingInvite) {
        throw new Error("Invite not found");
      }
      await inviteModel.findByIdAndDelete(inviteDelete.id);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  getInvitebyEmailAsync = async (
    email: string,
    isLean: Boolean = false
  ): Promise<IInvite | null> => {
    try {
      const invite = inviteModel.findOne({ email });
      if (invite && isLean) {
        invite.lean();
      }

      return invite;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  getInvitebyIdAsync = async (
    id: Types.ObjectId,
    isLean: Boolean = false
  ): Promise<IInvite | null> => {
    try {
      const invite = inviteModel.findById(id);

      if (invite && isLean) {
        invite.lean();
      }
      return invite.exec();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  getInvitebyTokenAsync = async (
    token: string,
    isLean: Boolean = false
  ): Promise<IInvite | null> => {
    try {
      const invite = inviteModel.findById({ token: token });

      if (invite && isLean) {
        invite.lean();
      }
      return invite.exec();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}
