import { Request, Response, Router } from "express";
import TodoService from "../services/todoService";
import mongoose from "mongoose";
import { IUserAccount } from "../interfaces/userInterface";

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
  router.get("/", async (_request: Request, _response: Response) => {
    const { search, pageIndex, pageSize } = _request.query;

    const response = await _todoService.getAllTodosAsync(
      search,
      pageIndex,
      pageSize
    );

    if (response) {
      return _response.status(200).json({ status: true, data: response });
    } else {
      return _response.status(404).json({ status: false });
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
  router.get("/:id", async (_request: Request, _response: Response) => {
    const response = await _todoService.getByIdTodosAsync(
      _request.params.id?.toString()
    );
    if (response) {
      return _response.status(200).json({ status: true, data: response });
    } else {
      _response.status(404).json({ status: false });
    }
  });

  /**
   * Create a new todo item
   * Body params:
   * name: string - name of the todo item
   * 	Returns: 201 on success or 500 on error
   * Example: POST /api/todos
   * Body: { name: "New Task" }
   * Response: { response: true, status: 201 }
   */
  router.post("/", async (_request: Request, _response: Response) => {
    if (!_request.body.choreListId) {
      _response
        .status(400)
        .json({ response: "A todo needs to be assigned to a chore list" });
    }

    if (mongoose.isValidObjectId(_request.body.choreListId) == false) {
      return _response
        .status(400)
        .json({ response: "choreListId is not valid" })
        .send();
    }

    const user = _request.user as IUserAccount;
    const response = await _todoService.insertTodoAsync(
      user.id,
      user.emailAddress,
      _request.body.name,
      _request.body.choreListId
    );

    if (response) {
      return _response.status(201).json({ status: true, data: response });
    } else {
      return _response.status(500).json({ status: false });
    }
  });

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
  router.put("/:id", async (_request: Request, _response: Response) => {
    const response = await _todoService.updateTodoAsync(
      "",
      _request.body.name,
      _request.body
    );

    if (response) {
      return _response.status(200).json({ status: true, data: response });
    } else {
      return _response.status(500).json({ status: false });
    }
  });

  /**
   * Delete a todo item by ID
   * Path param:
   * id: string - ID of the todo item to delete
   * Returns: 200 on success or 500 on error
   * Example: DELETE /api/todos/123
   * Response: { response: true, status: 200 }
   */
  router.delete("/:id", async (_request: Request, _response: Response) => {
    const response = await _todoService.deleteTodoAsync(
      parseInt(_request.params.id)
    );

    if (response) {
      _response.status(200).json({ status: true, data: response });
    } else {
      _response.status(500).json({ status: false });
    }
  });

  return router;
};
