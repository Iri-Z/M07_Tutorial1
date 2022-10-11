const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
//const Blog = require('./models/blog');
const { result } = require('lodash');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

//connect to database

const dbURI = 'mongodb+srv://netninja:password1234@nodetutorial.mchtda8.mongodb.net/nodeTutorial?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

//register view engine 
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.use((req, res, next ) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();

});

app.get('/', (req, res) => {
    res.redirect('/blogs');

});

app.use((req, res, next ) => {
    console.log('in the next middleware');
    next();
});

app.get('/about', (req, res) => {
    res.render('about', { title: "About"});

});

//blog routes
app.use('/blogs', blogRoutes);


//404 page 
app.use((req, res) => {
    res.status(404).render('404', { title: "404"});

});
 