import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React, {useState} from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const getNewRandomUser = async () => {
        try {
            const response = await fetch(
              'https://randomuser.me/api/',
            );
            const json = await response.json();
            strNewImgURL = json.results[0].picture.large;
            strNewName = json.results[0].name.first + ' ' + json.results[0].name.last;
            intNewAge = json.results[0].dob.age;
            strNewGender = json.results[0].gender;
            strNewEmail = json.results[0].email;

            this.updateRandomUser(strNewImgURL,strNewName,intNewAge,strNewGender,strNewEmail);

        } catch (error) {
            console.error(error);
        }
    };

const RandomUserDisplay = () => {
    const [useRandomUser, setRandomUser] = useState({
        strImgURL: "",
        strName: "John Doe",
        intAge: 25,
        strGender: "male",
        strEmail: "random@something.com"
    });

    const [isInit, setInit] = useState(true);

    updateRandomUser = (strNewImgURL,strNewName,intNewAge,strNewGender,strNewEmail) => {
        setRandomUser({
        strImgURL: strNewImgURL,
        strName: strNewName,
        intAge: intNewAge,
        strGender: strNewGender,
        strEmail: strNewEmail
        })
    }

    if(isInit){
        getNewRandomUser();
        setInit(false);
    }

    return (
        <View style={styles.container}>
            <Image
                style={{width: 250, height: 250, borderRadius: 125, borderWidth: 3, borderColor: "black"}}
                source={{uri:`${useRandomUser.strImgURL}`}} />
            <Text style={{fontSize: 22,fontWeight: 'bold'}}>{useRandomUser.strName}</Text>
            <Text style={{fontSize: 18}}>{useRandomUser.intAge}, {useRandomUser.strGender}</Text>
            <Text style={{fontSize: 16}}>{useRandomUser.strEmail}</Text>
            <Button
                title="Generate New User"
                onPress={getNewRandomUser}
                />
        </View>
    )
}

export default RandomUserDisplay;