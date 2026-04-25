//Education
import { Router } from 'express'; 
import * as InstitutosController from '../controllers/institutos.controller'; 
const router = Router(); 

//API GET
router.get('/', InstitutosController.getInstitutosList); 
router.get('/:id', InstitutosController.getInstitutoItem); 

//API POST
router.post('/', InstitutosController.postInstitutoItem);

//API PUT
//NOTA 8.3: Ruta PUT para actualizar Instituto
router.put('/:id', InstitutosController.putInstitutoItem);

//API DELETE
//NOTA 9.3: Ruta DELETE para eliminar Instituto
router.delete('/:id', InstitutosController.deleteInstitutoItem);

export default router;  