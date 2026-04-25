import * as InstitutosServices from '../services/institutos.service';
import boom from '@hapi/boom';
import { OK, FAIL } from '../../../middlewares/resp.handler';

//CGAC: API GET 
//---------------------------------------- 
//AGU: Todos los Institutos.
export const getInstitutosList = async (req, res, next) => {
  try {
    const institutosList = await InstitutosServices.getInstitutosList();
    if (!institutosList || institutosList.length === 0) {
      return res.status(200).json(OK('No hay institutos en el catálogo.', []));
    }
    res.status(200).json(OK('Institutos listados correctamente.', institutosList));
  } catch (error) {
    next(error);
  }
};

//JAPV: Solo un Instituto.
export const getInstitutoItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const keyType = req.query.keyType || 'OK';
    const institutoItem = await InstitutosServices.getInstitutoItem(id, keyType);
    if (!institutoItem) {
      return res.status(404).json(
        FAIL('Instituto no encontrado.')
      );
    }
    res.status(200).json(OK('Instituto encontrado.', institutoItem));
  } catch (error) {
    next(error);
  }
};

//CDCH: API POST
//----------------------------------------
//NOTA 7.2 Y 7.2.1: Agregar nuevo Instituto con manejo de status 201/409
export const postInstitutoItem = async (req, res, next) => {
  try {
    const newInstituto = req.body;
    const institutoCreated = await InstitutosServices.postInstitutos(newInstituto);
    
    if (!institutoCreated) {
      // Status 400: Bad Request
      res.status(400).json(
        FAIL('No se pudo crear el instituto.')
      );
    } else if (institutoCreated) {
      // Status 201: Created - Indica creación exitosa
      res.status(201).json(
        OK('Instituto agregado correctamente al catálogo.', institutoCreated)
      );
    }
  } catch (error) {
    // Manejo de errores específicos
    if (error.code === 11000) {
      // Status 409: Conflict - Clave duplicada
      return res.status(409).json(
        FAIL('Instituto ya existe en el sistema.', error)
      );
    }
    next(error);
  }
};

//NOTA 7.1.2: Controlador para agregar elemento a subdocumento (array)
export const pushElementToSubdocument = async (req, res, next) => {
  try {
    const { id, fieldName } = req.params;
    const objToAdd = req.body;
    
    const result = await InstitutosServices.pushObjToSubdocument(id, objToAdd, fieldName);
    
    if (!result.success) {
      return res.status(400).json(
        FAIL('No se pudo agregar el elemento al subdocumento.', result.error)
      );
    }
    
    // Status 200: OK - Actualización exitosa
    res.status(200).json(
      OK('Elemento agregado correctamente al subdocumento.', result.institutUpdated)
    );
  } catch (error) {
    next(error);
  }
};

//BAFS: API PUT
//----------------------------------------
//NOTA 8.2: Actualizar Instituto existente
export const putInstitutoItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('JAPV: controller id --> ', id);
    const paInstitutoItem = req.body;
    console.log('CGAC: controller body --> ', paInstitutoItem);
    const updatedInstitutoItem = await InstitutosServices.putInstitutoItem(id, paInstitutoItem);
    if (!updatedInstitutoItem) {
      throw boom.badRequest('No se pudo actualizar el Instituto.');
    } else if (updatedInstitutoItem) {
      // Status 200: OK - Actualización exitosa
      res.status(200).json(OK('Instituto actualizado correctamente.', updatedInstitutoItem));
    }
  } catch (error) {
    next(error);
  }
};

//NOTA 8.1.1: Controlador para actualizar elemento en subdocumento (array)
export const updateElementInSubdocument = async (req, res, next) => {
  try {
    const { id, fieldName } = req.params;
    const objToUpdate = req.body;
    
    const result = await InstitutosServices.updateObjInSubdocument(id, objToUpdate, fieldName);
    
    if (!result.success) {
      return res.status(400).json(
        FAIL('No se pudo actualizar el elemento en el subdocumento.', result.error)
      );
    }
    
    // Status 200: OK - Actualización exitosa
    res.status(200).json(
      OK('Elemento actualizado correctamente en el subdocumento.', result.institutUpdated)
    );
  } catch (error) {
    next(error);
  }
};

//MASU: API DELETE
//----------------------------------------
//NOTA 9.2: Eliminar Instituto existente
export const deleteInstitutoItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('BAFS: controller DELETE id --> ', id);
    const deletedInstitutoItem = await InstitutosServices.deleteInstitutoItem(id);
    if (!deletedInstitutoItem) {
      throw boom.notFound('No se encontró el Instituto a eliminar.');
    } else if (deletedInstitutoItem) {
      // Status 200: OK - Eliminación exitosa
      res.status(200).json(
        OK('Instituto eliminado correctamente del catálogo.', deletedInstitutoItem)
      );
    }
  } catch (error) {
    next(error);
  }
};