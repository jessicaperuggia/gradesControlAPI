import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        let grade = req.body;
        const data = JSON.parse(await readFile("grades.json"));

        grade = { id: data.nextId++, ...grade };
        data.grades.push(grade);

        await writeFile("grades.json", JSON.stringify(data, null, 2));

        res.send(grade);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

export default router;