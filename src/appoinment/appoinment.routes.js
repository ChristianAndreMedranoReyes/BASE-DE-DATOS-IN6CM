import { Router } from "express";
import { check } from "express-validator";
import { saveApoint } from "./appoinment.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check('pet', 'No existe una mascota con este nombre').not().isEmpty(),
        validarCampos
    ],
    saveApoint
);

export default router;
