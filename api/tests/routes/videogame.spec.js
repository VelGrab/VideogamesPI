/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);
const videogame = {
  name: "Super Mario Bros",
  description: "La descripcion de este videojuego es un test",
  image:
    "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
  released: "02-02-01",
  rating: 5.1,
  platforms: ["Xbox", "PC"],
  genres: ["Action", "Indie"],
};

describe("Videogame routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Videogame.sync({ force: true }).then(() => Videogame.create(videogame))
  );
  describe("GET /videogames", () => {
    it("should get 200", () => agent.get("/videogames").expect(200));
  });
});

describe("GET /videogame/:id", () => {
  it("Responde con un status 200 al obtener el detalle videojuego", (done) => {
    agent.get("/videogame:id").expect(200);
    done();
  }).timeout(2000);
});

describe("POST /videogames", () => {
  it("POST agrega un nuevo videojuego", (done) => {
    agent
      .post("/videogames")
      .send({
        name: "Halo",
        description: "Halo es un juego de accion y shooter",
        image:
          "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
        released: "02-02-01",
        rating: 5,
        platforms: ["Xbox", "PC"],
        genres: ["Action", "Indie"],
      })
      .expect(200);
    done();
  }).timeout(3000);
});
