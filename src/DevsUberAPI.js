export const verifyLogin = function() {

	return new Promise(function(resolve, reject){

		setTimeout(function(){
			let status = 2;

			resolve(status);

		}, 1000);

	});

};

export const makeLogin = function(email, pass) {

	return new Promise(function(resolve, reject){

		setTimeout(function(){
			let status = 1 ;

			resolve(status);

		}, 2000);

	});

};

export const makeSingUp = function(name, email, pass) {

	return new Promise(function(resolve, reject){

		setTimeout(function(){
			let status = 1 ;

			resolve(status);

		}, 2000);

	});

};

export const makeForgot = function(email) {

	return new Promise(function(resolve, reject){

		setTimeout(function(){
			let status = 1;

			resolve(status);

		}, 2000);

	});

};

export const makeLocationSearch = function(locTxt) {

	return new Promise(function(resolve, reject){

		setTimeout(function(){
			let array = [
				{id:1, label:'Av Dom Pedro II, 288', lat:-23.6526862, lng:-46.535579},
				{id:2, label:'Av Papa João XXIII, 155', lat:-23.6839865, lng:-46.4717754},
				{id:3, label:'Rua Remo Brancalion, 155', lat:-23.6879818, lng:-46.4645668},
				{id:4, label:'Rua Rio Branco, 506', lat:-23.6703473, lng:-46.4603088}
			];

			resolve(array);

		}, 500);

	});
};

export const makeTripSearch = function(origin, destination) {

	return new Promise(function(resolve, reject){

		setTimeout(function(){
			let array = [
				{id:1, type:'Barato', price:12, nome:'Palmeiras da Silva'},
				{id:2, type:'Medio', price:15, nome:'São Paulo dos Santos'},
				{id:3, type:'Caro', price:25, nome:'Santos Siqueira'},
				{id:4, type:'Politico', price:50, nome:'Corinthias zona leste'}
			];

			resolve(array);

		}, 2000);

	});
};