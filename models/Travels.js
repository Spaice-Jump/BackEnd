const moongose = require('mongoose');

const travelsSchema = moongose.Schema({
  topic: String,
  remarks: String,
  photo: String, //TODO: Image??
  price: Number,
  forSale: Boolean,
  origin: String,
  destination: String,
  userId: String,
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