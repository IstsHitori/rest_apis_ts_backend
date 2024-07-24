// describe("Nuestro primer test", () => {
//     it("debe revisar que 1+1 sea 2", () => {
//         expect(1+1).toBe(2);
//     })
//     it("debe revisar que 1+1 no sean 3", () => {
//         expect(1+1).not.toBe(3);
//     })
// });

import request from "supertest";
import server, { connectDB } from "../server";
import db from "../config/db";

jest.mock("../config/db");

describe("CONNECT DB", () => {
  it("should handle database conection error", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(new Error("Hubo un error al conectar a la DB"));
    const consoleSpy = jest.spyOn(console,"log");

    await connectDB();
    expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("Hubo un error al conectar a la DB")
    )
  });
});
