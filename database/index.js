var { ObjectID, MongoClient } = require('mongodb')
// var MongoClient = MongoDB.MongoClient;
var urlMongoDB = 'mongodb+srv://rezamongodb:rezamongodb1997@cluster0-wm1hp.mongodb.net/test?retryWrites=true&w=majority';

var mysql = require('mysql')
var databaseMysql = mysql.createConnection({
    host: 'db4free.net',
    user: 'rezadb',
    password: 'mister-ard97',
    database: 'ecommercelaptop',
    port: 3306
})

module.exports = {
    MongoDBConnection: {MongoClient, ObjectID, urlMongoDB},
    MysqlConnection: {databaseMysql}
}