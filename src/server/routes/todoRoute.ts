import { Request, Response, Router } from 'express';
import TodoService from '../services/todoService';
import { IAuthenticatedUser } from '../interfaces/userInterface';
import {
  validateObjectIdParams,
  validateObjectIdBody,
} from '../middleware/validateObjectIdMiddleware';

export const createTodoroutes = (_todoService: TodoService): Router => {
  const router: Router = Router();
  /**
   * Get all todo items in a paginated manner
   *
   * Query params:
   * search: string - search term to filter todo items by name
   * pageIndex: number - page index for pagination (default: 0)
   * pageSize: number - number of items per page (default: 10)
   * Returns: 200 with list of todo items or 500 on error
   * Example: GET /api/todos?search=task&pageIndex=0&pageSize=10
   * Response: { response: Array<ITodo>, status: 200 }
   * Get a single todo item by ID
   * Path param:
   * id: string - ID of the todo item
   * Returns: 200 with the todo item or 500 on error
   * Example: GET /api/todos/123
   * Response: { response: ITodo, status: 200 }
   */
  router.get('/', async (_request: Request, _response: Response) => {
    const { search, pageIndex, pageSize } = _request.query;
    try {
      const response = await _todoService.getAllTodosAsync(
        (_request.user as IAuthenticatedUser)._id.toString(),
        search ? search.toString() : '',
        pageIndex ? parseInt(pageIndex.toString(), 10) : 0,
        pageSize ? parseInt(pageSize.toString(), 10) : 10,
      );

      if (response) {
        return _response
          .status(200)
          .location('/todo/')
          .json({
            count: response.length,
            data: response,
            pageIndex: pageIndex ? parseInt(pageIndex.toString(), 10) : 0,
            pageSize: pageSize ? parseInt(pageSize.toString(), 10) : 10,
          });
      }
      return _response.status(404).json({
        count: 0,
        data: response,
        pageIndex: pageIndex ? parseInt(pageIndex.toString(), 10) : 0,
        pageSize: pageSize ? parseInt(pageSize.toString(), 10) : 10,
      });
    } catch (error) {
      console.error('Error fetching todo items:', error);
      return _response.status(500).json({ errmsg: 'Internal server error' });
    }
  });

  /**
   * Get a single todo item by ID
   * Path param:
   * id: string - ID of the todo item
   * Returns: 200 with the todo item or 500 on error
   * Example: GET /api/todos/123
   * Response: { response: ITodo, status: 200 }
   * Get a single todo item by ID
   * Path param:
   * 	id: string - ID of the todo item
   * Returns: 200 with the todo item or 500 on error
   * Example: GET /api/todos/123
   * Response: { response: ITodo, status: 200 }
   */
  router.get(
    '/:id',
    validateObjectIdParams(['id']),
    async (_request: Request, _response: Response) => {
      const { id } = _request.params;

      try {
        const response = await _todoService.getByIdTodosAsync(id.toString());
        if (response) {
          return _response.status(200).json({ data: response });
        }
        _response.status(404);
      } catch (error) {
        console.error('Error fetching todo item by ID:', error);
        return _response.status(500).json({ errmsg: 'Internal server error' });
      }
    },
  );

  /**
   * Create a new todo item
   * Body params:
   * name: string - name of the todo item
   * 	Returns: 201 on success or 500 on error
   * Example: POST /api/todos
   * Body: { name: "New Task" }
   * Response: { response: true, status: 201 }
   */
  router.post(
    '/',
    validateObjectIdBody(['choreListId']),
    async (_request: Request, _response: Response) => {
      if (!_request.body.choreListId) {
        return _response
          .status(400)
          .json({ response: 'A todo needs to be assigned to a chore list' });
      }

      try {
        const user = _request.user as IAuthenticatedUser;
        const response = await _todoService.insertTodoAsync(
          user._id.toString(),
          user.emailAddress,
          _request.body.name,
          _request.body.choreListId,
        );

        if (response) {
          return (
            _response
              .status(201)
              // .location(`/todo/${chore._id}`)
              .json({ status: response })
          );
        }
        return _response.status(500).json({ status: response });
      } catch (error) {
        console.error('Error creating todo item:', error);
        return _response.status(500).json({ errmsg: 'Internal server error' });
      }
    },
  );

  /**
   * Update an existing todo item
   * Path param:
   * id: string - ID of the todo item to update
   * Body params:
   * name: string - new name of the todo item
   * completed: boolean - completion status of the todo item
   * Returns: 200 on success or 500 on error
   * Example: PUT /api/todos/123
   * Body: { name: "Updated Task", completed: true }
   * Response: { response: true, status: 200 }
   */
  router.put(
    '/:id',
    validateObjectIdParams(['id']),
    async (_request: Request, _response: Response) => {
      try {
        const response = await _todoService.updateTodoAsync(
          _request.body.name,
          _request.body.emailAddress,
          _request.body,
        );

        if (response) {
          return _response.status(200).json({ data: response });
        }
        return _response.status(500).json({ errmsg: 'Internal server error' });
      } catch (error) {
        console.error('Error updating todo item:', error);
        return _response.status(500).json({ errmsg: 'Internal server error' });
      }
    },
  );

  /**
   * Delete a todo item by ID
   * Path param:
   * id: string - ID of the todo item to delete
   * Returns: 200 on success or 500 on error
   * Example: DELETE /api/todos/123
   * Response: { response: true, status: 200 }
   */
  router.delete(
    '/:id',
    validateObjectIdParams(['id']),
    async (_request: Request, _response: Response) => {
      const { id } = _request.params;

      try {
        const response = await _todoService.deleteTodoAsync(id.toString());

        if (response) {
          _response.status(200).json({ data: response });
        } else {
          _response.status(500).json({ errmsg: 'Internal server error' });
        }
      } catch (error) {
        console.error('Error deleting todo item:', error);
        _response.status(500).json({ errmsg: 'Internal server error' });
      }
    },
  );

  return router;
};
