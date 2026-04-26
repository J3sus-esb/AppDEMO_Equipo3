//Educación
import { Router } from 'express'; 
import * as InstitutosController from '../controllers/institutos.controller'; 
const router = Router();

//API OBTENER
router.get('/', InstitutosController.getInstitutosList);
router.get('/:id', InstitutosController.getInstitutoItem); 

//API CREAR
//API ACTUALIZAR
router.put('/:id', InstitutosController.putInstitutoItem);

//API ELIMINAR
router.delete('/:id', InstitutosController.deleteInstitutoItem);

router.post('/institutos', institutosController.addOne);
export default router;  