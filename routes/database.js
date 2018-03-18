const Router = require('express-promise-router')
const db = require('../db')


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()


// export our router to be mounted by the parent application
module.exports = router


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query('SELECT * FROM account WHERE ID = $1', [id]);
  res.send(rows);
});



router.get('/insert/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.tx('SELECT * FROM account WHERE ID = $1', [id]);
    res.send(rows)
  } catch (err) {
    console.log('DATABASE ' + err)
  }
});


router.post('/wtf', async (req, res) => {
  // if we don't have the required information
  if (!req.body.id || !req.body.password || !req.body.email || !req.body.username) {
    res.send(404, "Invalid login options");
  }
  // retrieve the necessary parameters
  const id = req.body.id;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  try {
      const { rows } = await db.tx('INSERT INTO account(ID, username, email, password) VALUES($1, $2, $3, $4) RETURNING *', [id, username, email, password]);
      res.send(rows);
  } catch (err) {
      console.log('DATABASE', err);
      res.send(err)
    }
  })
