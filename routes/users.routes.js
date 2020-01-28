const express = require('express');

const router = express.Router();

module.exports = (controller) => {
  router.get('/', (req, res) => {
    controller.getAll().then((users) => {
      res.json(users);
    });
  });

  router.get('/:id', (req, res) => {
    const id = +req.params.id;
    controller.getOne(id).then((user) => {
      res.json(user);
    });
  });

  router.post('/', (req, res) => {
    const user = req.body;
    controller.create(user).then((user) => {
      res.json(user);
    });
  });

  router.delete('/:id', (req, res) => {
    const id = +req.params.id;
    controller.delete(id).then((ok) => {
      res.json({ result: ok });
    });
  });

  return router;
}
