const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); /*nos sirve para mostrar los precios con separador de miles, lo separa con el punto */

const controller = {
	index: (req, res) => {
		let productsInSale =products.filter(product => product.category === "in-sale" ) /*me traigo los productos que en su propiedad category sean  "in-sale" y los guardo en la variable = productsInSale*/
		let productsVisited = products.filter(product => product.category === "visited" )
	res.render('index', {
	productsInSale,
	productsVisited,
		toThousand /*esta funcion es para aplicar a los precios, puse su nombre y de la vista puedo acceder a lo que hace esta funcion */
	})
	},
	search: (req, res) => {
		let result = []
		products.forEach(product => {
			if(product.name.toLowerCase().includes(req.query.keywords.toLowerCase())){
				result.push(product)
			} /* pasa a minuscula todo para hacer la busqueda. si dentro del nombre de ese producto incluye el nombre de las palabras que me pasaron el boton de busqueda es que esta bien, y lo que hago es guardarlo dentro de la variable result, le aplico el push que es metodo de array y le paso el producto que paso la validacion  */
		});
		/* una ves que yo tengo el array con el resultado de busqueda finalizo con res.render de la vista result */
		res.render('results',{
			result,
			toThousand,
			search: req.query.keywords  
		} /* a esta vista le paso los resultados de busqueda, le paso el result que es array, le paso la variable tothousand, que  muestra la tarjetitas de los productos y lo que busco  */
		)
	},
};

module.exports = controller;
