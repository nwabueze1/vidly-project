const request = require("supertest");
const { Genre, genreSchema } = require("../../models/genre");
const { User } = require("../../models/user");
const mongoose = require("mongoose");
let server;
describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../vidly");
  });
  afterEach(async () => {
    await Genre.deleteMany({});
    await server.close();
  });
  describe("GET / ", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
    });
  });
  describe("GET /:id", () => {
    it("should get the genre with the give id", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();
      const res = await request(server).get("/api/genres/" + genre._id);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });
    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/genres/1");
      expect(res.status).toBe(404);
    });
    it("should return 400 if invalid id is passed", async () => {
      const id = mongoose.Types.ObjectId().toHexString();
      const res = await request(server).get("/api/genres/" + id);
      expect(res.status).toBe(400);
    });
  });
  describe("POST /", () => {
    let token;
    let name;
    const exec = async () => {
      return await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name });
    };
    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "genre1";
    });
    it("should return 401 if client is not logged in", async () => {
      token = "";
      const res = await exec();

      expect(res.status).toBe(401);
    });
    it("should return 400 if genre is less than 5 xters", async () => {
      name = "1234";
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if genre is more than 50 xters", async () => {
      name = new Array(52).join("a");
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should save the genre if it is valid", async () => {
      await exec();
      const genre = await Genre.find({ name: "genre1" });
      expect(genre).not.toBeNull();
    });
    it("should return the genre if it is valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre1");
    });
  });
  describe("PUT /:id", () => {
    let id;
    let newName;
    let token;
    let genre;
    const exec = async () => {
      return await request(server)
        .put("/api/genres/" + id)
        .set("x-auth-token", token)
        .send({ name: newName });
    };
    beforeEach(async () => {
      //Before each test we need to create a genre and put it in the database
      genre = await new Genre({ name: "genre1" });
      await genre.save();
      token = new User().generateAuthToken();
      id = genre._id;
      newName = "updatedName";
    });
    it("should return 401 if client is not logged in", async () => {
      token = "";
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 400 if genre is less than 5 xters", async () => {
      newName = "1234";
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if genre is more than 50 xters", async () => {
      newName = new Array(52).join("a");
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should return a 404 if the id is invalid", async () => {
      id = 1;
      const res = await exec();
      expect(res.status).toBe(404);
    });
    it("should return a 404 if an invalid object id is passed", async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();
      expect(res.status).toBe(404);
    });
    it("should update the genre if the input is valid", async () => {
      await exec();
      const updatedGenre = await Genre.findById(genre._id);

      expect(updatedGenre.name).toBe(newName);
    });
    it("should return the updated genre if it is valid", async () => {
      const res = await exec();
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", newName);
    });
  });
  describe("DELETE /:id", () => {
    let token;
    let genre;
    let id;

    const exec = async () => {
      return await request(server)
        .delete("/api/genres/" + id)
        .set("x-auth-token", token)
        .send();
    };

    beforeEach(async () => {
      // Before each test we need to create a genre and
      // put it in the database.
      genre = new Genre({ name: "genre1" });
      await genre.save();

      id = genre._id;
      token = new User({ isAdmin: true }).generateAuthToken();
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });
  });
});
