// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    if (hook.data.joinDay === undefined) return Promise.resolve(hook);
    console.log(hook.data)

    return hook.app.service('batches').get(hook.data.batch)
      .then((batch) => {
        const { students } = batch
        let j = students.indexOf(hook.data.student)
        const { day } = students[j]

        hook.data = {
          day: day.concat(hook.day)
        }

        return Promise.resolve(hook);
      })
  };
};
