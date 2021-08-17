import express from 'express';
import route from "./services/authors/index.js"
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

server.use("/authors", route);
server.use(notFoundErrorHandler)
server.use(badRequestErrorHandler)
server.use(forbiddenErrorHandler)
server.use(genericServerErrorHandler)
const port = process.env.PORT


server.listen(port, () => {
    console.log('server is running on port 5000');
})
