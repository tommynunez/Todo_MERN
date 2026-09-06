export interface ITodo {
  _id: string;
  userId: string;
  choreListId: string;
  name: string;
  complete: { by: string; isCompleted: boolean; completedDate: Date }[];
}

export interface ITodoListResponse {
  count: number;
  data: ITodo[];
  pageIndex: number;
  pageSize: number;
}

export interface ITodoResponse {
  success: boolean;
  data?: ITodo | ITodoListResponse;
  error?: string;
}
