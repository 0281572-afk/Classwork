import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import path from 'path';

const app = express();
const PORT = 3000;

const names = [];
const tasks = [];

app.engine('html', ejs.renderFile); //EJS as the template engine for html files
app.set('views', path.join(process.cwd(), 'html')); // set the views directory to the 'html' folder
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//get 
//allow the root path to return the index.html file provided.
app.get('/', (req, res) => {
    res.render('index', { names, tasks, error: null });
});

app.get('/greet', (req, res) => {
    const { name } = req.query;
    if (name && name.trim() !== "") {
        console.log("New name received:", name);  
        names.push(name.trim()); // stores name
    }
    //redirect 
    res.render('index', { names, tasks, error: null });
});

app.get('/greet/:index', (req, res, next) => {
    const idx = parseInt(req.params.index, 10);

    //error handling 
    if (isNaN(idx) || idx < 0 || idx >= names.length) {
        const err = new Error(`The index [${req.params.index}] is out of bounds.`);
        return next(err); 
    }

    res.render('index', { name: names[idx] });
});

//post

app.post('/task', (req, res) => {
    const { task } = req.body;
    if (task && task.trim() !== "") {
        tasks.push(task.trim());
    }
    res.render('index', { names, tasks, error: null });
});

app.get('/task/move/:direction/:index', (req, res) => {
    const idx = parseInt(req.params.index, 10);
    const { direction } = req.params;

    if (direction === 'up' && idx > 0) {
        const temp = tasks[idx];
        tasks[idx] = tasks[idx - 1];
        tasks[idx - 1] = temp;
    } else if (direction === 'down' && idx < tasks.length - 1) {
        const temp = tasks[idx];
        tasks[idx] = tasks[idx + 1];
        tasks[idx + 1] = temp;
    }

    res.render('index', { names, tasks, error: null });
});

app.get('/task', (req, res) => {
    res.json(tasks);
});

//delete

app.get('/task/delete/:index', (req, res) => {
    const idx = parseInt(req.params.index, 10);
    if (!isNaN(idx) && idx >= 0 && idx < tasks.length) {
        tasks.splice(idx, 1);
    }
    res.render('index', { names, tasks, error: null });
});

//put
app.put('/greet/:name', (req, res) => {
    const newName = req.params.name;
    if (newName) {
        names.push(newName);
    }
    res.json(names);
});

//error handling 
app.use((err, req, res, next) => {
    console.error("Error capturado:", err.message);
    res.status(400).render('index', {
        names,
        tasks,
        error: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
