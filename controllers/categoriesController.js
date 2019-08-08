const { databaseMysql } = require('../database').MysqlConnection

module.exports = {
    getCategory: (req, res) => {
        let sql = `select * from category;`;

        databaseMysql.query(sql, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            //console.log(results);
            res.status(200).send(results);
        });
    },
    addCategory: (req, res) => {
        let data = req.body;
        let sql = 'insert into category set ?';

        databaseMysql.query(sql, data, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }

            sql = `select * from category;`;

            databaseMysql.query(sql, (err, results) => {
                if (err) {
                    res.status(500).send(err)
                }
                //console.log(results);
                res.status(200).send(results);
            });
        });
    }, 
    editCateogryById: (req, res) => {
        let sql = `Update category set ? where id = ${req.params.id}`

        databaseMysql.query(sql, req.body, (err, results) => {
            if (err) {
                res.status(500).send(results)
            }
            console.log(results)
            sql = 'select * from category';
            databaseMysql.query(sql, (err, results) => {
                if (err) {
                    res.status(500).send(err)
                }
                //console.log(results);
                res.status(200).send(results);
            });
        })
    },
    deleteCategoryById: (req, res) => {
        let sql = `Delete from category where id = ${req.params.id};`;

        databaseMysql.query(sql, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }

            // console.log(results);

            sql = 'select * from category';
            databaseMysql.query(sql, (err, results) => {
                if (err) {
                    res.status(500).send(err)
                }
                // console.log(results);
                res.status(200).send(results);
            });
        })
    }
}