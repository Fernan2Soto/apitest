var express = require('express');
var bodyParser = require('body-parser');

var app = express();


const { connect } = require('./db/db');
const connection = require('./db/db');

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
	res.status(200).send({
		message: 'GET Home route working fine!'
	});
});

//Usuarios
//Listar
app.get('/usuarios', function(req, res){

	connection.query(`SELECT * FROM usuario`,(erro,result)=>{
		const usuarios = JSON.parse(JSON.stringify(result))
		console.log(usuarios)
		res.json(result)
		 
	})
	
});

//Buscar Usuario
app.get('/:email/:clave', function(req, res){

	const email = req.params.email;
	const clave = req.params.clave;
	connection.query(`SELECT * FROM usuario WHERE email = "${email}" AND clave = "${clave}"`,(error,result)=>{
		

		res.json(result[0])
		
		
	})
	
});

//Guardar Usuario
app.get('/:email/:nombre/:clave', function(req, res){

	const email = req.params.email;
	const nombre = req.params.nombre;
	const clave = req.params.clave;

	connection.query(`INSERT INTO usuario SET email = "${email}", nombre = "${nombre}", clave = "${clave}"`,(error,result)=>{

		if (error) {
			res.json({
				mensaje: "Email ya se Encuentra Registrado"
			});
		}else{
			res.json({
				mensaje: "Registro de Forma Exitosa"
			});
		}
	})
});

//Categorias
//Listar
app.get('/categorias', function(req, res){

	connection.query(`SELECT * FROM categoria`,(erro,result)=>{
		
		if (result.length != 0) {
			res.json(result)
		}else{
			res.send({
				categorias: "0"
			});
		}
	})
	
});

//Producto
//Listar
app.get('/productos', function(req, res){

	connection.query(`SELECT * FROM producto`,(erro,result)=>{
		
		if (result.length != 0) {
			res.json(result)
		}else{
			res.send({
				categorias: "0"
			});
		}
	})
	
});

//Guardar producto
app.get('/producto/:codigo/:nombre/:descripcion/:precio/:precio_oferta/:stock/:fecha_ingreso/:imagen/:estado', function(req, res){

	const codigo = req.params.codigo;
	const nombre = req.params.nombre;
	const descripcion = req.params.descripcion;
	const precio = req.params.precio;
	const precio_oferta = req.params.precio_oferta;
	const stock = req.params.stock;
	const fecha_ingreso = req.params.fecha_ingreso;
	const imagen = req.params.imagen;
	const estado = req.params.estado;

	connection.query(`INSERT INTO producto SET codigo = "${codigo}", nombre = "${nombre}", descripcion = "${descripcion}", precio = "${precio}", precio_oferta = "${precio_oferta}", stock = "${stock}", fecha_ingreso = "${fecha_ingreso}", imagen = "${imagen}", estado = "${estado}"`,(error,result)=>{

		if (error) {
			res.send({
				mensaje: "Error no se registro producto"
			});
		}else{
			res.send({
				mensaje: 'ok'
			});
		}
	})
});

app.listen(80, function(){
	console.log(`Server running`);
});