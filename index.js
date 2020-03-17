const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const copyrightYear = require('./modules/copyright_year');

// Init express
const app = express();

// Setup Handlebars
app.engine('hbs', hbs({
        defaultLayout: 'main',
        extname: '.hbs',
        layoutsDir: __dirname + '/views/layouts/',
        partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');

// Setup static path
app.use(express.static(path.join(__dirname, 'public')));

// Static endpoints
app.get('/', (req, res) => res.render('index', {layout: 'landing'}));
app.get('/about', (req, res) => res.render('about', {page : {about: true, name: 'About'}, copyrightYear}));

app.get('/application', (req, res) => res.render('application', {page : {application: true, name: 'Join'}, copyrightYear}));
app.get('/imprint', (req, res) => res.render('imprint'));

//TODO: Move to router when more is added
app.get('/servers', (req, res) => res.redirect('/servers/ts3'));
app.get('/servers/ts3', (req, res) => res.render('servers', {page : {servers: true, ts3: true, name: 'Teamspeak 3'}, copyrightYear}));

// Router endpoints
app.use('/members', require('./routes/members'));

// Handle not found
//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
        res.sendStatus(404);
});

// Setup listening
const PORT = process.env.PORT || 7700;
app.listen(PORT, 'localhost', console.log(`Server started on port ${PORT}`));