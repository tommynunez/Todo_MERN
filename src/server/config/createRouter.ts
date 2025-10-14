import { Router } from "express";
import { IService } from "../interfaces/service";

export function createRouter(service: IService): Router {
  const router: Router = Router();

  return router;
}
