import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, NotFoundError, requireAuth, UnAuthorizedError } from "@vg_node_micro_service_app/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.put("/api/tickets/:id", requireAuth, async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new NotFoundError();
  }
});

export { router as updateTicketRouter };
