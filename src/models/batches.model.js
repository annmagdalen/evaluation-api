// batches-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');

  const daySchema = new mongooseClient.Schema({
    date: { type: Date, default: Date.now },
    red: { type: Boolean },
    yellow: { type: Boolean },
    green: { type: Boolean },
    remarks: { type: String }
  });

  const studentSchema = new mongooseClient.Schema({
    name: { type: String, required: true },
    picture: { type: String, required: true },
    day: [daySchema]
  });

  const batches = new mongooseClient.Schema({
    students: [studentSchema],
    number: { type: Number, required: true },
    startDate: { type: Date, required: true},
    endDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('batches', batches);
};
