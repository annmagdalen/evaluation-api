// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    if (hook.data.join === undefined) return Promise.resolve(hook);

    const { student } = hook.params;
    console.log(hook.params)

    return
    hook.app.service('batches').get(hook.id)
      .then((batch) => {
        const { students } = batch
        const wantsToJoin = hook.data.join
        const joined = students.map((p) => (p.studentId)).includes(student._id)

        hook.data = {}

        if (!joined && wantsToJoin) {
          hook.data = {
            students: students.concat({
              studentId: student._id, name: student.name, picture: student.picture, day: []
            })  
          }
        }
        return Promise.resolve(hook);
      })
  };
};
