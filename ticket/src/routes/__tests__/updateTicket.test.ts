import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

it("returns a 404 if id doesn't exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "Some Title",
      price: 20,
    })
    .expect(404);
});
it("returns a 401 if user isn't authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "Some Title",
      price: 20,
    })
    .expect(401);
});
it("returns a 404 if user doesn't own the ticket", async () => {});
it("returns a 400 is user provides invalid title or price", async () => {});
it("update the ticket by providing valid input", async () => {});
