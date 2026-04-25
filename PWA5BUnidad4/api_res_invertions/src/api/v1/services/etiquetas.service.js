import { db } from '../../../config/database.config.js';

// MASU: Obtener todas las etiquetas desde la base de datos
export const getAllLabelService = async () => {
    try {
        const collection = db.collection('cat_etiquetas');
        const snapshot = await collection.get();
        
        if (snapshot.empty) {
            console.log('No se encontraron etiquetas en la base de datos');
            return [];
        }
        
        const labels = [];
        snapshot.forEach(doc => {
            labels.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return labels;
    } catch (error) {
        console.error('Error al obtener etiquetas del servicio:', error);
        throw error;
    }
};
