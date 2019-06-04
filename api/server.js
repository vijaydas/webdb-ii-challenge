const express = require('express'); 
const helmet = require('helmet');
const cors = require("cors");

const zooRouter = require("../zoo/zooRouter.js")

const server = express();
server.use(cors());

server.use(express.json());
server.use(cors())
server.use(helmet());

server.use('/api/zoos', zooRouter );

server.get("/", (req, res) => {
  res.sendStatus(200)
})

// server.get('/', logger, (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`)
// });

//custom middleware

server.use(logger);

//function 


function logger(req, res, next) {
  console.log(`A ${req.method} request to '${req.url}' at '${Date.now()}`);
  next();
}


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});


module.exports = server;
