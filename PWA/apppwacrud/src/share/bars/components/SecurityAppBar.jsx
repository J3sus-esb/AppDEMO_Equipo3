import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
//NOTA 4.1.1: Barra de Navegacion - Modulo Seguridad
//JAPV: Estados e importes de React
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
//AGU: Paginas principales del modulo
const pages = ['Etiquetas', 'Periodos', 'Institutos', 'Usuarios'];
//MASU: Opciones de usuario
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
//NOTA 4.1: Componente responsivo de barra de navegacion
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  //BAFS: Abrir menu de navegacion
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  //CDCH: Abrir menu de usuario
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  //JAPV: Procesar evento del menu
  const handleCloseNavMenu = (e) => {
    //CGAC: Ejecutar accion del menu
    handleClickNavMenu(e);
    setAnchorElNav(null);
  };
const handleCloseUserMenu = () => {
setAnchorElUser(null);
};
//+++++++++++++++++++++++++++++++++++++++++++++++
//CAR: Guardar el Estado de la Pagina Actual
const [myPages, setMyPages]= useState("");
//CAR: Clonar el objeto de navegacion (history).
const navigate = useNavigate();
//CAR: Actualizar el estado del useState de Paginas.
//cambiamos la opcion clickeada a mayusculas.
function handleClickNavMenu(e){
//console.log(e.target.innerText.toUpperCase());
setMyPages(e.target.innerText.toUpperCase());
}
//CAR: useEffect
useEffect(() => {
switch (myPages) {
case "":
navigate("/");
//console.log("entro a home");
break;
case "ETIQUETAS":
navigate("/labels");
break;
case "PERIODOS":
navigate("/periods");
break;
case "INSTITUTOS":
navigate("/institutes");
break;
case "USUARIOS":
navigate("/users");
break;
}
}, [myPages]);
//-----------------------------------------------
return (
<AppBar position="static">
<Container maxWidth="xl">
<Toolbar disableGutters>
<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
<Typography
variant="h6"
noWrap
component="a"
href="/"
sx={{
mr: 2,
display: { xs: 'none', md: 'flex' },
fontFamily: 'monospace',
fontWeight: 700,
letterSpacing: '.3rem',
color: 'inherit',
textDecoration: 'none',
}}
>
LOGO
</Typography>
<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
<IconButton
size="large"
aria-label="account of current user"
aria-controls="menu-appbar"
aria-haspopup="true"
onClick={handleOpenNavMenu}
color="inherit"
>
<MenuIcon />
</IconButton>
<Menu
id="menu-appbar"
anchorEl={anchorElNav}
anchorOrigin={{
vertical: 'bottom',
horizontal: 'left',
}}
keepMounted
transformOrigin={{
vertical: 'top',
horizontal: 'left',
}}
open={Boolean(anchorElNav)}
onClose={handleCloseNavMenu}
sx={{
display: { xs: 'block', md: 'none' },
}}
>
{pages.map((page) => (
<MenuItem key={page} onClick={handleCloseNavMenu}>
<Typography align="center">{page}</Typography>
</MenuItem>
))}
</Menu>
</Box>
<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
<Typography
variant="h5"
noWrap
component="a"
href=""
sx={{
mr: 2,
display: { xs: 'flex', md: 'none' },
flexGrow: 1,
fontFamily: 'monospace',
fontWeight: 700,
letterSpacing: '.3rem',
color: 'inherit',
textDecoration: 'none',
}}
>
LOGO
</Typography>
<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
{pages.map((page) => (
<Button
key={page}
/* onClick={handleCloseNavMenu} */
onClick={handleCloseNavMenu}
sx={{ my: 2, color: 'white', display: 'block' }}
>
{page}
</Button>
))}
</Box>
<Box sx={{ flexGrow: 0 }}>
<Tooltip title="Open settings">
<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
<Avatar alt="Remy Sharp" src="/files/images/userDefault.svg" />
</IconButton>
</Tooltip>
<Menu
sx={{ mt: '45px' }}
id="menu-appbar"
anchorEl={anchorElUser}
anchorOrigin={{
vertical: 'top',
horizontal: 'right',
}}
keepMounted
transformOrigin={{
vertical: 'top',
horizontal: 'right',
}}
open={Boolean(anchorElUser)}
onClose={handleCloseUserMenu}
>
{settings.map((setting) => (
<MenuItem key={setting} onClick={handleCloseUserMenu}>
<Typography align="center">{setting}</Typography>
</MenuItem>
))}
</Menu>
</Box>
</Toolbar>
</Container>
</AppBar>
);
}
export default ResponsiveAppBar;