require('dotenv').config(); // Load environment variables from .env file
const fastify = require('fastify');
const mongoose = require('mongoose');
const morgan = require('morgan');


console.log(process.env.DB_URL);
const connection = mongoose.connect(process.env.DB_URL);

connection.then(()=>{
    console.log("Database Connected Successfully");
})
.catch((err:Error)=>{
    
    console.log(err)
})

const app = fastify();

app.addHook('onRequest', (request : Request, reply: Response, done) => {
    morgan('dev')(request.req, reply.res, done);
  });


const start = async () => {

  try {
    await app.listen({port:3004});
    console.log("Server Connected");
    // console.log(`Server started on http://localhost:${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
