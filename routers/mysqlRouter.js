var express = require('express');
var router = express.Router();
const { categoryController } = require('../controllers');

router.get('/getcategory', categoryController.getCategory);
router.post('/addcategory', categoryController.addCategory);
router.put('/category/:id', categoryController.editCateogryById);
router.delete('/category/:id', categoryController.deleteCategoryById);

module.exports = router;