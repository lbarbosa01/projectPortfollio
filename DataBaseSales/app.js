// This program retrieves sales information from a database from phpmyadmin
const express = require("express");
const app = express();
app.set( 'view engine', 'pug');
app.set( 'views', 'views');

const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const menuRoutes = require("./routes/menu");

app.use( bodyParser.urlencoded({extended: false}));
app.use( express.static( path.join(__dirname, 'public')));
app.use( menuRoutes.routes);
app.get('*', function(req, res){
    res.render('notFound', {
        pageTitle: "Page Not Found",
        subTitle: "Sorry, this page was not found. Please click the home button above."
    });
});


let port = 3002;
const server = http.createServer(app);
server.listen( port );
console.log( `Listening on http://localhost:${port}`);