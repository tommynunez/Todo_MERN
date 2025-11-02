import { Router, Request, Response } from "express";
import { InviteService } from "../services/inviteService";
import { ObjectId } from "mongodb";

export const createInviteRoutes = (_inviteService: InviteService): Router => {
  const router: Router = Router();

  router.get("/:id", async (_request: Request, _response: Response) => {
    const response = await _inviteService.getInvitebyIdAsync(
      new ObjectId(_request.params.id?.toString())
    );
    if (response) {
      return _response.status(200).json({ response, status: 200 });
    } else {
      return _response.sendStatus(500);
    }
  });

  router.post("/invite", async (_request: Request, _response: Response) => {
    const response = await _inviteService.createInviteAsync(_request.body);
    if (response) {
      return _response.status(200).json({ response, status: 200 });
    } else {
      return _response.sendStatus(500);
    }
  });

  router.put("/:id", async (_request: Request, _response: Response) => {
    const response = await _inviteService.inactivateInviteAsync(_request.body);

    if (response) {
      return _response.status(200).json({ response, status: 200 });
    } else {
      return _response.sendStatus(500);
    }
  });

  router.post("/validate", async (_request: Request, _response: Response) => {
    const response = await _inviteService.verifyInviteandUpdateAsync(
      _request.body
    );
    if (response) {
      return _response.status(200).json({ response, status: 200 });
    } else {
      return _response.sendStatus(500);
    }
  });
  return router;
};
