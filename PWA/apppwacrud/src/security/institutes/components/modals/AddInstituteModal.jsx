//JAPV: React
import React, { useState, useEffect } from "react";
//JAPV: Material
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
//JAPV: Formik - Yup
import { useFormik } from "formik";
import * as Yup from "yup";
//JAPV: Helpers
import { InstituteValues } from "../../helpers/InstituteValues";
//JAPV: Services
import { AddOneInstitute } from "../../../institutes/services/remote/post/AddOneInstitute";
import { GetAllLabels } from "../../../labels/services/remote/get/GetAllLabels";
//JAPV: Constants (Datos mock temporales)
import { TiposGiroMock } from "../../constants/TiposGiroData";

const AddInstituteModal = ({AddInstituteShowModal, setAddInstituteShowModal}) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);
    const [InstitutesValuesLabel, setInstitutesValuesLabel] = useState([]);

    //JAPV: En cuanto se abre la modal llama el metodo
    //que ejecuta la API que trae todas las etiquetas de la BD.
    useEffect(() => {
        if (AddInstituteShowModal) {
            getDataSelectInstitutesType();
        }
    }, [AddInstituteShowModal]);

    //JAPV: Ejecutamos la API que obtiene todas las etiquetas
    //y filtramos solo la etiqueta de Tipos Giros de Institutos
    //para que los ID y Nombres se agreguen como items en el
    //control <Select> del campo IdTipoGiroOK en la Modal.
    async function getDataSelectInstitutesType() {
        try {
            console.log("🔄 Iniciando carga de etiquetas...");
            
            // JAPV: Temporalmente usamos datos mock mientras la API de etiquetas está en desarrollo
            console.log("✅ Usando datos MOCK para Tipos de Giro");
            setInstitutesValuesLabel(TiposGiroMock);
            
            /* // JAPV: Código original con API (descomentar cuando la API esté lista)
            const Labels = await GetAllLabels();
            console.log("📦 Labels obtenidas:", Labels);
            
            const InstitutesTypes = Labels.find(
                (label) => label.IdEtiquetaOK === "IdTipoGiros"
            );
            console.log("🔍 Tipos de Giro encontrados:", InstitutesTypes);
            
            if (InstitutesTypes && InstitutesTypes.valores) {
                console.log("✅ Valores:", InstitutesTypes.valores);
                setInstitutesValuesLabel(InstitutesTypes.valores);
            } else {
                console.warn("⚠️ No se encontraron tipos de giros o la estructura es incorrecta");
                console.warn("Estructura completa:", InstitutesTypes);
                setInstitutesValuesLabel(TiposGiroMock);
            }
            */
        } catch (e) {
            console.error("❌ Error al obtener Etiquetas para Tipos Giros de Institutos:", e);
            console.log("📌 Usando datos MOCK como fallback");
            setInstitutesValuesLabel(TiposGiroMock);
        }
    }

    //JAPV: Definición Formik y Yup
    const formik = useFormik({
        initialValues: {
            IdInstitutoOK: "",
            IdInstitutoBK: "",
            DesInstituto: "",
            Alias: "",
            Matriz: false,
            IdTipoGiroOK: "",
            IdInstitutoSupOK: "",
        },
        validationSchema: Yup.object({
            IdInstitutoOK: Yup.string().required("Campo requerido"),
            IdInstitutoBK: Yup.string().required("Campo requerido"),
            DesInstituto: Yup.string().required("Campo requerido"),
            Alias: Yup.string().required("Campo requerido"),
            Matriz: Yup.boolean().required("Campo requerido"),
            IdTipoGiroOK: Yup.string(),
            IdInstitutoSupOK: Yup.string(),
        }),
        onSubmit: async (values) => {
            //JAPV: Mostramos el Loading
            setLoading(true);
            console.log("CAR: entro al onSubmit despues de hacer click en boton Guardar");
            //JAPV: Reiniciamos los estados de las alertas de éxito y error
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                //JAPV: Mutar los valores (true o false) de Matriz
                values.Matriz == true ? (values.Matriz = "S") : (values.Matriz = "N");
                //CAR: Extraer los datos de los campos de
                //la ventana modal que ya tiene Formik.
                const Institute = InstituteValues(values);
                //CAR: mandamos a consola los datos extraidos
                console.log("<<Institute>>", Institute);
                //CAR: llamar el metodo que desencadena toda la logica
                //para ejecutar la API "AddOneInstitute" y que previamente
                //construye todo el JSON de la coleccion de Institutos para
                //que pueda enviarse en el "body" de la API y determinar si
                //la inserción fue o no exitosa.
                await AddOneInstitute(Institute);
                //CAR: si no hubo error en el metodo anterior
                //entonces lanzamos la alerta de exito.
                setMensajeExitoAlert("Instituto fue creado y guardado Correctamente");
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear el Instituto");
            }
            //CAR: ocultamos el Loading.
            setLoading(false);
        },
    });

    //CAR: props structure for TextField Control.
    const commonTextFieldProps = {
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        fullWidth: true,
        margin: "dense",
        disabled: !!mensajeExitoAlert,
    };

    return(
        <Dialog 
            open={AddInstituteShowModal}
            onClose={() => setAddInstituteShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
                {/* CAR: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography component="h6">
                        <strong>Agregar Nuevo Instituto</strong>
                    </Typography>
                </DialogTitle>
                {/* CAR: Aqui va un tipo de control por cada Propiedad de Institutos */}
                <DialogContent 
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* CAR: Campos de captura o selección */}
                    <TextField
                        id="IdInstitutoOK"
                        label="IdInstitutoOK*"
                        value={formik.values.IdInstitutoOK}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdInstitutoOK && Boolean(formik.errors.IdInstitutoOK) }
                        helperText={ formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK }
                    />
                    <TextField
                        id="IdInstitutoBK"
                        label="IdInstitutoBK*"
                        value={formik.values.IdInstitutoBK}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdInstitutoBK && Boolean(formik.errors.IdInstitutoBK) }
                        helperText={ formik.touched.IdInstitutoBK && formik.errors.IdInstitutoBK }
                    />
                    <TextField
                        id="DesInstituto"
                        label="DesInstituto*"
                        value={formik.values.DesInstituto}
                        {...commonTextFieldProps}
                        error={ formik.touched.DesInstituto && Boolean(formik.errors.DesInstituto) }
                        helperText={ formik.touched.DesInstituto && formik.errors.DesInstituto }
                    />
                    <TextField
                        id="Alias"
                        label="Alias*"
                        value={formik.values.Alias}
                        {...commonTextFieldProps}
                        error={ formik.touched.Alias && Boolean(formik.errors.Alias) }
                        helperText={ formik.touched.Alias && formik.errors.Alias }
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formik.values.Matriz}
                                onChange={formik.handleChange}
                                name="Matriz"
                                color="primary"
                                disabled={!!mensajeExitoAlert}
                            />
                        }
                        label="Matriz"
                    />
                    <InputLabel id="IdTipoGiroOK-label" sx={{ mt: 2, mb: 1 }}>Tipo de Giro*</InputLabel>
                    <Select
                        labelId="IdTipoGiroOK-label"
                        id="IdTipoGiroOK"
                        value={formik.values.IdTipoGiroOK}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="IdTipoGiroOK"
                        disabled={!!mensajeExitoAlert}
                        error={formik.touched.IdTipoGiroOK && Boolean(formik.errors.IdTipoGiroOK)}
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value="">
                            <em>Selecciona una opción</em>
                        </MenuItem>
                        {InstitutesValuesLabel && InstitutesValuesLabel.length > 0 ? (
                            InstitutesValuesLabel.map((tipoGiro) => {
                                console.log("📍 Renderizando opción:", tipoGiro);
                                return (
                                    <MenuItem
                                        value={`IdTipoGiros-${tipoGiro.IdValorOK}`}
                                        key={tipoGiro.IdValorOK}
                                    >
                                        {tipoGiro.Valor}
                                    </MenuItem>
                                );
                            })
                        ) : (
                            <MenuItem disabled>
                                <em>⏳ Cargando opciones...</em>
                            </MenuItem>
                        )}
                    </Select>
                    <TextField
                        id="IdInstitutoSupOK"
                        label="IdInstitutoSupOK (Instituto Superior)"
                        value={formik.values.IdInstitutoSupOK}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdInstitutoSupOK && Boolean(formik.errors.IdInstitutoSupOK) }
                        helperText={ formik.touched.IdInstitutoSupOK && formik.errors.IdInstitutoSupOK }
                    />
                </DialogContent>
                {/* CAR: Aqui van las acciones del usuario como son las alertas o botones */}
                <DialogActions
                    sx={{ display: 'flex', flexDirection: 'row' }}
                >
                    <Box m="auto">
                        {console.log("mensajeExitoAlert", mensajeExitoAlert)}
                        {console.log("mensajeErrorAlert", mensajeErrorAlert)}
                        {mensajeErrorAlert && (
                        <Alert severity="error">
                            <b>¡ERROR!</b> ─ {mensajeErrorAlert}
                        </Alert>
                        )}
                        {mensajeExitoAlert && (
                        <Alert severity="success">
                            <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
                        </Alert>
                        )}
                    </Box>
                    {/* CAR: Boton de Cerrar. */}
                    <LoadingButton
                        color="secondary"
                        loadingPosition="start"
                        startIcon={<CloseIcon />}
                        variant="outlined"
                        onClick={() => setAddInstituteShowModal(false)}
                    >
                        <span>CERRAR</span>
                    </LoadingButton>
                    {/* CAR: Boton de Guardar. */}
                    <LoadingButton
                        color="primary"
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit"
                        disabled={!!mensajeExitoAlert}
                        loading={Loading}
                    >
                        <span>GUARDAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default AddInstituteModal;