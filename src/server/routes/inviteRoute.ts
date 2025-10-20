import { Router, Request, Response } from "express";
import { InviteService } from "../services/inviteService";
import { ObjectId } from "mongodb";
import { authenticatedMiddleware } from "../middleware/authenticatedMiddleware";

export const createInviteRoutes = (_inviteService: InviteService): Router => {
  const router: Router = Router();

  router.get(
    "/:id",
    authenticatedMiddleware,
    async (_request: Request, _response: Response) => {
      const response = await _inviteService.getInvitebyIdAsync(
        new ObjectId(_request.params.id)
      );

      response
        ? _response.status(200).json({ response, status: 200 })
        : _response.sendStatus(500);
    }
  );

  /**
   * Create invitation for chore list participants
   */
  router.post(
    "/",
    authenticatedMiddleware,
    async (_request: Request, _response: Response) => {
      const response = await _inviteService.createInviteAsync(_request.body);

      response
        ? _response.status(200).json({ response, status: 200 })
        : _response.sendStatus(500);
    }
  );

  /**
   * Verify invitation
   */
  router.post("/verify", async (_request: Request, _response: Response) => {
    const response = await _inviteService.verifyInviteandUpdateAsync(
      _request.body
    );

    response
      ? _response.status(200).json({ response, status: 200 })
      : _response.sendStatus(500);
  });

  router.put(
    "/invalidate",
    authenticatedMiddleware,
    async (_request: Request, _response: Response) => {
      const response = await _inviteService.inactivateInviteAsync(
        _request.body
      );

      response
        ? _response.status(200).json({
            response,
            status: 200,
          })
        : _response.sendStatus(500);
    }
  );

  return router;
};
