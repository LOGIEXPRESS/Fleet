//generar nuestra conexion con la db!

import { Sequelize } from 'sequelize-typescript';
import config from '../lib/config';
const {
	DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
  } = process.env;
   
config; 
export const sequelize = process.env.NODE_ENV === "production"?
new Sequelize({
   database: DB_NAME,
   dialect: "postgres",
   host: DB_HOST,
   port: 5432,
   username:  DB_USER ,
   password: DB_PASSWORD,
   models: [__dirname + '/models'],
   pool: {
	 max: 3,
	 min: 1,
	 idle: 10000,
   },
   dialectOptions: {
	 ssl: {
	   require: true,
	   // Ref.: https://github.com/brianc/node-postgres/issues/2009
	   rejectUnauthorized: false,
	 },
	 keepAlive: true,
   },
   ssl: true,
 })
:new Sequelize({
	dialect: 'postgres',
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	username: process.env.DB_USER,
	storage: ':memory:',
	models: [__dirname + '/models'],
});


