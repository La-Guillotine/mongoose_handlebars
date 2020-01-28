let lastId = 0;

let users = [{
  id: lastId++,
  firstName: 'Lucien',
  lastName: 'DROGO',
  email: 'ldrogo@toto.fr'
}, {
  id: lastId++,
  firstName: 'Bob',
  lastName: 'RANDOM',
  email: 'bvrandom@toto.fr'
}];

module.exports = class UsersController {

  getAll() {
    return new Promise((resolve, reject) => {
      resolve(users);
    });
  }

  getOne(id) {
    return new Promise((resolve, reject) => {
      const user = users.find((u) => u.id === id);
      if (user) {
        resolve(user);
      } else {
        reject(new Error('User not found'));
      }
    });
  }

  create(user) {
    const newUser = {
      ...user,
      id: lastId++
    }
    return new Promise((resolve, reject) => {
      users.push(newUser);
      resolve(newUser);
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      users = users.filter((u) => !(u.id === id));
      resolve(true);
    });
  }
}
