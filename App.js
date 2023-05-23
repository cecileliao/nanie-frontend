import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import des screens
import HomeScreen from "./screens/HomeScreen";
import ConnexionScreen from "./screens/ConnexionScreen";
import InscriptionScreen from "./screens/InscriptionScreen";
import MessageScreen from "./screens/MessageScreen";
import ConversationScreen from "./screens/ConversationScreen"
import MissionScreen1 from "./screens/MissionScreen1";
import MissionScreen2 from "./screens/MissionScreen2";
import RechercheScreen1 from "./screens/RechercheScreen1";
import RechercheScreen2 from "./screens/RechercheScreen2";
import AidantDisplayProfilScreen from "./screens/AidantDisplayProfilScreen";
import AidantProfilScreen1 from "./screens/AidantProfilScreen1";
import AidantProfilScreen2 from "./screens/AidantProfilScreen2";
import AidantProfilScreen3 from "./screens/AidantProfilScreen3";
import ParentDisplayProfilScreen from "./screens/ParentDisplayProfilScreen";
import ParentProfilScreen1 from "./screens/ParentProfilScreen1";
import ParentProfilScreen2 from "./screens/ParentProfilScreen2";
import ParentProfilScreen3 from "./screens/ParentProfilScreen3";
import ParentProfilScreen4 from "./screens/ParentProfilScreen4";
import AvisScreen from "./screens/AvisScreen";
import EvaluationScreen from "./screens/EvaluationScreen";
import CalendarScreen1 from "./screens/CalendarScreen1";
//ajout des modules pour importer les fonts
import { useEffect, useState } from "react";
import { useSelector} from 'react-redux';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
//mise en place des imports de Redux
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from './reducers/users';
// mise en place des imports de Redux Persist
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { persistStore, persistReducer } from 'redux-persist'
// import { PersistGate } from 'redux-persist/integration/react';

// redux sans persist, à supprimer si persist est mis en place
const store = configureStore({
  reducer: { user },
});

// persist store sur React avec AsyncStorage en plus
// const reducers= combineReducers({ user });
// const persistConfig = {
//   key: 'nanie',
//   storage: AsyncStorage,
// }
// const store = configureStore({
//   reducer: persistReducer(persistConfig, reducers),
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
//  });
// const persistor = persistStore(store);


//Fetch get find data.type; if data.result, setIsParent(true)


// définir les variables pour le tab et lav navigation stack
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const BACKEND_ADDRESS = '192.168.10.142:3000';

//Tabnavigator
const TabNavigator = () => {

  const userData = useSelector((state) => state.user.value);
  // console.log("coucou", userData);
  const [isParent, setIsParent] = useState(false);

  useEffect(() => {
    if (userData.token){
      // console.log('token', userData.token)
      fetch(`http://${BACKEND_ADDRESS}/parentUsers/Infos/${userData.token}`)
        .then(response => response.json())
        .then(data => {
          // console.log('data', data)
          if (data.result && data.Parentinfos.token) {
            // console.log({ infosDataParent: data });
            setIsParent(true)
            //Parentinfos vient de la route GET
            //besoin de l'appeler pour afficher données 
            //console.log({ infos: data.Parentinfos.token })
          }         
          else {
            fetch(`http://${BACKEND_ADDRESS}/aidantUsers/Infos/${userData.token}`)
            .then(response => response.json())
            .then(data => {
              if (data.result && data.Parentinfos.token) {
                // console.log({ infosDataAidant: data });
                setIsParent(false)
                //Parentinfos vient de la route GET
                //besoin de l'appeler pour afficher données 
                //console.log({ infos: userParent.Parentinfos.parent })
              }
          })
          }
        })
    }
  }, []);
  // console.log('isParent', isParent)

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Mission") {
            return (
              <Image
                source={require("./assets/iconMissionGrey.png")}
                style={{ width: size * 0.8, height: size, tintColor: color }}
              />
            );
          }

          let iconName = "";

          if (route.name === "Recherche") {
            iconName = "search";
          } else if (route.name === "Message") {
            iconName = "envelope";
          } else if (route.name === "Profil") {
            iconName = "user";
          } else if (route.name === "Calendar") {
            iconName = "calendar";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#5ABAB6",
        tabBarInactiveTintColor: "#B4B4B4",
        headerShown: false,
      })}
    >

      {isParent ? ( // si c'est un parent, afficher la page recherche
        <>
          <Tab.Screen name="Recherche" component={RechercheScreen1} /> 
        </>
      ) : ( // sinon, afficher la page calendrier
        <>
          <Tab.Screen name="Calendar" component={CalendarScreen1} />
        </>
      )}

      <Tab.Screen name="Message" component={MessageScreen} options={{title: 'Massages'}}/>
      <Tab.Screen name="Mission" component={MissionScreen1} />

      {isParent ? ( // si c'est un parent afficher la page profil parent
        <>
          <Tab.Screen name="Profil" component={ParentDisplayProfilScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('ParentProfilScreen1')}>
                  {/* remplir les champs de la page modif */}
                  <View style={styles.button}>
                    <Text style={styles.buttonTxt}>Editer</Text>
                  </View>
                </TouchableOpacity>
              ),
            })
          }        
          /> 
        </>
      ) : ( // sinon, afficher la page profil aidant
        <>
          <Tab.Screen name="Profil" component={AidantDisplayProfilScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('AidantProfilScreen1')}>
                {/* remplir les champs de la page modif */}
                <View style={styles.button}>
                  <Text style={styles.buttonTxt}>Editer</Text>
                </View>
              </TouchableOpacity>
            ),
          })}
          />
        </>
      )}
    </Tab.Navigator>
  );
};


