var mongoose = require('mongoose');

const util = require('util');

var config = require('./config')

//if (testMode) return 

// uri = `mongodb+srv://${process.env.MDB_U}:${process.env.MDB_P}@cluster0-sktlh.mongodb.net/`

uri = `mongodb://localhost:27017/Bot`

mongoose.connect(uri,{

    serverSelectionTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser:true,

}).catch(err => console.log(err.reason));
mongoose.connection.on('connected', () => console.log('Connected to mongoose')  ) 
mongoose.connection.on('disconnected', () => console.log('Disconnected to mongoose')  ) 
mongoose.connection.on('err', (err) => console.error('Mongoose errored! \n' + err.stack) ) 

exports.GetMongoose  = () => { return mongoose }

exports.UserModel = mongoose.model('User', new mongoose.Schema({

    name : String,
    id:String,
    inventory : Object,
    settings : Object,

}))