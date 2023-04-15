import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const ISS_API_URL = 'http://api.open-notify.org/iss-now.json';

export default function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [visibility, setVisibility] = useState('');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(ISS_API_URL)
        .then(response => response.json())
        .then(data => {
          setLatitude(data.iss_position.latitude);
          setLongitude(data.iss_position.longitude);
          setVisibility(data.visibility);
          setTimestamp(data.timestamp);
        })
        .catch(error => console.log(error));
    }, 5000);


    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>International Space Station</Text>
      <Image
        source={require('./iss.png')}
        style={styles.issImage}
      />
      <Text style={styles.text}>Latitude: {latitude}</Text>
      <Text style={styles.text}>Longitude: {longitude}</Text>
      <Text style={styles.text}>Visibility: {visibility}</Text>
      <Text style={styles.text}>
        Timestamp: {new Date(timestamp * 1000).toString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b262c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#bbe1fa',
    marginBottom: 20,
  },
  issImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: '#bbe1fa',
    marginBottom: 10,
  },
});
