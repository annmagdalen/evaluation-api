const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication-client');

const user = {
  name: 'Admin',
  email: 'admin@admin.com',
  password: 'qwerty1'
};

const batches = [
  {
    number: 1,
    startDate: 15-01-2017,
    endDate: 14-03-2017
  },
  {
    number: 2,
    startDate: 15-03-2017,
    endDate: 14-05-2017
  },
  {
    number: 3,
    startDate: 15-05-2017,
    endDate: 14-07-2017
  }
]

const feathersClient = feathers();

feathersClient
  .configure(hooks())
  .configure(rest('http://localhost:3030').superagent(superagent))
  .configure(auth());

feathersClient.service('users').create(user)
.then(() => {
  feathersClient.authenticate({
    strategy: 'local',
    email: user.email,
    password: user.password
  })
  .then(() => {
    batches.map((batch) => {
      feathersClient.service('batches').create(batch)
        .then((result) => {
        }).catch((error) => {
          console.error('Error seeding recipe!', error.message);
        });
    })
  })
  .catch(function(error){
    console.error('Error authenticating!', error);
  });
})
.catch(function(error) {
  console.error('Error creating user!');
})
