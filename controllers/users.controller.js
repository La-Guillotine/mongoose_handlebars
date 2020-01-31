const User = require('../model/User');

User.create({
  email: 'ldrogo@toto.fr',
  firstName: 'Lucien',
  lastName: 'DROGO'
 }, (err, user) => {
  if (!err) { /* ok */ }
  
 });

module.exports = class UsersController {

  getAll() {
    return User.find().then(users => users.map(user => user.toObject()));
  }

  getOne(id) {
    return User.findById(id).then(user =>user.toObject());
  }

  getByName(name){
    return User.find({lastName : name}).then(users => users.map(user => user.toObject()));
  }

  create(user) {
    return User.create(user).then(u => u.toObject());
  }

  delete(id) {
    return User.findById(id).then(user => user.remove());
  }

  edit(user){
    return User.findByIdAndUpdate(user.id, {lastName:user.lastName, firstName:user.firstName, email:user.email})
    .then(u => u.toObject());
  }
}
