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
    height: 600,
    backgroundColor: "tomato"
  },
  map: {
    flex: 1
  }
});

const cameraDefaults = {
  centerCoordinate: [-71.05,42.36],
  zoomLevel: 12
}

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
    MapboxGL.locationManager.start();
  }

  componentWillUnmount() {
    MapboxGL.locationManager.stop();
  }

  render() {
    let poiSource = getPoiSource();
    console.log(poiSource);
    let poiLayer = getPoiLayer('poi11');
    console.log(poiLayer);
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map}
            styleURL={"mapbox://styles/mapbox/dark-v10"}
            rotateEnabled={false}
          >
            <MapboxGL.Camera defaultSettings={cameraDefaults} />
            <MapboxGL.VectorSource id="poi" {...poiSource} />
            <MapboxGL.FillLayer {...poiLayer} />
          </MapboxGL.MapView>
        </View>
      </View>
    );
  }
}
