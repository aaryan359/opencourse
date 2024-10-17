const express = require('express');


const { AddNonTechvideos } = require('../../controllers/NontechController/nontechcontrollers');
console.log("vikas:",AddNonTechvideos);
const  { verifyJWT  } = require("../../middlewares/authMiddlewares")
const router = express.Router();

router.post('/addnontechVideo',verifyJWT, AddNonTechvideos);

module.exports = router;