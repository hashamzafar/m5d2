import { Router } from "express"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid"
import fs from "fs"



const route = Router()


const cwf = fileURLToPath(import.meta.url)
const cwd = dirname(cwf)
const authorsJSONPath = join(cwd, "Authors.json")

const read = () => JSON.parse(fs.readFileSync(authorsJSONPath))

route.get("/", (req, res, next) => {
    const data = read()
    res.send(data)
})



export default route