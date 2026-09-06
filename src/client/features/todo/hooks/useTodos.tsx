import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TodoService from '@/client/features/todo/services/todo';
import { ITodo, ITodoListResponse } from '../types/todoTypes';

interface UseTodosParams {
  choreListId?: string;
  search?: string;
  pageIndex?: number;
  pageSize?: number;
}

const todoService = new TodoService();

export const useTodos = (params?: UseTodosParams) => {
  const queryClient = useQueryClient();
  const queryKey = ['todos', params];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => todoService.getAll(params),
  });

  const listData = data?.data as ITodoListResponse | undefined;

  const { mutateAsync: createTodo, isPending: isCreating } = useMutation({
    mutationFn: ({
      name,
      choreListId,
    }: {
      name: string;
      choreListId: string;
    }) => todoService.create(name, choreListId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const { mutateAsync: updateTodo, isPending: isUpdating } = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: { name: string; emailAddress: string; completed: boolean };
    }) => todoService.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const { mutateAsync: deleteTodo, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => todoService.deleteById(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    todos: listData?.data ?? ([] as ITodo[]),
    count: listData?.count ?? 0,
    isLoading,
    error: error?.message ?? null,
    refetch,
    createTodo,
    updateTodo,
    deleteTodo,
    isCreating,
    isUpdating,
    isDeleting,
  };
};
