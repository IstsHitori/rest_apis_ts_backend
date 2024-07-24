import request from "supertest";
import server from "../../server";
import { response } from "express";

describe("POST /api/products", () => {
  it("should desplay validation erros", async () => {
    const response = await request(server).post("/products").send({});
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);
  });
  it("should validate that the price is greater than 0", async () => {
    const response = await request(server).post("/products").send({
      name: "Monitor curvo",
      price: 0,
    });
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
  });
  it("should create a new product", async () => {
    const response = await request(server).post("/products").send({
      name: "Mosue testint",
      price: 400,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("error");
  });
});

describe("GET /products", () => {
  it("should check if api/products url exists", async () => {
    const response = await request(server).get("/products");
    expect(response.status).not.toBe(404);
  });
  it("GET a JSON response with products", async () => {
    const response = await request(server).get("/products");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(1);

    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /products/:id", () => {
  it("should return a 404 response for a non-existent product", async () => {
    const productId = 10;
    const response = await request(server).get(`/products/${productId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Producto no encontrado");
  });
  it("GET a json response for a single product", async () => {
    const response = await request(server).get("/products/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});

// describe("PUT /products/:id", () => {
//   it("sould display validation error messages whe updating a product", async () => {
//     const response = await request(server).put("/products/1").send({});
//     expect(response.status).toBe(400);
//     expect(response.body).toHaveProperty("errors");
//     expect(response.body.errors).toBeTruthy();
//     expect(response.body.errors).toHaveLength(5);

//     expect(response.status).not.toBe(200);
//     expect(response.body).not.toHaveProperty("data");
//   });
// });

describe("DELETE /products/id", () => {
  //   it("should check a valid ID", async () => {
  //     const response = await request(server).delete("/products/not-valid");

  //     expect(response.status).toBe(400);
  //   });
  it("should return a 404 response for non-existent product", async () => {
    const productId = 2000;
    const response = await request(server).delete(`/products/${productId}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Producto no encontrado");
    expect(response.status).not.toBe(200);
  });
  it("should delete a product", async () => {
    const response = await request(server).delete("/products/1");
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("Producto eliminado");
    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);

  });
});
