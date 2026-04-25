//MASU: Education
import { Router } from 'express'; 
import config from '../../../config/config'; 
// MASU: Import Routes 
import institutosRoutes from './institutos.routes.js';
import etiquetasRoutes from './etiquetas.routes.js';
//MASU: import ordersRoutes from './orders.routes'; 
const routerAPI = (app) => { 
  const router = Router(); 
  const api = config.API_URL; 
  app.use(api, router); 
  // MASU: Routes 
  router.use('/institutos', institutosRoutes);
  router.use('/etiquetas', etiquetasRoutes);
  //router.use('/orders', ordersRoutes); 
  // Return Router 
  return router; 
}; 
module.exports = routerAPI;