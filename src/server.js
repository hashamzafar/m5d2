import express from 'express';
import route from "./services/authors/index.js"
import blogsRouter from "./services/blogpost/index.js"
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import {
    notFoundErrorHandler,
    badRequestErrorHandler,
    forbiddenErrorHandler,
    genericServerErrorHandler,
} from "./errorHandlers.js";
import { join } from "path"

const publicFolderPath = join(process.cwd(), "public")


const server = express();

const whiteList = [process.env.DEV, process.env.PRO]// COMING FROM ENV FILE

const corsOpts = {
    origin: function (origin, next) {
        console.log('ORIGIN --> ', origin)
        if (!origin || whiteList.indexOf(origin) !== -1) { // if received origin is in the whitelist I'm going to allow that request
            next(null, true)
        } else { // if it is not, I'm going to reject that request
            next(new Error(`Origin ${origin} not allowed!`))
        }
    }
}
server.use(express.static(publicFolderPath))
server.use(cors(corsOpts))
// server.use(cors())
server.use(express.json());

server.use("/authors", route);
server.use("/blogs", blogsRouter)



server.use(notFoundErrorHandler)
server.use(badRequestErrorHandler)
server.use(forbiddenErrorHandler)
server.use(genericServerErrorHandler)

const port = process.env.PORT// COMING FROM ENV FILE


server.listen(port, () => {
    console.log('server is running on port 5000');
})
console.table(listEndpoints(server))
server.on("error", (error) => { console.log(error) })
