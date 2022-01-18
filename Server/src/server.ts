process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import 'reflect-metadata';
import App from '@/app';
import { AuthController } from '@controllers/auth.controller';
import { IndexController } from '@controllers/index.controller';
import { UsersController } from '@controllers/users.controller';
import { ChatController } from '@/controllers/chat.controller'
import { FileController } from '@/controllers/file.controller'


import chatController from '@/socketControllers/chat.socketController'
import mediaSoupController from '@/socketControllers/mediaSoup.socketController';
import validateEnv from '@utils/validateEnv';

validateEnv();

// create the app
const app = new App([AuthController, IndexController, UsersController,ChatController,FileController],[chatController,mediaSoupController]);


// create a websocket server
