//Education
import Institutos from "../models/Institutos";
import boom from '@hapi/boom';

//MASU: GET INSTITUTOS LIST
export const getInstitutosList = async () => {
  let institutosList;
  try {
    institutosList = await Institutos.find();
    return institutosList;
  } catch (error) {
    throw boom.internal(error);
  }
};

//CDCH: GET INSTITUTO BY ID
export const getInstitutoItem = async (id, keyType) => {
  let institutoItem;

  try {
    if (keyType === 'OK') {
      institutoItem = await Institutos.findOne({
        IdInstitutoOK: id,
      });
    } else if (keyType === 'BK') {
      institutoItem = await Institutos.findOne({
        IdInstitutoBK: id,
      });
    }
    return institutoItem;
  } catch (error) {
    throw boom.internal(error);
  }
};

//CGAC: POST (ADD) INSTITUTO
export const postInstitutos = async (paInstitutoItem) => {
  try {
    const newInstitutoItem = new Institutos(paInstitutoItem);
    return await newInstitutoItem.save();
  } catch (error) {
    throw boom.internal(error);
  }
};

//NOTA 7.1.2: PUSH A SUBDOCUMENTO - ARREGLO DE OBJETOS
//JAPV: ADD ELEMENT TO SUBDOCUMENT ARRAY
//Ejemplo: Agregar información adicional a institutos (si tuviera subdocumentos)
export const pushObjToSubdocument = async (id, objToAdd, fieldName) => {
  try {
    // fieldName ejemplo: "info_adicional", "detalles", etc
    const institutUpdated = await Institutos.findOneAndUpdate(
      { IdInstitutoBK: id },
      { $push: { [fieldName]: objToAdd } },
      { new: true }
    );
    return { success: true, institutUpdated };
  } catch (error) {
    return { success: false, error };
  }
};

//NOTA 8.1: PUT (MODIFY) INSTITUTOS
//BAFS: PUT API
//Método para actualizar un Instituto existente
export const putInstitutoItem = async (id, paInstitutoItem) => {
  try {
    return await Institutos.findOneAndUpdate(
      { IdInstitutoOK: id },
      paInstitutoItem,
      { new: true }
    );
  } catch (error) {
    throw boom.badImplementation(error);
  }
};

//NOTA 8.1.1: PUT SUBDOCUMENTO - ARREGLO DE OBJETOS
//CDCH: UPDATE ELEMENT IN SUBDOCUMENT ARRAY
//Método para actualizar elementos dentro de un arreglo de objetos en un subdocumento
export const updateObjInSubdocument = async (id, objToUpdate, fieldName) => {
  try {
    // fieldName ejemplo: "info_adicional", "detalles", etc
    const institutUpdated = await Institutos.findOneAndUpdate(
      { IdInstitutoOK: id },
      { $set: { [fieldName]: objToUpdate } },
      { new: true }
    );
    return { success: true, institutUpdated };
  } catch (error) {
    return { success: false, error };
  }
};

//NOTA 9.1: DELETE (REMOVE) INSTITUTOS
//AGU: DELETE API
//Método para eliminar un Instituto existente
export const deleteInstitutoItem = async (id) => {
  try {
    return await Institutos.findOneAndDelete(
      { IdInstitutoOK: id }
    );
  } catch (error) {
    throw boom.badImplementation(error);
  }
};