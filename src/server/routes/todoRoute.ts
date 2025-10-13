import { Request, Response, Router } from "express";
import TodoService from "../services/todoService";

const router: Router = Router();
const _todoService = new TodoService();

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

  const response = await _todoService.getAllDocumentsAsync(
    search,
    pageIndex,
    pageSize,
  );
  response
    ? _response.status(200).json({ response, status: 200 })
    : _response.sendStatus(500);
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
  const response = await _todoService.getByIdDocumentsAsync(
    _request.params.id?.toString(),
  );
  response
    ? _response.status(200).json({ response, status: 2000 })
    : _response.sendStatus(500);
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
  const response = await _todoService.insertDocumentAsync(_request.body.name);
  response
    ? _response.status(201).json({ response: response, status: 201 })
    : _response.sendStatus(500);
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
  const response = await _todoService.updateDocumentAsync(
    _request.body.name,
    _request.body,
  );
  response
    ? _response.status(200).json({ response: response, status: 200 })
    : _response.sendStatus(500);
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
  const response = await _todoService.deleteDocumentAsync(
    parseInt(_request.params.id),
  );
  response
    ? _response.status(200).json({ response: response, status: 200 })
    : _response.sendStatus(500);
});

export default router;
