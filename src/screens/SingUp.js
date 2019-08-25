import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Image, KeyboardAvoidingView, TouchableHighlight, ScrollView } from  'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { setNameField, setEmailField, setPasswordField, doSingUp } from '../actions/AuthActions';

export class SingUp extends Component {

	static navigationOptions = {
		headerStyle:{
			backgroundColor:'#FF5733'
		},
		headerTintColor:'#ffffff'
	};

	constructor(props){
		super(props);
		this.state = {};

		this.singUpAction = this.singUpAction.bind(this);
		this.verifyStatus = this.verifyStatus.bind(this);
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

	singUpAction(){
		if(this.props.emailValid == true && this.props.passValid == true && this.props.nameValid == true){
			this.props.doSingUp(this.props.name, this.props.email, this.props.pass);
		}else{
			alert('Necessário preencher todos Campos!');
		}
	}

	render(){
		let buttomOpacity = 0.2;

		if(this.props.emailValid == true && this.props.passValid == true && this.props.nameValid == true){
			buttomOpacity = 1;
		}

		return (
			<ImageBackground source={require('../assets/bg.jpg')} style={styles.container}>

				<ScrollView style={styles.scrollviewStyle}>

					<KeyboardAvoidingView style={styles.keyboardContainer} behavior="padding" enabled>
						<Text style={styles.header}>Cadastro</Text>

						<View style={styles.fildArea}>
							<Text style={styles.fildTitle}>NOME</Text>
							<View style={styles.fildItemArea}>
								<TextInput style={styles.fildItem} value={this.props.name} onChangeText={(text) => this.props.setNameField(text)} />
								<View style={styles.fildItemStatus}>
									{this.props.nameValid &&
									<Image source={require('../assets/check.png')} style={styles.fildItemStatusImg} />
									}
								</View>
							</View>
						</View>

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

					</KeyboardAvoidingView>

				</ScrollView>

				<TouchableHighlight style={[styles.buttom, {opacity:buttomOpacity}]} onPress={this.singUpAction}>
					<Image source={require('../assets/send.png')} style={styles.fildItemStatusImg} />
				</TouchableHighlight>

			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		padding:20
	},
	scrollviewStyle:{
		flex:1
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
		bottom:20,
		right:20,
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
		name:state.auth.name,
		pass:state.auth.pass,
		emailValid:state.auth.emailValid,
		passValid:state.auth.passValid,
		nameValid:state.auth.nameValid
	};
};

const SingUpConnect = connect(mapStateToProps, { setNameField, setEmailField, setPasswordField, doSingUp })(SingUp);

export default SingUpConnect;