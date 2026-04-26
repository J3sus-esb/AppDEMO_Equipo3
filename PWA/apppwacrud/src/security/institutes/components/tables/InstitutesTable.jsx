
import React, { useEffect, useMemo, useState } from "react";

import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, Button, IconButton, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
//CGAC: DB
//import InstitutesStaticData from '../../../../../db/security/json/institutes/InstitutesData';
import {getAllInstitutes} from '../../services/remote/get/GetAllInstitutes';
//CGAC: ModalES
import AddInstituteModal from "../modals/AddInstituteModal";
//CGAC: columnas de la tabla de institutos
const InstitutesColumns = [
{
accessorKey: "IdInstitutoOK",
header: "ID OK",
size: 30, 
},
{
accessorKey: "IdInstitutoBK",
header: "ID BK",
size: 30, 
},
{
accessorKey: "DesInstituto",
header: "INSTITUTO",
size: 150, 
},
{
accessorKey: "Alias",
header: "ALIAS",
size: 50, 
},
{
accessorKey: "Matriz",
header: "MATRIZ",
size: 30, 
},
{
accessorKey: "IdTipoGiroOK",
header: "GIRO",
size: 150, 
},
{
accessorKey: "IdInstitutoSupOK",
header: "ID OK SUP",
size: 30, 
},
];
//JAPV: Tabla del FrontEnd.
const InstitutesTable = () => {
//CGAC: Controlar el estado del indicador (loading).
const [loadingTable, setLoadingTable] = useState(true);
//CDCH: controlar el estado de la data de Institutos.
const [InstitutesData, setInstitutesData] = useState([]);
//BAFS: controlar el estado que muesta u oculta la modal de nuevo Instituto.
const [AddInstituteShowModal, setAddInstituteShowModal] = useState(false);
useEffect(() => {
async function fetchData() {
try {
const AllInstitutesData = await getAllInstitutes();
setInstitutesData(AllInstitutesData);
//setInstitutesData(InstitutesStaticData);
setLoadingTable(false);
} catch (error) {
console.error("Error al obtener los institutos en useEffect de InstitutesTable:", error);
}}fetchData();}, []);
return (
<Box>
<Box>
<MaterialReactTable
columns={InstitutesColumns}
data={InstitutesData}
state={{isLoading: loadingTable}}
initialState={{ density: "compact", showGlobalFilter: true }}
muiSearchTextFieldProps={{
variant: 'outlined',
size: 'small',
placeholder: 'Buscar institutos...',
}}
enableDensityToggle={false}

// MASU : Barra de acciones personalizada
renderTopToolbarCustomActions={({ table }) => (
<>
<Stack direction="row" sx={{ m: 1 }}>
<Box>
<Tooltip title="Agregar">
<IconButton onClick={() => setAddInstituteShowModal(true)}>
<AddCircleIcon />
</IconButton>
</Tooltip>
<Tooltip title="Editar">
<IconButton>
<EditIcon />
</IconButton>
</Tooltip>
<Tooltip title="Eliminar">
<IconButton>
<DeleteIcon />
</IconButton>
</Tooltip>
<Tooltip title="Detalles ">
<IconButton>
<InfoIcon />
</IconButton>
</Tooltip>
</Box>
</Stack></> )}
/>
</Box>
<Dialog open={AddInstituteShowModal}>
<AddInstituteModal
AddInstituteShowModal={AddInstituteShowModal}
setAddInstituteShowModal={setAddInstituteShowModal}
onClose={() => setAddInstituteShowModal(false)}
/>
</Dialog>
</Box>
);
};
export default InstitutesTable;