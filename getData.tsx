//imports needed libraries
import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, FlatList} from 'react-native';
import axios from 'axios';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const GetData : any= () => {

   //CSS to style the app
  const styles = StyleSheet.create({

        heading: {
          alignItems: 'center',
          fontSize: 50,
          fontWeight: 'bold',
          color: 'blue'
    
         },

        img: {
          width: 250,
          height: 185,
          alignItems: 'center'
        },

        stopName:{
          alignItems:'center',
          fontSize: 25,
          color: 'blue',

        },

        button: {
           alignItems: 'center',
           justifyContent: 'center',
           borderRadius: 0.5,
           borderWidth: 2,
           borderColor: '#000000',
           backgroundColor: 'blue',
        },
         container: {
           flex: 1,
           backgroundColor: '#fff',
           alignItems: 'center',
           justifyContent: 'center',
         },
         buttontext: {
           color: 'white'
         }
       });

    // sets up variables
      const [page, setPage] = useState(1);
      const [busDetails, setBusDetails] = useState<any[]>([]);
      const [EstimateDetails, setEstimateDetails] = useState<any[]>([]);
      const [isLoading, setIsLoading] = useState(true);

      const DATA = [
        {
          details: busDetails[0],
          
        },
        {
          details: busDetails[1],
        },
        {
        details: "hello" }
      ]
    
      //logs API data to the console for bus arrivals
      const loadMoreCommit = () => {
        setPage(page + 1);
        console.log("api line name ======= ", busDetails[0].lineName);
        console.log('api line destination ==',busDetails[0].destinationName);
        console.log("api estimated time ===", busDetails[0].expectedArrival);
        console.log("api line name ======= ", busDetails[1].lineName);
        console.log('api line destination ==', busDetails[1].destinationName);
        console.log("api estimated time ===", busDetails[1].expectedArrival);
        console.log("api line name ======= ", busDetails[2].lineName);
        console.log('api line destination ==', busDetails[2].destinationName);
        console.log("api estimated time ===", busDetails[2].expectedArrival);
        console.log("api line name ======= ", busDetails[3].lineName);
        console.log('api line destination ==', busDetails[3].destinationName);
        console.log("api estimated time ===", busDetails[3].expectedArrival);
        console.log("api line name ======= ", busDetails[4].lineName);
        console.log('api line destination ==', busDetails[4].destinationName);
        console.log("api estimated time ===", busDetails[4].expectedArrival)
        
    };
    
    //uses fetch method to get API data form tfl for choosen bus stop https://tfl.gov.uk/bus/stop/490005183E/
    useEffect(() => {
        fetch('https://api.tfl.gov.uk/StopPoint/490005183E/arrivals', {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((response) => {
            setBusDetails(response);
            setIsLoading(false);
          })
          .catch((error) => console.log(error));
      }, [page]);

      var axios = require('axios');
    
// gets API from Google Maps API to calcuate estimated time
var config = {
  method: 'get',
  url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=Chingford%20station&destinations=Balogonie%20road&departure_time=now&key=AIzaSyD_QFoB4g5_KuiyZpHxPK_4vp1HEDWUDPA',
  headers: { }
};

axios(config)
.then(function (response: { data: any; }) {
  //prints estimated time to console
  console.log("GOOGLE ESTIMATE FOR LINE 179", JSON.stringify(response.data));
})
.catch(function (error: any) {
  console.log(error);
});

var config = {
  method: 'get',
  url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=saolsbury%20hall%20sainsburys&destinations=Balogonie%20road&departure_time=now&key=AIzaSyD_QFoB4g5_KuiyZpHxPK_4vp1HEDWUDPA',
  headers: { }
};

axios(config)
.then(function (response: { data: any; }) {
  //prints estimated time to console
  console.log("GOOGLE ESTIMATE FOR LINE 212", JSON.stringify(response.data));
})
.catch(function (error: any) {
  console.log(error);
});
const renederItem = () => {
  <Text>{DATA}</Text>
}
    // app screen
      return (
        <View>
          
          <Text style={styles.heading}>Find My Bus</Text>
          {isLoading && <Text>Content Loading...</Text>}
    

          <Image
           source={require('./bus.jpeg')}
           style={styles.img}
           ></Image>

           <Text style={styles.stopName}>Stop:   Balgonie Rd</Text>
           
          
            <Pressable onPress={loadMoreCommit}
                style={styles.button}
            >
                <Text style={styles.buttontext}>
                    Find Next bus
                </Text>
            </Pressable>

            
    
          {busDetails.map((c:any, index:any) => (
            <View key={index}>
              {c.commit && (
                
                  <View>
                    <Text style={{ color: '#CC0000' }}>
                      {c.commit.committer.name}
                    </Text>
                    <Text>{c.commit.message}</Text>
                  </View>
                  
                
              )}
            </View>
          ))}
        </View>
      );
    


}
