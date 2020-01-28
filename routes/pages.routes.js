const express = require('express');

const router = express.Router();

module.exports = (controller) => {
  router.get('/', (req, res) => {
    controller.getAll().then((users) => {
      res.render('list', {
        users
      });
    });
  });

  router.get('/details/:id', (req, res) => {
    const id = +req.params.id;
    controller.getOne(id).then((user) => {
      res.render('details', {
        user,
        helpers: {
          pseudo: () => `${user.firstName}.${user.lastName[0]}`
        }
      });
    }).catch((err) => {
      res.render('error500', { err });
    });
  });

  router.get('/add', (req, res) => {
    res.render('add');
  });

  router.post('/', (req, res) => {
    const user = req.body;
    controller.create(user).then((user) => {
      console.log(`User ${user.id} created`);
      res.redirect('/');
    }).catch((err) => {
      res.render('error500', { err });
    });
  });

  router.get('/delete/:id', (req, res) => {
    const id = +req.params.id;
    controller.delete(id).then(() => {
      res.redirect('/');
    });
  });

  return router;
}
