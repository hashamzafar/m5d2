import uniqid from "uniqid"
import express from "express"
import createHttpError from "http-errors"
import { authorValidator } from "./validator.js"
import { getAuthors, writeAuthors } from "../../lib/fs-tools.js"

const route = express.Router()

route.get("/", async (req, res, next) => {
    try {
        console.log("helloooooooo")
        const authors = await getAuthors()
        if (req.query && req.query.title) {
            const filteredAuthors = authors.filter(b => b.title === req.query.title)
            res.send(filteredAuthors)
        } else {
            res.send(authors)
        }
    } catch (error) {
        next(error)
    }
})
route.get("/:id", async (req, res, next) => {
    try {
        const authors = await getAuthors()
        console.log(authors)
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