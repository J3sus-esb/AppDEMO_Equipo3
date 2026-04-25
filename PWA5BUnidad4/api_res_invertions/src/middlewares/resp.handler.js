/**
 * NOTA 7.1.1: Crear Servicio POST enviando objeto JSON
 * Response Handlers - Middlewares para formatear respuestas estandarizadas
 * 
 * Este archivo contiene funciones helper para enviar respuestas consistentes
 * a través de toda la API (éxito o error)
 */

/**
 * Respuesta exitosa - OK
 * @param {string} message - Mensaje de éxito
 * @param {*} data - Datos a retornar
 * @returns {object} Objeto con estructura estandarizada
 */
export const OK = (message, data) => {
  return {
    message: message || 'OK',
    data: data,
    success: true,
    fail: false,
  };
};

/**
 * Respuesta fallida - FAIL
 * @param {string} message - Mensaje de error
 * @param {*} data - Datos adicionales del error
 * @returns {object} Objeto con estructura estandarizada
 */
export const FAIL = (message, data) => {
  return {
    message: message || 'FAIL',
    data: data,
    success: false,
    fail: true,
  };
};
