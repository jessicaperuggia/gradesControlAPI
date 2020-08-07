import express from "express";
import gradesRouter from "./routes/grades.js";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

global.fileName = "grades.json";

const app = express();
app.use(express.json());

app.use("/grade", gradesRouter);

app.listen(3000, async () => {
    try {
        await readFile("global.fileName");
        console.log("API Started");
    } catch (err) {
        const initialJson = {
            nextId: 1,
            grades: []
        }
        writeFile("global.fileName", JSON.stringify(initialJson)).then(() => {
            console.log("API Started and File Created");
        }).catch(err => {
            console.log(err);
        });
    }

});