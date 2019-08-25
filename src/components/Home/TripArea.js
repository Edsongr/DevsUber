import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { makeTripSearch } from '../../DevsUberAPI';

export default class TripArea extends Component {

	constructor(props){
		super(props);
		this.state = {
			tripAreaBottom:new Animated.Value(-200),
			trips:[]
		};

	}

	componentDidMount(){
		Animated.timing(
			this.state.tripAreaBottom,
			{
				toValue:0,
				duration:1500
			}
		).start();

		makeTripSearch(this.props.origin, this.props.destination)
		.then((trips) => {
			this.setState({trips});
		})
		.catch((error)=>{
			alert('Ocorreu um erro na sua Busca.');
			this.props.cancelClick();
		});
	}

	render() {
		return (
			<Animated.View style={[styles.container, {bottom:this.state.tripAreaBottom}]}>
				{this.state.trips.length == 0 && 
					<Text>Buscando...</Text>
				}

				{this.state.trips.length > 0 && 
					<View>
						<Text>Exibir aqui as opções</Text>
					</View>
				}

			</Animated.View>
		);
	}

}

const styles = StyleSheet.create({
	container:{
		backgroundColor:'#ffffff',
		position:'absolute',
		height:200,
		left:20,
		right:20,
		alignItems:'center',
		justifyContent:'center',
		borderTopLeftRadius:10,
		borderTopRightRadius:10,
		borderColor:'#cccccc',
		elevation:4,
		shadowOffset:{width:20, height:20},
		shadowColor:'#000000',
		shadowOpacity:0.5,
		shadowRadius:10
	}

});