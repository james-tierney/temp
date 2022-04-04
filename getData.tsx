import { StatusBar } from 'expo-status-bar';
import { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export const GetData : any= () => {

    const styles = StyleSheet.create({

        button: {
           alignItems: 'center',
           justifyContent: 'center',
           borderRadius: 0.5,
           borderWidth: 2,
           borderColor: '#000000',
           backgroundColor: '#CC0000',
        },
         container: {
           flex: 1,
           backgroundColor: '#fff',
           alignItems: 'center',
           justifyContent: 'center',
         },
       });

    //function GithubCommit() {
      const [page, setPage] = useState(1);
      const [commitHistory, setCommitHistory] = useState<any[]>([]);
      const [isLoading, setIsLoading] = useState(true);
    
      const loadMoreCommit = () => {
        setPage(page + 1);
        console.log("api data = ", commitHistory);
        console.log("api line name = ", commitHistory[0]);
        console.log("api line name ======= ", commitHistory[0].lineName);
        // try it for yourself try console logging the commitHistory being our JSON data
        // try console logging the 3 parts you wanted like commitHistory[0].lineName there first one is done for you try the other 2
    };
    
      useEffect(() => {
        fetch('https://api.tfl.gov.uk/StopPoint/490005183E/arrivals', {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((response) => {
            setCommitHistory(response);
            setIsLoading(false);
          })
          .catch((error) => console.log(error));
      }, [page]);
    
      return (
        <View>
          <Text> API calls</Text>
          {isLoading && <Text>Wait I'm Loading comments for you</Text>}
    
          
            <Pressable onPress={loadMoreCommit}
                style={styles.button}
            >
                <Text>
                    Load API Data!
                </Text>
            </Pressable>
          
    
          {commitHistory.map((c:any, index:any) => (
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
    //}
        
   // GithubCommit;
  //  const rootElement = document.getElementById('root');
//    ReactDOM.render(<GithubCommit />, rootElement);
    


}
