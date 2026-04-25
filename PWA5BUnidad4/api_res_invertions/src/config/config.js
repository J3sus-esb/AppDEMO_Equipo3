import dotenv from 'dotenv';
dotenv.config();
export default {
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3000,
    API_URL: process.env.API_URL || '/api/v1',
    CONNECTION_STRING: process.env.CONNECTION_STRING || 'mongodb+srv://AaronGalaviz:111209@cluster0.rf8jwui.mongodb.net/?appName=Cluster0',
    DATABASE: process.env.DATABASE || 'Cluster0', 
    DB_PASSWORD: process.env.DB_PASSWORD || '111209', 
    DB_USER: process.env.DB_USER || 'AaronGalaviz',
}