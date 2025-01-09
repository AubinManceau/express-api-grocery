import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const db = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    server: process.env.HOST,
    port: process.env.SQL_PORT || 1433,
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true,
            trustServerCertificate: true,
        },
    },
    logging: false,
});

export default db;
