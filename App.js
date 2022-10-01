import { StatusBar } from 'expo-status-bar';
import React, {useEffect,useState,useCallback, useMemo, useRef} from 'react'
import { 
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions } from 'react-native';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  import BottomSheet from 'react-native-simple-bottom-sheet';
  import MapView,{Marker} from 'react-native-maps';

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

export default function App({navigation}) {
    const [data, setData] = useState([]);
    var url = 'https://api-example-udb.herokuapp.com/api/list';

    const [item, setItem] = useState([]);//datos temporales del botton_sheet

    const panelRef = useRef(null);

    try{
      fetch(url).then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
    }catch(e){ console.log(e); }
    

  return (
    <View >
      <SafeAreaView>
          <View style={styles.header}>
            <Text style={styles.header_text}>Estadios de la Liga</Text>
          </View>
          <ScrollView style={styles.scroll_container}>
              <View>
              {
                data.map((stadium, i) => (
                  <View style={styles.item} key={i}>
                    <TouchableOpacity onPress={()=>{ setItem(stadium),panelRef.current.togglePanel()}}>
                      <Image style={styles.img} source={{uri: stadium.image,}}/>                 
                      <Text style={styles.text}> <Icon name="stadium" size={18} color="white" /> {stadium.name}</Text>
                    </TouchableOpacity>
                  </View>
                ))
              }
              </View>    
          </ScrollView>

          <BottomSheet ref={ref => panelRef.current = ref} isOpen={false} sliderMaxHeight={windowHeight*0.80}>
          <ScrollView>
            <View style={styles.bottom_view}>
              <View style={styles.bottom_view_details}>
                <Text style={styles.bottom_text}>ID: {item.id}</Text>
                <Text style={styles.bottom_text}>Nombre: {item.name}</Text>
                <Text style={styles.bottom_text}>Equipo: {item.team}</Text>
                <Text style={styles.bottom_text}>Pais: {item.country}</Text>
              </View>  
              <Image style={styles.bottom_img} source={{uri: item.image}}/>
              <MapView 
              style={styles.bottom_map}
              initialRegion={{
                latitude:41.381089183392824,
                longitude: 2.122830526519553,
                latitudeDelta:0.01,
                longitudeDelta:0.01,
              }}
              >
                <Marker
                  coordinate={{ latitude : 41.381089183392824 , longitude : 2.122830526519553 }}
                  title={'Spotify Camp Noou'}
                  description={'Estadio del barcita'}
                />
              </MapView>
            </View>
          </ScrollView>
          </BottomSheet>
      </SafeAreaView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    margin:'auto',
  },
  header_text: {
    textDecorationLine:'underline',
    fontSize: 34,
  },
  item: {
    backgroundColor:'#C0C0C0',
    height: windowHeight/4,
    width: windowWidth*0.95,
    borderRadius: 15,
    margin: 10,
    padding: 30,
  },
  img : {
    width: windowWidth*0.80,
    height: (windowHeight/4)*0.65,
    borderRadius: 5,
  },
  text: { 
    marginTop: 10, 
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  bottom_view: {
    height: windowHeight,
  },
  bottom_view_details: {
    margin:10,
  },
  bottom_text: {
    marginBottom: 10, 
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottom_img: {
    width: windowWidth*0.9,
    height: (windowHeight/3)*0.9,
    borderRadius: 10,
    marginBottom: 20,
  }, 
  bottom_map: {
    width:  windowWidth*0.9,
    height: windowHeight/2,
    borderRadius: 10,
    marginBottom: 20,
  },
});