import { Schema, model } from "mongoose";

const appointmentSchema = Schema({
    veterinario: {
        type: String,
        required: [true, "Name is required"],
        maxLenght: [25, "Max is 25 characters"]
    },
    descripProblem: {
        type: String,
        required: true,
    },
    fecha: {
        type: String,
        required: true, 
        minLenght: [8, "Example 12-12-12"],
        maxLenght: [8, "Example 12-12-12"]
    },
    pet: {
        type: Schema.Types.ObjectId,
        ref: 'pet',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);      

export default model('Appoinment', appointmentSchema);