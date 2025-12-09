import { Router, Request, Response } from "express";
import { InviteService } from "../services/inviteService";
import { ObjectId } from "mongodb";
import { IInviteAdd } from "../interfaces/inviteInterface";
import { IUserAccount } from "../interfaces/userInterface";

export const createInviteRoutes = (_inviteService: InviteService): Router => {
  const router: Router = Router();

  router.get("/:id", async (_request: Request, _response: Response) => {
    const response = await _inviteService.getInvitebyIdAsync(
      new ObjectId(_request.params.id?.toString())
    );
    if (response) {
      return _response.status(200).json({ data: response });
    } else {
      return _response.status(404);
    }
  });

  router.post("/invite", async (_request: Request, _response: Response) => {
    const user = _request.user as IUserAccount;
    const inviteRequest = {
      ...(_request.body as IInviteAdd),
      inviterName: user?.emailAddress,
    };

    const response = await _inviteService.createInviteAsync(inviteRequest);
    if (response) {
      return _response.status(200).json({ data: response });
    } else {
      return _response.status(500);
    }
  });

  router.put("/:id", async (_request: Request, _response: Response) => {
    const response = await _inviteService.inactivateInviteAsync(_request.body);

    if (response) {
      return _response.status(200).json({ data: response });
    } else {
      return _response.status(500);
    }
  });

  router.post("/validate", async (_request: Request, _response: Response) => {
    const response = await _inviteService.verifyInviteandUpdateAsync(
      _request.body
    );
    if (response) {
      return _response.status(200).json({ data: response });
    } else {
      return _response.status(500);
    }
  });
  return router;
};
