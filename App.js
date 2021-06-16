import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

import MapView from 'react-native-maps';


const { height, width } = Dimensions.get('window');  //pega as dimensoes da tela do smartphone.

export default class App extends Component {
  state = {
    
    places: [
      {
        id: 1,
        title: 'Reitoria',
        description: 'rs...',
        latitude: -21.773794,
        longitude: -43.368926,
      },
      {
        id: 2,
        title: 'Instituto de Ciências Exatas',
        description: 'SOFRIMENTO...',
        latitude: -21.775429,
        longitude: -43.371379,
      },
      {
        id: 3,
        title: 'Restaurante Universitário',
        description: 'Local de Bonança',
        latitude: -21.776276,
        longitude: -43.372360,
      },
    ],
  };

  render() {
    const { latitude, longitude } = this.state.places[0]; //latitude e longitude dinâmicos

    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.mapView = map}
          initialRegion={{         //regiao na qual o mapa sera aberto
            latitude,
            longitude,
            latitudeDelta: 0.0142, //ENTENDER ←
            longitudeDelta: 0.0231,
          }}
          style={styles.mapView}
          rotateEnabled={false}          //permissoes ao usuario,*
          scrollEnabled ={false}         //desabilitadas para que 
          zoomEnabled={false}            //sejam feitas em código.
          showsPointsOfInterest={false}
          showBuildings={false}
        >
          { this.state.places.map(place => (
            <MapView.Marker
              key={place.id}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
            />
          )) }
        </MapView>
        <ScrollView    //estrutura contendo pontos de interesse que ativam animação no mapa.
          style={styles.placesContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd={e => {
            const scrolled = e.nativeEvent.contentOffset.x;   //saber quanto o usuário "caminhou" (no caso no eixo x)
            

            const place = (scrolled > 0)
              ? Math.round(scrolled / Dimensions.get('window').width) 
              : 0;

            console.log(place);

            const { latitude, longitude } = this.state.places[place];

              this.mapView.animateToRegion(
                {latitude: latitude, 
                longitude: longitude, 
                latitudeDelta: 0.0042,
                longitudeDelta: 0.0031}, 
                500
              );
          }}
        >
          { this.state.places.map(place => (
            <View key={place.id} style={styles.place}>
              <Text>{place.title}</Text>
              <Text>{place.description}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  placesContainer: {
    width: '100%',
    maxHeight: 200,
  },
  place: {
    width: width - 40,
    maxHeight: 200,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
  }
});
