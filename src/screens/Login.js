import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Image, KeyboardAvoidingView, TouchableHighlight } from  'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { setEmailField, setPasswordField, doLogin } from '../actions/AuthActions';

export class Login extends Component {

	static navigationOptions = {
		header:null
	}

	constructor(props){
		super(props);
		this.state = {};

		this.loginAction 	= this.loginAction.bind(this);
		this.verifyStatus 	= this.verifyStatus.bind(this);
		this.goToSignUp 	= this.goToSignUp.bind(this);
		this.goToForgot 	= this.goToForgot.bind(this);
	} 

	componentDidUpdate(){
		this.verifyStatus();
	}

	verifyStatus(){
		if(this.props.status===1)
			this.props.navigation.dispatch(StackActions.reset({
				index:0,
				actions:[
					NavigationActions.navigate({'routeName': 'HomeNav'})
				]
			}));
	}

	loginAction(){
		if(this.props.emailValid == true && this.props.passValid == true){
			this.props.doLogin(this.props.email, this.props.pass);
		}else{
			alert('Necessário preencher um email valido e uma senha com no minimo 4 digitos!');
		}
	}

	goToSignUp(){
		this.props.navigation.navigate('SingUp');
	}

	goToForgot(){
		this.props.navigation.navigate('Forgot');
	}

	render(){ 
		let buttomOpacity = 0.2;

		if(this.props.emailValid == true && this.props.passValid == true){
			buttomOpacity = 1;
		}

		return (
			<ImageBackground source={require('../assets/bg.jpg')} style={styles.container}>
				<KeyboardAvoidingView style={styles.keyboardContainer} behavior="padding" enabled>
					<Text style={styles.header}>Login</Text>

					<View style={styles.fildArea}>
						<Text style={styles.fildTitle}>E-MAIL</Text>
						<View style={styles.fildItemArea}>
							<TextInput style={styles.fildItem} value={this.props.email} onChangeText={(text) => this.props.setEmailField(text)} />
							<View style={styles.fildItemStatus}>
								{this.props.emailValid &&
								<Image source={require('../assets/check.png')} style={styles.fildItemStatusImg} />
								}
							</View>
						</View>
					</View>

					<View style={styles.fildArea}>
						<Text style={styles.fildTitle}>SENHA</Text>
						<View style={styles.fildItemArea}>
							<TextInput style={styles.fildItem} secureTextEntry={true} value={this.props.pass} onChangeText={(text) => this.props.setPasswordField(text)} />
							<View style={styles.fildItemStatus}>
								{this.props.passValid &&
								<Image source={require('../assets/check.png')} style={styles.fildItemStatusImg} />
								}
							</View>
						</View>
					</View>

					<View style={styles.bArea}>
						<TouchableHighlight underlayColor={null} style={styles.bText} onPress={this.goToForgot}>
							<Text style={styles.bTextInt}>Esqueceu a Senha ?</Text>
						</TouchableHighlight>

						<TouchableHighlight underlayColor={null} style={styles.bText} onPress={this.goToSignUp}>
							<Text style={styles.bTextInt}>Cadastre-se</Text>
						</TouchableHighlight>

					</View>

					<TouchableHighlight style={[styles.buttom, {opacity:buttomOpacity}]} onPress={this.loginAction}>
						<Image source={require('../assets/send.png')} style={styles.fildItemStatusImg} />
					</TouchableHighlight>

				</KeyboardAvoidingView>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		padding:20
	},
	keyboardContainer:{
		flex:1
	},	
	header:{
		color:'#FFFFFF',
		fontSize:30,
		marginBottom:20
	},
	fildTitle:{
		color:'#FFFFFF',
		fontSize:16
	},
	fildItem:{
		flex:1,
		color:'#FFFFFF',
		fontSize:17
	},
	fildArea:{
		marginBottom:20,
		borderBottomWidth:1,
		borderBottomColor:'#FFFFFF'
	},
	fildItemArea:{
		flexDirection:'row',
		height:50
	},
	fildItemStatus:{
		width:50,
		height:50,
		justifyContent:'center',
		alignItems:'center'
	},
	fildItemStatusImg:{
		width:30,
		height:30
	},
	buttom:{
		position:'absolute',
		bottom:0,
		right:3,
		width:70,
		height:70,
		borderRadius:35,
		backgroundColor:'#FF5733',
		justifyContent:'center',
		alignItems:'center'
	},
	bArea:{
		flexDirection:'row'
	},
	bText:{
		flex:1,
		height:36,
		justifyContent:'center',
		alignItems:'center'
	},
	bTextInt:{
		color:'#ffffff',
		fontSize:15
	}
});

const mapStateToProps = (state) => {
	return {
		status:state.auth.status,
		email:state.auth.email,
		pass:state.auth.pass,
		emailValid:state.auth.emailValid,
		passValid:state.auth.passValid
	};
};

const LoginConnect = connect(mapStateToProps, { setEmailField, setPasswordField, doLogin })(Login);

export default LoginConnect;