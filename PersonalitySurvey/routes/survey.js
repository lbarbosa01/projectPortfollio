const express = require('express');
const router = express.Router();
const dataController = require("../controllers/surveyDataController");

router.get( '/survey', dataController.getQuery);  // for controller
router.post( '/data', dataController.postData );
router.get('/about', dataController.getAbout);
router.get( '/surveyResults', dataController.getResults);

module.exports = router;