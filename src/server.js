import express from 'express';
import AuthorsService from "./services/index.js"


const server = express();

server.use(express.json());
const port = 5000;
server.use("/Authors", AuthorsService);

server.listen(port, () => {
    console.log('server is running on port 5000');



})
