import React, { Component } from "react";
import { StyleSheet, View, Alert, Dimensions } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { getPoiSource, getPoiLayer } from './poiDensity';

MapboxGL.setAccessToken("pk.eyJ1IjoiamRlYmVlciIsImEiOiJjazhtZWJzM3QwbXdhM2hwenB3bzJ5ZHFxIn0.DZWoOD8ohjWPQNuBHXNmtA");

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "tomato"
  },
  map: {
    flex: 1
  },
  search: {
    position: 'absolute',
    width: windowWidth-30,
    height: 50,
    top: 60,
    backgroundColor: "white"
  }
});

const cameraDefaults = {
  centerCoordinate: [-71.05,42.36],
  zoomLevel: 11
}

export default class App extends Component {

  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
    MapboxGL.locationManager.start();
  }

  componentWillUnmount() {
    MapboxGL.locationManager.stop();
  }

  render() {
    const HOUR = 9;
    
    let poiSource = getPoiSource();
    console.log(JSON.stringify(poiSource, null, 2));

    let poiLayer = getPoiLayer(HOUR);
    console.log(JSON.stringify(poiLayer, null, 2));

    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map}
            styleURL={"mapbox://styles/mapbox/dark-v10"}
            rotateEnabled={false}
          >
            <MapboxGL.VectorSource id="poi" {...poiSource}>
              <MapboxGL.FillLayer id={"poi"+HOUR} {...poiLayer} />
            </MapboxGL.VectorSource>
            <MapboxGL.Camera defaultSettings={cameraDefaults} />
          </MapboxGL.MapView>
        </View>
        <View style={ styles.search } />
      </View>
    );
  }
}
