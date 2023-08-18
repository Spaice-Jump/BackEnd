const moongose = require('mongoose');

const travelsSchema = moongose.Schema({
  topic: String,
  remarks: String,
  photo: String, //TODO: Image??
  price: {type: Number, required: true},
  forSale: Boolean,
  origin: {type: String, required: true},
  destination: {type: String, required: true},
  userID: String,
});

travelsSchema.statics.list = function(filter, limit, skip, sort, select) {
  const query = Travels.find(filter);
  query.limit(limit);
  query.skip(skip);
  query.sort(sort);
  query.select(select);
  return query.exec();
};

const Travels = moongose.model('Travels', travelsSchema);

module.exports = Travels;