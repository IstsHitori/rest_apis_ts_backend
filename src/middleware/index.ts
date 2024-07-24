import { Response, Request, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import colors from "colors";
export const handleInputErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Validacion
  try {
    await check("name")
      .notEmpty()
      .withMessage("El nombre del producto no puede ir vacío")
      .run(req);

    await check("price")
      .isNumeric()
      .withMessage("Valor no válido")
      .notEmpty()
      .withMessage("El precio del producto no puede ir vacío")
      .custom((value) => value > 0)
      .withMessage("EL precio no puede ser negativo")
      .run(req);

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  } catch (error) {
    console.log(colors.bgRed.bold(error));
  }
};
