import request from "supertest";
import { app } from "../../app";

it("Returns 404 if ticket doesn't exist", async () => {
  await request(app).get("/api/ticket/some_id").send().expect(404);
});

it("Returns the ticket if the ticket object is found", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "Ticket Title",
      price: 100,
    })
    .expect(201);

  const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send().expect(200);
  expect(ticketResponse.body.title).toEqual("Ticket Title");
});
