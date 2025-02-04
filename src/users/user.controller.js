import { response, request } from "express";
import { hash, verify } from "argon2";
import Usuario from "./user.model.js";
 
export const getUsers = async (req = request, res = response) =>{
    try {
        const {limit = 10, desde = 0} = req.query;
        const query = {estado: true}
        const [total, users] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query).skip(Number(desde)).limit(Number(limit))
        ])
 
        res.status(200).json({
            sucess: true,
            total,
            users
        })
 
    } catch (e) {
        res.status(400).json({
            sucess: false,
            msg: "Error al buscar usuarios",
            e
        })
    }
}
 
export const getUserById = async (req, res)=>{
    try {
        const {id} = req.params;
 
        const user = await Usuario.findById(id);
 
        if(!user){
            return res.status(404).json({
                sucess:false,
                msg: "El usuario no encontrado o inexistente"
            })
        }
 
        res.status(200).json({
            sucess: true,
            user
        })
 
    } catch (e) {
        res.status(500).json({
            sucess: false,
            msg: "error al buscar usuario",
            e
        })
    }
}

export const  updateUser = async (req, res = response) => {
    try {

        const { id } = req.params;
        const { _id, password, email, ...data } = req.body;

        if(password) {
            data.password = await hash(password)
        }

        const user = await Usuario.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            success: true,
            msg: 'Usuario Actualizado',
            user
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar usuario',
            error
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        
        const { id } = req.params;

        const user = await UserActivation.findByIdAndUpdate(id, { estado: false }, {new: true});

        const authencticatedUser = req.user;

        res.status(200).json({
            sucess: true,
            msg: "Usuario desactivado",
            user,
            authencticatedUser
        })

    } catch (error) {
        res.status(500).json({
            sucess: false,
            msg: 'Error al desactivar usuario',
            error
        })
    }
}