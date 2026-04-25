
import { Router } from 'express'; 
import config from '../../../config/config'; 
// MASU: Rutas Importadas
import institutosRoutes from './institutos.routes.js';
import etiquetasRoutes from './etiquetas.routes.js';
const routerAPI = (app) => { 
  const router = Router(); 
  app.use('/api/v1', router); 
  
  // MASU: Rutas
  router.use('/institutos', institutosRoutes);
  router.use('/etiquetas', etiquetasRoutes);

  return router; 
}; 
export default routerAPI;