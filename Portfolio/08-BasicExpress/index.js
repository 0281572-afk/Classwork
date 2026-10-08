import express from "express";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies


app.get('/', (req, res) => {
    try {
        const html = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8');
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    } catch (error) {
        res.status(500).send("Error reading index.html: " + error.message);
    }
});

app.post('/', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);

    if(!weight || !height) {
        return res.send("Please provide valid weight and height values.");
    }

    const bmi = (weight / Math.pow(height, 2)) * 10000;
    res.send(`Your BMI is ${bmi.toFixed(2)}`);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});