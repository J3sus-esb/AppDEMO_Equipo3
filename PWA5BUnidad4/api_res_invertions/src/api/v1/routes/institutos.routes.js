//Educación
import { Router } from 'express'; 
import * as InstitutosController from '../controllers/institutos.controller'; 
const router = Router();

//API OBTENER
router.get('/', InstitutosController.getInstitutosList);
router.get('/:id', InstitutosController.getInstitutoItem); 

//API CREAR
//API ACTUALIZAR
//NOTA 8.3: Ruta PUT para actualizar Instituto
router.put('/:id', InstitutosController.putInstitutoItem);

//API ELIMINAR
//NOTA 9.3: Ruta DELETE para eliminar Instituto
router.delete('/:id', InstitutosController.deleteInstitutoItem);

export default router;  