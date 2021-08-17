import express from 'express';
import AuthorsService from "./services/authors/index.js"
import cors from "cors"
import {
    notFoundErrorHandler,
    badRequestErrorHandler,
    forbiddenErrorHandler,
    genericServerErrorHandler,
} from "./errorHandlers.js";

const server = express();



server.use(cors())
server.use(express.json());
const port = 5000;

server.use("/authors", AuthorsService);
server.use(notFoundErrorHandler)
server.use(badRequestErrorHandler)
server.use(forbiddenErrorHandler)
server.use(genericServerErrorHandler)



server.listen(port, () => {
    console.log('server is running on port 5000');
})
