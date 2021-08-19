import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"



const { readJSON, writeJSON, writeFile } = fs

const authorsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../data/Authors.json")
const blogJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../data/blogs.json")
const publicFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../../public/img/authorAvatar")

export const getAuthors = () => readJSON(authorsJSONPath)
export const writeAuthors = content => writeJSON(authorsJSONPath, content)
export const getBlogs = () => readJSON(blogJSONPath)
export const writeBlogs = content => writeJSON(blogJSONPath, content)

export const saveBlogPicture = (filename, contentAsBuffer) => writeFile(join(publicFolderPath, filename), contentAsBuffer)