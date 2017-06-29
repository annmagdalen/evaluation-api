const { authenticate } = require('feathers-authentication').hooks;
const { restrictToOwner, associateCurrentUser, restrictToAuthenticated } = require('feathers-authentication-hooks');

const restrict = [
  authenticate('jwt'),
  restrictToAuthenticated()
];

const joinBatch = require('../../hooks/join-batch');

const addStudent = require('../../hooks/add-student');

const disjoinBatch = require('../../hooks/disjoin-batch');

module.exports = {
  before: {
    all: [...restrict],
    find: [],
    get: [],
    create: [],
    update: [joinBatch(), addStudent(), disjoinBatch()],
    patch: [joinBatch(), addStudent(), disjoinBatch()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
