const moongose = require('mongoose');

const travelsSchema = moongose.Schema({
  topic: String,
  origin: {type: String, required: true},
  destination: {type: String, required: true},
  remarks: String,
  price: {type: Number, required: true},
  forSale: Boolean,
  active: Boolean,
  photo: String,
  userId: String,
  userName: String,
  active: Boolean,
  userBuyer: String,
  datetimeCreation: Date,
  favorite: Boolean,
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