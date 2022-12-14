import request from "supertest";
import { app } from "../../app";

it("responds with details about current user", async () => {
  const cookie = await global.signup();

  const response = await request(app).get("/api/users/currentUser").set("Cookie", cookie).send().expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("responds with null for unauthenticated user", async () => {
  const response = await request(app).get("/api/users/currentUser").send().expect(200);
  expect(response.body.currentUser).toEqual(null);
});
