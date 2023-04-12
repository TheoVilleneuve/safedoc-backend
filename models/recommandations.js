const mongoose = require('mongoose');

const recommandationSchema = mongoose.Schema({
    ids: [String],
})

const Recommandation = mongoose.model('recommandations', recommandationSchema);

module.exports = Recommandation;