// bouton back du header
const CustomBackButton = ({ onPress }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image source={require('./assets/backArrow.png')} style={styles.backIcon}/>
    </TouchableOpacity>
  );
};


export default function App() {

  // ajout du font Recoleta et Manrope
  const [fontsLoaded] = useFonts({
    Recoleta: require("./assets/fonts/Recoleta.ttf"),
    RecoletaBold: require("./assets/fonts/RecoletaAlt-Bold.ttf"),
    Manrope: require("./assets/fonts/Manrope-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  // fonction Stack pour afficher le header sauf dans la page home
  const HomeStackNavigator = () => {
    return (
      <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontFamily: 'Recoleta',
          fontSize: 18,
        },
        headerLeft: ({ onPress }) => (
          <CustomBackButton onPress={onPress} />
        ),
      }}
    >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Connexion" component={ConnexionScreen} options={{ title: 'Connexion' }}/>
        <Stack.Screen name="Inscription" component={InscriptionScreen} options={{ title: 'Créer un compte' }}/>
        <Stack.Screen name="MissionScreen2" component={MissionScreen2} options={{ title: 'Mes missions validées' }} />
        <Stack.Screen name="AidantProfilScreen1" component={AidantProfilScreen1} options={{ title: 'Créer mon Profil' }}/>
        <Stack.Screen name="AidantProfilScreen2" component={AidantProfilScreen2} options={{ title: 'Créer mon Profil' }}/>
        <Stack.Screen name="AidantProfilScreen3" component={AidantProfilScreen3} options={{ title: 'Créer mon Profil' }}/>
        <Stack.Screen name="ParentProfilScreen1" component={ParentProfilScreen1} options={{ title: 'Créer le profil de ma famille' }}/>
        <Stack.Screen name="ParentProfilScreen2" component={ParentProfilScreen2} options={{ title: 'Créer le profil de ma famille' }}/>
        <Stack.Screen name="ParentProfilScreen3" component={ParentProfilScreen3} options={{ title: 'Créer le profil de ma famille' }}/>
        <Stack.Screen name="ParentProfilScreen4" component={ParentProfilScreen4} options={{ title: 'Créer le profil de ma famille' }}/>
        <Stack.Screen name="AvisScreen" component={AvisScreen} options={{ title: 'Mes avis' }}/>
        <Stack.Screen name="EvaluationScreen" component={EvaluationScreen} options={{ title: 'Évaluation' }}/>
        <Stack.Screen name="RechercheScreen2" component={RechercheScreen2} options={{ title: 'Ma recherche' }}/>
        <Stack.Screen name="ConversationScreen" 
        component={ConversationScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <View style={styles.button}>
                <Text style={styles.buttonTxt}>Voir Profil</Text>
              </View>
            </TouchableOpacity>
          ),
        })}/>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
};

  return (
    <Provider store={store}>
        <NavigationContainer>
          <HomeStackNavigator />
        </NavigationContainer>
    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  button: {
    backgroundColor: '#785C83',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buttonTxt: {
    color: '#ffff'
  }
});