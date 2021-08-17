import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"



const { readJSON, writeJSON, writeFile } = fs

const authorsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../data/Authors.json")
// const booksJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../data/books.json")
const publicFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../../public/img/authorAvatar")

export const getAuthors = () => readJSON(authorsJSONPath)
export const writeAuthors = content => writeJSON(authorsJSONPath, content)
// export const getBooks = () => readJSON(booksJSONPath)
// export const writeBooks = content => writeJSON(booksJSONPath, content)

export const saveAuthorsPicture = (filename, contentAsBuffer) => writeFile(join(publicFolderPath, filename), contentAsBuffer)