import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@vg_node_micro_service_app/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.post(
  "/api/tickets",
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .not()
      .isEmpty()
      .withMessage("Title is required")
      .isFloat({ gt: 0 })
      .withMessage("Price Must be greater than zero"),
  ],
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const { id } = req.currentUser!;
    if (title && price && id) {
      const ticket = await Ticket.create({ title, price, userId: id });
      await ticket.save();

      return res.status(201).send(ticket);
    }
  }
);

export { router as createTicketRouter };
