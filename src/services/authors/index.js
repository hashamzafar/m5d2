
// import { fileURLToPath } from "url"
// import { dirname, join } from "path"
import uniqid from "uniqid"
// import fs from "fs"
import express from "express"
import createHttpError from "http-errors"
// import validationResult from "express-validation"
import { authorValidator } from "./validator.js"
import { getAuthors, writeAuthors } from "../../lib/fs-tools.js"

const route = express.Router()
// const cwf = fileURLToPath(import.meta.url)
// const cwd = dirname(cwf)
// const authorsJSONPath = join(cwd, 'Authors.json')



// const getAuthors = () => JSON.parse(fs.readFileSync(authorsJSONPath))
// const writeAuthors = content => fs.writeFileSync(authorsJSONPath, JSON.stringify(content))
route.get("/", async (req, res, next) => {
    try {

        const authors = await getAuthors()
        // if (req.query && req.query.title) {
        //     const filteredAuthors = authors.filter(b => b.title === req.query.title)
        //     res.send(filteredAuthors)
        // } else {
        res.send(authors)
        // }
    } catch (error) {
        next(error)
    }

})
route.get("/:id", async (req, res, next) => {
    try {
        const authors = await getAuthors()

        const author = authors.find(b => b.id === req.params.id)
        if (author) {
            res.send(author)
        } else {
            next(createHttpError(404, `author with id ${req.params.id} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

route.post("/", authorValidator, async (req, res, next) => {
    try {
        const authors = await getAuthors()
        const newAuthor = { ...req.body, id: uniqid(), createdAt: new Date() }

        authors.push(newAuthor)

        await writeAuthors(authors)

        res.status(201).send({ id: newAuthor.id })
    } catch (error) {
        next(error)
    }
})
route.put("/:id", async (req, res, next) => {
    try {
        const authors = await getAuthors()

        const remainingAuthors = authors.filter(b => b.id !== req.params.id)

        const modifiedAuthor = { ...req.body, id: req.params.id }

        remainingAuthors.push(modifiedAuthor)

        await writeAuthors(remainingAuthors)

        res.send(modifiedAuthor)
    } catch (error) {
        next(error)
    }
})
route.delete("/:id", async (req, res, next) => {
    try {
        const authors = await getAuthors()

        const remainingAuthors = authors.filter(b => b.id !== req.params.id)

        await writeAuthors(remainingAuthors)

        res.status(204).send()
    } catch (error) {
        next(error)
    }
})


export default route