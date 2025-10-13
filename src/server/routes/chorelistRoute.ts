import { Request, Response, Router } from "express";
import ChorelistService from "../services/choreListService";
import { Types } from "mongoose";

const router: Router = Router();
const _chorelistService = new ChorelistService();

/**
 * Get all chorelist items in a paginated manner
 * Query params:
 * search: string - search term to filter chorelist items by title
 * pageIndex: number - page index for pagination (default: 0)
 * pageSize: number - number of items per page (default: 10)
 * Returns: 200 with list of chorelist items or 500 on error
 */
router.get("/", async (_request: Request, _response: Response) => {
  const { ownerId, search, pageIndex, pageSize } = _request.query;

  const response = await _chorelistService.getAllDocumentsAsync(
    new Types.ObjectId(ownerId?.toString()),
    search?.toString() || "",
    pageIndex || 0,
    pageSize || 10,
  );

  response
    ? _response.status(200).json({ response, status: 200 })
    : _response.sendStatus(500);
});

/**
 * Get a single chorelist item by ID
 * Path param:
 * id: string - ID of the chorelist item
 * Returns: 200 with the chorelist item or 500 on error
 */
router.get("/:id", async (_request: Request, _response: Response) => {
  const response = await _chorelistService.getByIdDocumentsAsync(
    _request.params.id?.toString(),
  );

  response
    ? _response.status(200).json({ response, status: 200 })
    : _response.sendStatus(500);
});

/**
 * Create a new chorelist item
 *
 * Body params:
 * choreList: IChoreListAdd - chorelist item to be created
 * Returns: 200 with true if created or 500 on error
 * Example: POST /api/chorelists
 * Request Body: { title: "New Chore List", owner: "ownerId", sharedWith: [] }
 * Response: { response: true, status: 200 }
 * Create a new chorelist item
 * Body params:
 * choreList: IChoreListAdd - chorelist item to be created
 * Returns: 200 with true if created or 500 on error
 * Example: POST /api/chorelists
 * Request Body: { title: "New Chore List", owner: "ownerId", sharedWith: [] }
 * Response: { response: true, status: 200 }
 */
router.post("/", async (_request: Request, _response: Response) => {
  const response = await _chorelistService.insertDocumentAsync(_request.body);
  response
    ? _response.status(200).json({ response, status: 200 })
    : _response.sendStatus(500);
});

/**
 * Update a chorelist item
 * Path param:
 * id: string - ID of the chorelist item to be updated
 * Body params:
 *  choreList: IChoreListUpdate - chorelist item data to be updated
 * Returns: 200 with true if updated or 500 on error
 * Example: PUT /api/chorelists/123
 * Request Body: { title: "Updated Chore List", sharedWith: [] }
 * Response: { response: true, status: 200 }
 */
router.put("/:id", async (_request: Request, _response: Response) => {
  const response = await _chorelistService.updateDocumentAsync(
    _request.params.id?.toString(),
    _request.body,
  );

  response
    ? _response.status(200).json({ response, status: 200 })
    : _response.sendStatus(500);
});

/**
 *  Delete a chorelist item
 *  Path param:
 * id: string - ID of the chorelist item to be deleted
 * Returns: 200 with true if deleted or 500 on error
 * Example: DELETE /api/chorelists/123
 * Response: { response: true, status: 200 }
 */
router.delete("/:id", async (_request: Request, _response: Response) => {
  const response = await _chorelistService.deleteDocumentAsync(
    _request.params.id?.toString(),
  );
  response
    ? _response.status(200).json({ response, status: 200 })
    : _response.sendStatus(500);
});

export default router;
