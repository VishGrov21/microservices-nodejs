import request from "supertest";
import { app } from "../../app";

it("Supplied email doesn't exist", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "somemail@gmail.com",
      password: "some password",
    })
    .expect(400);
});

it("Fails when incorrect password is supplied", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "someemail@gmail.com",
      password: "12345678",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();

  return request(app)
    .post("/api/users/signin")
    .send({
      email: "someemail@gmail.com",
      password: "1111111111",
    })
    .expect(400);
});

it("Successful Signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "someemail@gmail.com",
      password: "12345678",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "someemail@gmail.com",
      password: "12345678",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
