import mongoose, { Schema } from 'mongoose';

export interface IInvite extends mongoose.Document {
    email: string;
    listId: Schema.Types.ObjectId;
    role: 'read' | 'write' | 'admin';
    token: string;
    accepted: boolean;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
}

export interface IInviteAdd {
    email: string;
    listId: Schema.Types.ObjectId;
    role: 'read' | 'write' | 'admin';
    token: string;
    accepted: boolean;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
}

export interface IInviteUpdate {
    accepted: boolean;
    updatedAt: Date;
}

export interface IInviteDelete {
    id: Schema.Types.ObjectId;
    expiresAt: Date;
    updatedAt: Date;
}

export interface IInviteService {
    insertDocumentAsync: (invite: IInviteAdd) => Promise<boolean>;
    updateDocumentAsync: (id: string, invite: IInviteUpdate) => Promise<boolean>;
    deleteDocumentAsync: (inviteDelete: IInviteDelete) => Promise<boolean>;
    getByIdDocumentsAsync: (id: string) => Promise<IInvite | null>;
    getAllDocumentsAsync: (
        listId: Schema.Types.ObjectId,
        search: any,
        pageIndex: any,
        pageSize: any
    ) => Promise<Array<IInvite> | null>;
}