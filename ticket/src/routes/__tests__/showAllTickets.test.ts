import request from "supertest";
import { app } from "../../app";

const createTicket = async () => {
  await request(app).post("/api/tickets").set("Cookie", global.signin()).send({
    title: "Ticket Title 1",
    price: 100,
  });
  await request(app).post("/api/tickets").set("Cookie", global.signin()).send({
    title: "Ticket Title 2",
    price: 10,
  });
  return;
};

it("can fetch a list of tickets", async () => {
  await createTicket();
  const response = await request(app).get("/api/tickets").send().expect(200);
  expect(response.body.length).toEqual(2);
  expect(response.body[0].title).toEqual("Ticket Title 1");
});
