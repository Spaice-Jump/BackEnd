const mongoose = require('mongoose');

const chatsSchema = mongoose.Schema({
    userId: {type: String, required: true}, // usuario que envia el mensaje
    travelId: {type: String, required: true},
    datetime: {type: Date, required: true},
    chatText: {type: String, required: true},
    readByuser: {type: Boolean, required: true}, // cuando lo leee el otro usuario: true
});

chatsSchema.statics.list = function(filter, limit, skip, sort, select) {
    const query = Chats.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.sort(sort);
    query.select(select);
    return query.exec();
};

const Chats = mongoose.model('Chats', chatsSchema);

module.exports = Chats;



