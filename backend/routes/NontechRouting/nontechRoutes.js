const express = require('express');


const { AddNonTechCourse ,getallcourse,addNonTechSubtopic,getNonTechSubtopic} = require('../../controllers/NontechController/nontechcontrollers');

const  { verifyJWT  } = require("../../middlewares/authMiddlewares")
const router = express.Router();

router.post('/addnontechVideo',verifyJWT, AddNonTechCourse);
router.post('/addNonTechSubtopic',verifyJWT, addNonTechSubtopic);
router.post('/getnontechsubtopic', getNonTechSubtopic);
router.get('/getnontechcourse', getallcourse);

module.exports = router;