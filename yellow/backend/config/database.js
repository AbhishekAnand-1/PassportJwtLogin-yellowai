const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://crudAppUser:<Password>@crudappcluster.ybywk.mongodb.net/yellowAI?authSource=admin&replicaSet=atlas-ae8ol4-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true');

const userSchema = mongoose.Schema({
    username: String,
    password: String
})

const UserModel = mongoose.model('Users',userSchema)
module.exports = UserModel;