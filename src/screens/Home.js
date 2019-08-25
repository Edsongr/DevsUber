import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Platform, PermissionsAndroid, TouchableHighlight, Image } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';

import SearchBox from '../components/Home/SearchBox';
import TripArea from '../components/Home/TripArea';

const GOOGLE_MAPS_APIKEY = "AIzaSyCubnA5OxxSCtp11riOaJBmpkX0QrCWkdI";
console.disableYellowBox = true;

export class Home extends Component {
	watchId = null;

	static navigationOptions = {
		title:'DevsUber',
		headerStyle:{
			backgroundColor:'#FF5733'
		},
		headerTintColor:'#ffffff',
		headerTitleStyle:{
			fontWeight:'bold',
			textAlign:'center',
			flex:1
		}
	};

	constructor(props){
		super(props);
		this.state = {
			mapLocation:{
				latitude:-23.7,
				longitude:-46.8,
				latitudeDelta:0.004,
				longitudeDelta:0.004
			},
			currentLocation:{
				latitude:-23.7,
				longitude:-46.8
			},
			destLocation:{
				latitude:0,
				longitude:0,
			},
			isLoading:false,
			loadingMsg:'',
			warnHeight:new Animated.Value(0),
			recenterMapActive:false
		};

		this.setWarningFunc 		= this.setWarningFunc.bind(this);
		this.getCurrentLocation 	= this.getCurrentLocation.bind(this);
		this.requestLocPermission 	= this.requestLocPermission.bind(this);
		this.searchBoxClick 		= this.searchBoxClick.bind(this);
		this.realignMap 			= this.realignMap.bind(this);
		this.mapRegionChange 	    = this.mapRegionChange.bind(this);
		this.tripCancelClick 		= this.tripCancelClick.bind(this);
		this.tripSelectClick 		= this.tripSelectClick.bind(this);
	}

	componentDidMount(){  

		this.getCurrentLocation();

		// Geolocation.clearWatch(this.watchId);
	}

	realignMap(){
		this.map.fitToSuppliedMarkers(['OriginMarker', 'DestinationMarker'], {
			edgePadding:{
				left:100,
				top:200,
				right:100,
				bottom:100
			},
			animated:true
		});
	}

	getCurrentLocation = async () => {
		this.setWarningFunc(true, "Procurando sua Localização");	

		if(await this.requestLocPermission()){

			this.watchId = Geolocation.watchPosition(
				(position) => {
					this.setWarningFunc(false, '');
					this.setState({
						currentLocation:{
							latitude:position.coords.latitude,
							longitude:position.coords.longitude
						}
					});
					//altitude, accuracy, speed
					setTimeout(()=> {
						this.realignMap();
					}, 1000);
				},
				(error) => {
					this.setWarningFunc(false, '');
					alert('Erro: '+error.message);
				},
				{ enableHighAccuracy:true, interval:5000, timeout:15000, maximumAge:10000 }
			);

		} else {
			this.setWarningFunc(false, '');
			alert ('Permissão negada');
		}

	}

	requestLocPermission = async () => {
 		
		if(Platform.OS == 'android') {
			try {
				const g = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
					{
						title:'Localização',
						message:'Esse app precisa acessar sua localização'
					}
				);

				if(g == PermissionsAndroid.RESULTS.GRANTED){
					return true;
				} else {
					return false;
				}

			} catch (e){
				return false;
			}
		} else {
			return true;
		}

	}

	setWarningFunc(status, msg){

		if(status === true && msg != ''){
			this.setState({
				isLoading:status,
				loadingMsg:msg
			});

			Animated.timing(
				this.state.warnHeight,
				{
					toValue:30,
					durantion:500
				}
			).start();

		} else {

			this.setState({
				isLoading:status,
				loadingMsg:''
			});

			Animated.timing(
				this.state.warnHeight,
				{
					toValue:0,
					durantion:500
				}
			).start();

		}

	}

	searchBoxClick(item){

		this.setState({
			destLocation:{
				latitude:item.lat,
				longitude:item.lng
			}
		});

		setTimeout(()=> {
			this.realignMap();
		}, 1000);

	}

	mapRegionChange(region){
		this.setState({
			mapLocation:region
		});
	}

	tripCancelClick(){

	}

	tripSelectClick(){
		
	}

	render(){
		return (
				<View style={styles.container}>
					<MapView 
						ref={obj => this.map = obj}
						style={styles.maps}
						region={this.state.mapLocation}
						onRegionChangeComplete={this.mapRegionChange}
					>

						<MapView.Marker pinColor="green" identifier="OriginMarker" coordinate={this.state.currentLocation} />

						{this.state.destLocation.latitude != 0 && 
							<MapView.Marker identifier="DestinationMarker" coordinate={this.state.destLocation} />
						}

						{this.state.destLocation.latitude != 0 && 
							<MapViewDirections 
								origin={this.state.currentLocation}
								destination={this.state.destLocation}
    							apikey={GOOGLE_MAPS_APIKEY}
    							strokeWidth={5}
    							strokeColor="#000000"
							/>
						}

					</MapView>

					<Animated.View style={[styles.warnBox, {height:this.state.warnHeight}]}>
						<Text style={styles.warnText}>{this.state.loadingMsg}</Text>
					</Animated.View>

					<SearchBox inputBlocked={this.state.destLocation.latitude != 0} dataClick={this.searchBoxClick} />

					{this.state.destLocation.latitude != 0 && 
						<TripArea  
							origin={this.state.currentLocation}
							destination={this.state.destLocation}
							cancelClick={this.tripCancelClick}
							selectClick={this.tripSelectClick}
						/>
					}

					{this.state.recenterMapActive && 
						<TouchableHighlight style={styles.recenterMap} onPress={this.realignMap} underlayColor="null">
							<Image style={styles.recenterMapImage} source={require('../assets/map-center.png')} />
						</TouchableHighlight>
					}

					<TouchableHighlight style={styles.recenterMap} onPress={this.realignMap} underlayColor="null">
						<Image style={styles.recenterMapImage} source={require('../assets/map-center.png')} />
					</TouchableHighlight>
	
				</View>
			);
	}

}

const styles = StyleSheet.create({
	container:{
		flex:1
	},
	maps:{
		flex:1
	},
	warnBox:{
		position:'absolute',
		left:0,
		top:0,
		width:'100%',
		backgroundColor:'#000000',
		justifyContent:'center',
		alignItems:'center'
	},
	warnText:{
		fontSize:13,
		color:'#ffffff'
	},
	recenterMap:{
		position:'absolute',
		right:20,
		bottom:20,
		width:60,
		height:60
	},
	recenterMapImage:{
		width:60,
		height:60
	}
});

const mapStateToProps = (state) => {
	return {
		status:state.auth.status
	};	
}

const HomeConnect = connect(mapStateToProps, {})(Home);

export default HomeConnect;