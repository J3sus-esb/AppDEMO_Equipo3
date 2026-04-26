import React, { useState, useEffect } from "react";
//CGAC: Componentes Material UI
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
//AGU: Validación y gestión de formularios
import { useFormik } from "formik";
import * as Yup from "yup";
//BAFS: Helpers para transformar valores
import { InstituteValues } from "../../helpers/InstituteValues";
//MASU: Servicios remotos
import { AddOneInstitute } from "../../../institutes/services/remote/post/AddOneInstitute";
import { GetAllLabels } from "../../../labels/services/remote/get/GetAllLabels";
//CDCH: Datos mock temporales
import { TiposGiroMock } from "../../constants/TiposGiroData";

const AddInstituteModal = ({AddInstituteShowModal, setAddInstituteShowModal}) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);
    const [InstitutesValuesLabel, setInstitutesValuesLabel] = useState([]);

    // CAR: Al abrir la modal, se cargan datos de etiquetas
    useEffect(() => {
        if (AddInstituteShowModal) {
            getDataSelectInstitutesType();
        }
    }, [AddInstituteShowModal]);

    async function getDataSelectInstitutesType() {
        try {
            console.log("Iniciando carga de etiquetas...");
            
            // JAPV: Temporalmente usamos datos mock mientras la API de etiquetas está en desarrollo
            console.log("Usando datos MOCK para Tipos de Giro");
            setInstitutesValuesLabel(TiposGiroMock);
            

        } catch (e) {
            console.error("rror al obtener Etiquetas para Tipos Giros de Institutos:", e);
            console.log("Usando datos MOCK como fallback");
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
           
            //AGU: Mostramos estado de carga
            setLoading(true);
            //MASU: Reiniciamos estados de alertas
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                //BAFS: Transformar valores booleanos a string (S/N)
                values.Matriz == true ? (values.Matriz = "S") : (values.Matriz = "N");
                //CDCH: Estructura de datos - Mapear campos de formulario
                const Institute = InstituteValues(values);
                //JAPV: Llamar API para crear Instituto
                //para ejecutar la API "AddOneInstitute" y que previamente
                //construye todo el JSON de la coleccion de Institutos para
                //que pueda enviarse en el "body" de la API y determinar si
                //la inserción fue o no exitosa.
                await AddOneInstitute(Institute);
                
                setMensajeExitoAlert("Instituto fue creado y guardado Correctamente");
            } catch (e) {
                
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear el Instituto");
            }
            //CGAC: Finalizar estado de carga
            setLoading(false);
        },
    });


    //AGU: Configuración reutilizable de campos
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
                {/* NOTA 3.4: Encabezado - Título de la Modal */}
                <DialogTitle>
                    <Typography component="h6">
                        <strong>Agregar Nuevo Instituto</strong>
                    </Typography>
                </DialogTitle>
                {/* NOTA 3.5: Campos de entrada - Formulario de datos */}
                <DialogContent 
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* NOTA 3.5.1: TextFields para captura de datos */}
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
                {/* NOTA 3.6: Acciones - Alertas y botones de control */}
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