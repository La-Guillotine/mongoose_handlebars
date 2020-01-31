const express = require('express');
const router = express.Router();

module.exports = (controller) => {
  search = false;
  router.get('/', (req, res) => {
    controller.getAll().then((users) => {
      res.render('list', {
        users
      });
    });
  });

  router.get('/details/:id', (req, res) => {
    const id = req.params.id;
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
      console.log(`User ${user._id} created`);
      res.redirect('/');
    }).catch((err) => {
      res.render('error500', { err });
    });
  });

  router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    controller.delete(id).then(() => {
      res.redirect('/');
    });
  });

  router.post('/search', (req,res) =>{
    let name = req.body.name;
    let search = true;
    controller.getByName(name).then((users) => {
      res.render('list', {
        users,
        search
      });
    });
  });
  router.get("/edit/:id",(req,res)=>{
    const id = req.params.id;
    controller.getOne(id).then((user) => {
      res.render('edit', {
        user,
      });
    }).catch((err) => {
      res.render('error500', { err });
    });
  });

  router.post("/edit/:id",(req,res)=>{
    let id = req.params.id;
    let user={
      id :id,
      firstName:req.body.firstname,
      lastName:req.body.lastname,
      email:req.body.email
    }
    controller.edit(user).then(()=>{
      res.redirect('/');
    });
    
  });

  return router;
}
