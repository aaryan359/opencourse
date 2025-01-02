const express = require('express');


const { AddNonTechCourse ,getallcourse,addNonTechSubtopic} = require('../../controllers/NontechController/nontechcontrollers');

const  { verifyJWT  } = require("../../middlewares/authMiddlewares")
const router = express.Router();

router.post('/addnontechVideo',verifyJWT, AddNonTechCourse);
router.post('/addNonTechSubtopic',verifyJWT, addNonTechSubtopic);
router.get('/getnontechcourse', getallcourse);

module.exports = router;