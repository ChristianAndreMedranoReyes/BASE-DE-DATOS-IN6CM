import { Router } from 'express';
import { check } from 'express-validator';
import { savePet, getPets, searchPet, deletePet, updatePet } from './pet.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { existeMascotaById } from '../helpers/db-validator.js'

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check('email', 'Esta no es un correo valido').not().isEmpty(),
        validarCampos
    ],
    savePet
)

router.get(
    "/",
    getPets
)

router.get(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID valido").isMongoId(),
        validarCampos
    ],
    searchPet
)

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID valido").isMongoId(),
        validarCampos
    ],
    deletePet
)

router.put(
    "/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ],
    updatePet
)

export default router;



