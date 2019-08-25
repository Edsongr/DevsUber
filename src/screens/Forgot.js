import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Image, KeyboardAvoidingView, TouchableHighlight, ScrollView } from  'react-native';
import { connect } from 'react-redux';
import { setEmailField, doForgot } from '../actions/AuthActions';

export class Forgot extends Component {

	static navigationOptions = {
		headerStyle:{
			backgroundColor:'#FF5733'
		},
		headerTintColor:'#ffffff'
	};

	constructor(props){
		super(props);
		this.state = {};

		this.ForgotAction = this.ForgotAction.bind(this);
	}

	ForgotAction(){
		if(this.props.emailValid == true){
			this.props.doForgot(this.props.email);
		}else{
			alert('Necessário preencher email!');
		}
	}

	render(){
		let buttomOpacity = 0.2;

		if(this.props.emailValid == true){
			buttomOpacity = 1;
		}

		return (
			<ImageBackground source={require('../assets/bg.jpg')} style={styles.container}>

				<ScrollView style={styles.scrollviewStyle}>

					<KeyboardAvoidingView style={styles.keyboardContainer} behavior="padding" enabled>
						<Text style={styles.header}>Esqueceu a Senha</Text>

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

					</KeyboardAvoidingView>

				</ScrollView>

				<TouchableHighlight style={[styles.buttom, {opacity:buttomOpacity}]} onPress={this.ForgotAction}>
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
		emailValid:state.auth.emailValid
	};
};

const ForgotConnect = connect(mapStateToProps, { setEmailField, doForgot })(Forgot);

export default ForgotConnect;