// This app calculates data from survey answers and shows survey results based
// on the answers and data from a model (results and model data were not researched)

const express = require("express");
const app = express();
app.set( 'view engine', 'pug'); // set engine
app.set( 'views', 'views'); // set views
const surveyRoutes = require("./routes/survey");

const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");

app.use( bodyParser.urlencoded({extended: false}));
app.use( express.static( path.join(__dirname, 'public')));
app.use( surveyRoutes);
app.get('*', function(req, res){
    let pt = "Page Not Found!";
    res.render('notFound', {
        pageTitle: pt,
        subTitle: "Sorry, this page was not found. Please click the home button above."
    });
});

let port = 3003;
const server = http.createServer(app);
server.listen( port );
console.log( `Listening on http://localhost:${port}`);