import { Router } from 'express';
import { getAllLabels } from '../controllers/etiquetas.controller.js';

const router = Router();

// MASU: Obtener todas las etiquetas
router.get('/', getAllLabels);

export default router;
