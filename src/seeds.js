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
    startDate: 2017-01-15,
    endDate: 2017-02-14,
    students: [
      {
        name: "Ann",
        picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        day: [
          {
            date: 2017-01-15,
            red: false,
            yellow: false,
            green: true,
            remarks: "Good"
          },
          {
            date: 2017-01-16,
            red: false,
            yellow: false,
            green: true,
            remarks: "Still good"
          }
        ]
      },
      {
        name: "Magdalen",
        picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        day: [
          {
            date: 2017-01-15,
            red: false,
            yellow: true,
            green: false,
            remarks: "Good be better"
          },
          {
            date: 2017-01-16,
            red: false,
            yellow: true,
            green: false,
            remarks: "Improved, but needs to catch up"
          }
        ]
      }
    ]
  },
  {
    number: 2,
    startDate: 2017-02-15,
    endDate: 2017-03-14,
    students: [
      {
        name: "Hanna",
        picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        day: [
          {
            date: 2017-02-15,
            red: false,
            yellow: false,
            green: true,
            remarks: "Good"
          },
          {
            date: 2017-02-16,
            red: true,
            yellow: false,
            green: false,
            remarks: "Had a bad day"
          }
        ]
      },
      {
        name: "Sophia",
        picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        day: [
          {
            date: 2017-02-15,
            red: false,
            yellow: false,
            green: true,
            remarks: "Excellent student"
          },
          {
            date: 2017-02-16,
            red: false,
            yellow: false,
            green: true,
            remarks: "Top student"
          }
        ]
      }
    ]
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
