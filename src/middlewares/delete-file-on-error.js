import { error } from 'console';
import { unlink } from 'fs';
import fs from 'fs/promises';
import { join } from 'path';

export const deleteFileOnError = async (error, req, res, next) => {
    if(req.file && req.filePath){
        const filePath = join (req.filePath, req.file.filename);
        try {
            await fs.unlink(filePath)
        } catch (unlinkErr) {
            console.error('Error deleting file: ', unlinkErr)
        }
    }
    if (error.status === 400 || error.errors) {
        return res.status(400).json({
            success: false,
            errores: error.errors
        });
    }
    return res.status(500).json({
        success: false,
        message: err.message
    })
}