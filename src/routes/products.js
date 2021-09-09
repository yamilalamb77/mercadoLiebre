// ************ Require's ************
const express = require('express');
const multer = require('../middlewares/uploadProductsFiles');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create);  /*aca renderiza un formulario por eso get */
router.post('/', multer.single('image'),productsController.store); /*esta 2da recibe los datos del formulario, los guarda y hace la logica del guardado del producto por eso es post*/


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); /*renderiza un formulario por eso get */ 
router.put('/edit/:id',  multer.single('image'),productsController.update); /* por defecto el formulario viene con post pero en el edicion, como modificamos un dato es put*/


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
