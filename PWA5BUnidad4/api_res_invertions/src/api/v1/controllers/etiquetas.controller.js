import { getAllLabelService } from '../services/etiquetas.service.js';

// CDCH: Obtener todas las etiquetas
export const getAllLabels = async (req, res) => {
    try {
        const labels = await getAllLabelService();
        res.status(200).json({
            success: true,
            data: [labels],
            message: 'Etiquetas obtenidas correctamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las etiquetas',
            error: error.message
        });
    }
};
