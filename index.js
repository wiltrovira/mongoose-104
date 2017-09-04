var mongoose =  require("mongoose");
var personaSchema = require("./persona.server.model.js");

//conecta la promesa
var Promise = require("bluebird");
Promise.promisifyAll(require("mongoose"));
mongoose.Promise = Promise;

//------------------------------//
//Abrir la conexión - es una promesa
var promiseAbrirConexion = new Promise (function(resolve, reject){
	var conn = mongoose.createConnection("localhost","senquiu",27017, function(err){
		if (err){
			conn.close();
			reject (err);
		}
		resolve (conn);
	});
}).then(function(conn){
	return promiseGuardarPromotor (conn);	
}).then(function(){
	return "Todo se completó con éxito";	
}).catch(function(err){
	console.log("Error en la conexión --> " + err.message);
});

//------------------------------//
//Guardar los datos del persona - es una promesa
var promiseGuardarPromotor = function(conn){
	return new Promise (function(resolve, reject){
		var Persona = conn.model("Personas", personaSchema, "personas");
		var persona = new Persona({
			//asigno los datos de la persona
			primerNombre : "Martha",
			segundoNombre : "Josefa",
			primerApellido : "Peralta",
			segundoApellido : "Benavides",
			estadoCivil : "Soltera",
			generoSexo : "Mujer",
			idiomaPreferido : "Inglés",
			fechaDeNacimiento : "1980/10/14",
			permalink : "marthaperalta",
			correoElectronico : "marthap@example.com",
			avatar : "avatar",
			passwordHash : "Password",
			passwordSalt : "Password",
			timeStamp : "2017/09/02",
			fechaDeCreacion : "2017/09/02",
			fechaDeUltimaModificacion : "2017/09/02",
			prefijo : "Señorita",
			sufijo : "",
		});
		console.log(persona.primerNombre + " " + persona.primerApellido);

		persona.save(function(err){
			if (err){
				reject(err);
			}else{
				console.log("guardado! --> ", persona);
				conn.close();
			}
		});

	});
};
promiseAbrirConexion;
