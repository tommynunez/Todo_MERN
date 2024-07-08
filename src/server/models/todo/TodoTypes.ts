import { ITodo } from './TodoInterfaces';

export type InsertFunction = (name: string) => Promise<boolean>;
export type UpdateFunction = (
	name: string,
	completed: boolean
) => Promise<boolean>;
export type DeleteFunction = (id: number) => Promise<boolean>;
export type GetByIdFunction = (id: string) => Promise<ITodo | null>;
export type GetByNameFunction = (name: string) => Promise<ITodo | null>;
export type GetAllFunction = (
	search: any,
	pageIndex: any,
	pageSize: any
) => Promise<Array<ITodo> | null>;
