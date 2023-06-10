const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");
const { User } = require("../../models");

const { DB_HOST_TEST, PORT } = process.env;

describe("test login route", () => {
  let server = null;

  const testData = {
    email: "test@email.com",
    password: "123456",
  };

  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);

    // register new user
    await request(app).post("/users/register").send(testData);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test login route with correct data", async () => {
    const { statusCode, body } = await request(app)
      .post("/users/login")
      .send(testData);
    console.log(body);
    expect(statusCode).toBe(200);
    expect(body.user.email).toBe(testData.email);
    expect(typeof body.user.subscription).toBe("string");
    expect(body.token).not.toBe("");

    const user = await User.findOne({ email: testData.email });
    expect(user.email).toBe(testData.email);
  });
});
