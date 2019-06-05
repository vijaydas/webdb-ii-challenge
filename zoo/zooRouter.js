const express = require("express");
const router = express.Router();
const knex = require("knex");
const Zoos = require("./zooModel.js");

// this configuration object teaches knex how to find the database and what driver to use
// const knexConfig = {
//   client: "sqlite3", // the sqlite3 database driver
//   useNullAsDefault: true, // needed when working with SQLite
//   connection: {
//     // relative to the root folder
//     filename: "./data/lambda.db3" // path to the database file
//     // if the database does not exist an empty one with this name will be created
//   }
// };

// const db = knex(knexConfig);

// router.get("/", (req, res) => {
//   Zoos.find()
//     .then(zoos => {
//       res.status(200).json(zoos);
//     })
//     .catch(error => {
//       res.status(500).json(error, "this is in the 500");
//     });
// });


router.get("/", async (req, res) => {
   try {
     const zoos =  await Zoos.find()
     res.status(200).json(zoos);
   }
   catch(err) {
     console.log(err)
     res.status(500).json({message: "server error"});
   }
});

router.post("/", checkZooBody, async (req, res) => {
  try {
    if (!req.body.name) {return res.status(400).json({message: "missing name"})};
    const newZoo = await Zoos.add(req.body)
    res.status(201).json({id: newZoo})
  }
  catch(err) {
    console.log(err)
    res.status(500).json({message: "server error"});
 }

});

router.put("/:id", checkZooBody, checkIfIDValid, async (req, res) => {
  try {
    await Zoos.update(req.params.id, req.body)
    res.sendStatus(200)
  }
  catch(err) {
    console.log(err)
    res.status(500).json({message: "server error"});
  }
});

router.delete("/:id", checkIfIDValid, async (req, res) => {
  try {
    await Zoos.remove(req.params.id)
    res.sendStatus(200)
  }
  catch(err) {
    console.log(err)
    res.status(500).json({message: " server error"})
  }
})

// CUSTOM MIDDLEWARE

function checkZooBody(req, res, next) {
  if (!req.body.name) {return res.status(400).json({message: "missing name"})};
  next()
}


async function checkIfIDValid(req, res, next) {
  try {
    const zoo = await Zoos.findById(req.params.id)
    if (zoo){
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
