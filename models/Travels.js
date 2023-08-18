const moongose = require('mongoose');

const travelsSchema = moongose.Schema({
  origin: {type: String, required: true},
  destination: {type: String, required: true},
  price: {type: Number, required: true},
  topic: String,
  remarks: String,
  photo: String,
  forSale: Boolean,
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