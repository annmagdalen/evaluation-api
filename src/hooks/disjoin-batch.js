// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    if (hook.data.disjoin === undefined) return Promise.resolve(hook);

    console.log(hook.data)

    return hook.app.service('batches').get(hook.id)
      .then((batch) => {
        const { students } = batch
        let i = students.indexOf(hook.data._id);
        students.splice(i,1);

        hook.data = {
          students: students
        }

        return Promise.resolve(hook);
      })
  };
};
