import Appoinment from "./appoinment.model.js";
import Pet from '../pet/pet.model.js'

export const saveApoint = async ( req, res ) =>{
    
    try {
        const data = req.body;
        const pet = await Pet.findOne({ name: data.pet });

        if (!pet) {
            return res.status(404).json({
                success: false,
                message: 'Mascota no encontrado',
                error
            })    
        }

        const appoinment = new Appoinment({
            ...data,
            pet: pet._id,
        });

        await appoinment.save();

        res.status(200).json({
            success: true,
            appoinment
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al guardar cita',
            error
        })
    }
}
