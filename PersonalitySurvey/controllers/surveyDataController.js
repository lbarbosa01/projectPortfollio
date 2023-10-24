// Controllers
const questions = require("../models/surveyDataModel");
const categories = require("../models/surveyCatModel");
const MAX_PTS = require("../models/surveyMaxModel");
let results = [];

exports.getQuery = (req,res, next) => {
    res.render('survey', {
        questions: questions,
        pageTitle: "Interest Survey",
        from: 'survey'
    })
}

exports.getAbout = (req,res, next) => {
    res.render('about', {
        pageTitle: "Under Construction",
        subTitle: "This page is under construction. More will be added soon.",
        from: 'about'
    })
}

exports.postData = (req, res, next) => {
    const data = JSON.parse(JSON.stringify(req.body));
    Object.keys(data).forEach(key => {
        let value = data[key];
        let v = parseInt(data[key]);
        for (let i =0; i<questions.length; i++) {
            if (key == questions[i].id) {
                if (questions[i].cat == 0) {
                    categories[0].points += v;
                }
                if (questions[i].cat == 1) {
                    categories[1].points += v;
                }
                if (questions[i].cat == 2) {
                    categories[2].points += v;
                }
            }
        }
        // console.log(`${key}: ${value}`);
    });
    for (let i=0; i<categories.length; i++) {
        if (categories[i].points != 0) {
            let percent = categories[i].points / MAX_PTS;
            let calculate  = Math.ceil(percent * 100);
            if ( calculate > 75) {
                categories[i].color = "greenyellow";
            }
            else if (50 <= calculate < 75) {
                categories[i].color = "yellow";
            }
            else {
                categories[i].color = "#FFAA33";
            }
            categories[i].percentage = calculate;
        }
    }
    res.redirect('/surveyResults')
}

exports.getResults = (req, res, next) => {
    res.render('surveyResults', {
            categories : categories,
            results : results,
            pageTitle : "Interest Survey Results",
            from : 'survey'
        });
    for (let i =0; i<categories.length; i++) {
        categories[i].points = 0;
        categories[i].percentage = 0;
        categories[i].color = "#FFAA33";
    }
}
