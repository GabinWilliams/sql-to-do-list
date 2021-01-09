const express = require('express');
const router = express.Router();


// DataBase CONNECTION
const pool = require('../modules/pool.js');


// GET
router.get('/', (req, res) => {
  let queryText = `
    SELECT * FROM "todo";
  `;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error getting tasks', error);
      res.sendStatus(500);
    });
});


// POST
router.post('/', (req, res) => {
  // musicLibrary.push(req.body);
  console.log(req.body);
  const newTask = req.body;
  // send body data to db
  //prepared statement
  const queryText = `
    INSERT INTO "todo" ("task")
    VALUES ($1);
  `;
  // $1 is placeholder
  // go get first thing from array
  pool
    .query(queryText, [
      newTask.task
      
    ])
    .then((result) => {
      console.log(result);
      //result is meaningless, only care about yay! or NO!
      res.sendStatus(201);
    })
    .catch((error) => {
      //even when things go wrong, send a response to client
      console.log(error);
      res.sendStatus(500);
    });
});// end POST


// DELETE
router.delete('/:id', (req, res) => {
  // target id of thing being deleted
  let id = req.params.id;
  console.log('Delete route called with id of: ', id);

  // sql to delete item from database
  const queryText = `DELETE FROM "todo" WHERE "id" = $1;`;

  // sending sql code to postico
  pool.query(queryText, [id])
    .then((result) => {
        
      res.sendStatus(204);

    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});// end DELETE









module.exports = router;