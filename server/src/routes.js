import express from 'express';

const routes = express();

//Controller imports
import userController from './controllers/userController.js';

//Basic Routes
routes.get('/', basicController.get);

//User Routes
routes.post('/signup', userController.post);

export default routes;