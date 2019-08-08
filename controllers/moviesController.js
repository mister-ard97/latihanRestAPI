var { ObjectID, MongoClient, urlMongoDB } = require('../database').MongoDBConnection;

module.exports = {
    getMovies: (req, res) => {
        if (!req.query.title) {
            req.query.title = '';
        }

        if (!req.query.limit || isNaN(parseInt(req.query.limit))) {
            req.query.limit = 20
        }

        // terima req.query.columns di mana is req.query.columns adalah array
        if (!req.query.columns) {
            req.query.columns = {}
        } else {
            let obj = {}
            for (let i = 0; i < req.query.columns.length; i++) {
                obj[req.query.columns[i]] = 1
            }
            //console.log(obj)
            req.query.columns = obj;
        }

        MongoClient.connect(urlMongoDB, (err, client) => {
            if (err) {
                res.status(500).send(err)
            }

            let movieCollection = client.db("sample_mflix").collection('movies');
            movieCollection.find({ title: { '$regex': req.query.title, '$options': 'i' } }, req.query.columns).limit(parseInt(req.query.limit)).toArray((err1, docs) => {
                client.close();
                if (err1) {
                    res.status(500).send(err1)
                }

                //console.log(docs);
                res.status(200).send(docs);
            })

        })
    }, 
    getMoviesById: (req, res) => {
        MongoClient.connect(urlMongoDB, (err, client) => {
            if (err) {
                res.status(500).send(err)
            }

            let movieCollection = client.db("sample_mflix").collection('movies');
            movieCollection.find({ _id: new ObjectID(req.params.id) }).toArray((err1, docs) => {
                client.close();
                if (err1) {
                    res.status(500).send(err1)
                }

                //console.log(docs);
                res.status(200).send(docs);
            })

        })
    },
    addMovies: (req, res) => {
        MongoClient.connect(urlMongoDB, (err, client) => {
            let MoviesCollection = client.db('sample_mflix').collection('movies');
            MoviesCollection.insertMany(req.body.data, (err1, result) => {
                client.close();
                if (err1) {
                    res.status(500).send(err1)
                }

                res.status(200).send(result)
            })
        })
    },
    deleteMovie: (req, res) => {
        if (!req.query.title) {
            req.query.title = ''
        }

        MongoClient.connect(urlMongoDB, (err, client) => {
            if (err) {
                res.status(500).send(err)
            }

            let MoviesCollection = client.db('sample_mflix').collection('movies');
            MoviesCollection.deleteMany({ title: req.query.title }, (err, results) => {
                if (err) {
                    res.status(500).send(err)
                }

                res.status(200).send(results);
            })
        })
    },
    deleteMovieById: (req, res) => {
        MongoClient.connect(urlMongoDB, (err, client) => {
            if (err) {
                res.status(500).send(err)
            }

            let MoviesCollection = client.db('sample_mflix').collection('movies');
            MoviesCollection.deleteOne({ _id: new ObjectID(req.params.id) }, (err, result) => {
                // Client.close() = Ketika kita ingin mengclose koneksi
                client.close();
                if (err) {
                    res.status(500).send(err)
                }
                console.log(result)
                res.status(200).send(result)
            })
        })
    },
    editMovieById: (req, res) => {
        if (!req.body.unset) {
            req.body.unset = {
                "nonexistpropertyunset": ""
            }
        }

        MongoClient.connect(urlMongoDB, (err, clientDB) => {
            if (err) {
                res.status(500).send(err)
            }

            let MovieCollection = clientDB.db('sample_mflix').collection('movies')
            MovieCollection.updateOne({ _id: new ObjectID(req.params.id) }, { $set: req.body.set, $unset: req.body.unset }, (err, result) => {
                if (err) {
                    res.status(500).send(err)
                }

                console.log(`Data dengan _id : ${req.params.id} telah diupdate`);

                res.status(200).send(result)
            })
        })
    }
}