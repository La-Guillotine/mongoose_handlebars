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

  create(user) {
    return User.create(user).then(u => u.toObject());
  }

  delete(id) {
    return User.findById(id).then(user => user.remove());
  }
}
