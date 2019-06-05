const express = require("express");
const router = express.Router();
//const knex = require("knex");
const Bears = require("./bearModel.js");

router.get("/", async (req, res) => {
   try {
     const bears =  await Bears.find()
     res.status(200).json(bears);
   }
   catch(err) {
     console.log(err)
     res.status(500).json({message: "server error"});
   }
});

router.post("/", checkBearBody, async (req, res) => {
  try {
    if (!req.body.name) {return res.status(400).json({message: "missing name"})};
    const newBear = await Bears.add(req.body)
    res.status(201).json({id: newBear})
  }
  catch(err) {
    console.log(err)
    res.status(500).json({message: "server error"});
 }

});

router.put("/:id", checkBearBody, checkIfIDValid, async (req, res) => {
  try {
    await Bears.update(req.params.id, req.body)
    res.sendStatus(200)
  }
  catch(err) {
    console.log(err)
    res.status(500).json({message: "server error"});
  }
});

router.delete("/:id", checkIfIDValid, async (req, res) => {
  try {
    await Bears.remove(req.params.id)
    res.sendStatus(200)
  }
  catch(err) {
    console.log(err)
    res.status(500).json({message: " server error"})
  }
})

// CUSTOM MIDDLEWARE

function checkBearBody(req, res, next) {
  if (!req.body.name) {return res.status(400).json({message: "missing name"})};
  next()
}


async function checkIfIDValid(req, res, next) {
  try {
    const bear = await Bears.findById(req.params.id)
    if (bear){
      next()
    } else {
      res.sendStatus(404)
    }
  } 
  catch(err) {
    res.status(500).json({message: "fail"})
  }
 
}




module.exports = router;
