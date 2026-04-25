import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
//CGAC: Importar Rutas
import routeAPI from "./api/v1/routes/index.js";

//AGU: Importar Swagger
//JAPV: Importar Rutas
//CDCH: Importar Middlewares
//BAFS: Config para variables de entorno
import config from './config/config';
//MASU: Declaramos la constante app igualandola a express
const app = express();

//CGAC: Establece la conexión a la BD 
import { mongoose } from './config/database.config';
//JAPV: Settings
app.set('port', config.PORT);
mongoose.connection.on('error', (error) => {
    console.error('Mongo connection error:', error);
});
mongoose.connection.on('connected', () => {
    console.log('Mongo connection ready');
});
//AGU: Middlewares generales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//BAFS: Rutas
//BAFS: Rutas
app.get('/', (req, res) => {
    res.redirect('/api/v1');
});
const api = config.API_URL;
app.get('/api/v1', (req,res)=>{
    res.send(
        `<h1>RESTful running in root</h1> <p> eCommerce: <b>${api}/api-docs</b> for more information.</p>`
    );
})
// Rutas
routeAPI(app);
// Documentación Swagger
// Middleware para el manejo de errores
// Exportar App
export default app;
