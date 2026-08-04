import {
  IInvite,
  IInviteDelete,
  IInviteRequest,
  IInviteResponse,
} from '../interfaces/inviteInterface';
import { inviteModel } from '../models/invitesModel';
import { toObjectId } from '../utils/idValidator';

export class InviteRepository {
  constructor() {}

  createInviteAsync = async (invite: IInviteRequest) => {
    await inviteModel.create({
      email: invite.email,
      inviterName: invite.inviterName,
      listId: toObjectId(invite.listId),
      role: invite.role,
      token: invite.token,
      type: invite.type,
      status: invite.status,
    });
  };

  inactivateInviteAsync = async (
    inviteDelete: IInviteDelete,
  ): Promise<boolean> => {
    try {
      const existingInvite = await inviteModel.findByIdAndUpdate(
        toObjectId(inviteDelete.id),
        {
          status: inviteDelete.status,
        },
      );
      if (!existingInvite) {
        throw new Error('Invite not found');
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  hasInvitebyEmailAsync = async (
    email: string,
    isLean: boolean = false,
  ): Promise<boolean> => {
    try {
      const doesInviteexist = isLean
        ? await inviteModel.exists({ email }).lean().exec()
        : await inviteModel.exists({ email }).exec();

      return !!doesInviteexist;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  getInvitebyIdAsync = async (
    id: string,
    isLean: boolean = false,
  ): Promise<IInviteResponse | null> => {
    try {
      const invite = isLean
        ? await inviteModel
            .findOne({ _id: toObjectId(id) })
            .lean()
            .exec()
        : await inviteModel.findOne({ _id: toObjectId(id) }).exec();

      if (!invite) {
        return null;
      }

      return {
        listId: invite.listId.toString(),
        role: invite.role,
        type: invite.type,
        status: invite.status,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  getInvitebyTokenAsync = async (
    token: string,
    isLean: boolean = false,
  ): Promise<IInvite | null> => {
    try {
      const invite = isLean
        ? await inviteModel.findOne({ token }).lean().exec()
        : await inviteModel.findOne({ token }).exec();

      if (!invite) {
        return null;
      }

      return invite;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}
