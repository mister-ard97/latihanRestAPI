var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
var { mongoRouter, mysqlRouter } = require('./routers');
let port = 2000


let products = [
    {
        id: 1,
        nama: 'Laptop Toshiba',
        harga: 4000000,
        description: 'Laptop Toshiba 2019'
    },
    {
        id: 2,
        nama: 'Laptop Asus',
        harga: 4500000,
        description: 'Laptop Asus 2019'
    },
    {
        id: 3,
        nama: 'Laptop Acer',
        harga: 5000000,
        description: 'Laptop Acer 2019'
    }
];

let app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/mongo', mongoRouter);
app.use('/categories', mysqlRouter);

// *****  METHOD REST_API GET *******

app.get('/users', (req,res) => {
    //console.log(req.query.username)
    // sql joinnya
    let sql = `select 
        u.*, 
        if(u.usia % 2 = 0, 'Genap', 'Ganjil')
        as tipeUmur,
        rl.nama as roleName
        from users as u
        left join roles as rl 
        on u.roleId = rl.id`;

    // sql filter username, password, usiaMin, usiaMax dan roleName
    if (!req.query.username) {
        req.query.username = '';
    }
    if (!req.query.password) {
        req.query.password = '';
    }

    sql += ` where username like '%${req.query.username}%' and password like '%${req.query.password}%'`;
    
    if (req.query.usiaMin) {
        sql += ` and usia >= ${ req.query.usiaMin }`
    }
    if (req.query.usiaMax) {
        sql += ` and usia <= ${req.query.usiaMax}`
    }
    if (req.query.email) {
        sql += ` and email like '%${req.query.email}%'`
    }
    if (req.query.role) {
        sql += ` and rl.nama = '${req.query.role}'`
    }
    // tipe umur 

    /* if(req.query.tipeUmur) {
        sql += ` and tipeUmur = '${req.query.tipeUmur}'`
    } */

    // add ; at the end of sql query
    sql += `;`;
    
    database.query(sql, (err, results) => {
        if(err) {
            res.status(500).send(err)
        }
        //console.log(results);
        res.status(200).send(results);
    })
})

app.get('/', (req, res) => {
    res.send('Hello Word');
})

app.get('/about', (req, res) => {
    res.send('<h1>Ini halaman About</h1>');
})

app.get('/products', (req, res) => {
    let filteredProduct = products;
    if (req.query.nama) {
        filteredProduct = filteredProduct.filter(
            (val) => val.nama.toLowerCase().includes(req.query.nama.toLowerCase())
        )
    }
    if (req.query.hargaMin) {
        filteredProduct = filteredProduct.filter(
            (val) => val.harga >= parseInt(req.query.hargaMin)
        )
    }
    if (req.query.hargaMax) {
        filteredProduct = filteredProduct.filter(
            (val) => val.harga <= parseInt(req.query.hargaMax)
        )
    }
    res.send(filteredProduct)
});

app.get('/products/:id', (req, res) => {
    //karena req.params.id tipe datanya adalah string, maka kondisi dalam filter harus sama dengandua (==)
    res.send(products.filter((val) => val.id == req.params.id)[0]);
});

// membuat endpoint. (endpoint adalah istilah untuk satu /). 
app.get('/test', (req, res) => {
    try {
        console.log('Masuk Test');
        res.status(202).send('Request ke test berhasil')
    }
    catch(err) {
        console.log(err.message);
        res.status(400).send('Request ke test berhasil')
    }  
})

// *****  METHOD REST_API POST *******

app.post('/addproduct', (req, res) => {
    products.push(req.body)
    res.status(201).send({ message: 'Add Product Berhasil', newData: products });
})



app.listen(port, () => console.log(`Server Active API : ${port}`))