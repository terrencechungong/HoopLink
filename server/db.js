const { MongoClient } = require('mongodb');

let dbConnection;


module.exports = {
    connectToDb: (cb)  =>{
        MongoClient.connect(process.env.MONGO_DB_URI)
        .then((client) => {
            dbConnection = client.db()
            console.log("DB connection successful");
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
}