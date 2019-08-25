import { verifyLogin, makeLogin, makeSingUp, makeForgot } from '../DevsUberAPI';


export const checkLogin = () => {

	return (dispatch) => {
		verifyLogin().then(function(status){
			dispatch({
				type:'changeStatus',
				payload:{
					status:status
				}
			});
		}).catch(function(){
			dispatch({
				type:'changeStatus',
				payload:{
					status:2
				}
			});
		});
	};
};

export const setNameField = (name) => {
	return {
		type:'setNameField',
		payload:{
			name:name
		}
	};	
};

export const setEmailField = (email) => {
	return {
		type:'setEmailField',
		payload:{
			email:email
		}
	};	
};

export const setPasswordField = (pass) => {
	return {
		type:'setPasswordField',
		payload:{
		 	pass
		}
	};	
};

export const doLogin = (email, pass) => {

	return (dispatch) => {
		makeLogin(email, pass).then(function(status){

			if(status==2){
				alert('Email e/ou senha invalidos!');
			}

			dispatch({
				type:'changeStatus',
				payload:{
					status:status
				}
			});

		}).catch(function(){
			alert('Ocorreu um erro. Tente novamente mais tarde!');
		});
	};

};

export const doSingUp = (name, email, pass) => {

	return (dispatch) => {
		makeSingUp(name, email, pass).then(function(status){

			if(status==2){
				alert('Ocorreu um erro. Email já cadastrado!');
			}

			dispatch({
				type:'changeStatus',
				payload:{
					status:status
				}
			});

		}).catch(function(){
			alert('Ocorreu um erro. Tente novamente mais tarde!');
		});
	};

};

export const doForgot = (email) => {

	return (dispatch) => {
		makeForgot(email).then(function(status){

			if(status==2){
				alert('Ocorreu um erro. Email inexistente!');
			} else {
				alert('Foi enviado um email com instruções para redefinir senha!');
			}

		}).catch(function(){
			alert('Ocorreu um erro. Tente novamente mais tarde!');
		});
	};

};

