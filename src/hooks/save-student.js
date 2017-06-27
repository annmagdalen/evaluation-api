// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    if (hook.data.save === undefined) return Promise.resolve(hook);

    const { student } = hook.params;

    return
    hook.app.service('batches').get(hook.id)
      .then((batch) => {
        const { students } = batch
        const studentId = students.map((p) =>
      (p.studentId.toString()));
      const joined = studentId.includes(student._id.toString());
      })
    return Promise.resolve(hook);
  };
};
