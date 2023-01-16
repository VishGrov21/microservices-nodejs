import express, { Request, Response } from "express";
import { currentUser } from "@vg_node_micro_service_app/common";
import { requireAuth } from "@vg_node_micro_service_app/common";

const router = express.Router();

router.get("/api/users/currentUser", currentUser, (req: Request, res: Response) => {
  return res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
