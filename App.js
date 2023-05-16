import { StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./screens/HomeScreen";
import ConnexionScreen from "./screens/ConnexionScreen";
import InscriptionScreen from "./screens/InscriptionScreen";
import AidantMessageScreen from "./screens/AidantMessageScreen";
import AidantMissionScreen from "./screens/AidantMissionScreen";
import AidantMissionScreen2 from "./screens/AidantMissionScreen2";
import AidantRechercheScreen from "./screens/AidantRechercheScreen";
import AidantProfilScreen1 from "./screens/AidantProfilScreen1";
import AidantProfilScreen3 from "./screens/AidantProfilScreen3";

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

//ajout des modules pour importer les fonts
import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
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
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#5ABAB6",
        tabBarInactiveTintColor: "#B4B4B4",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Recherche" component={AidantRechercheScreen} />
      <Tab.Screen name="Message" component={AidantMessageScreen} />
      <Tab.Screen name="Mission" component={AidantMissionScreen} />
      <Tab.Screen name="Profil" component={AidantProfilScreen3} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Recoleta: require("./assets/fonts/Recoleta.ttf"),
    RecoletaBold: require("./assets/fonts/RecoletaAlt-Bold.ttf"),
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
        <Stack.Screen name="Inscription" component={InscriptionScreen} />
        <Stack.Screen name="AidantMissionScreen" component={AidantMissionScreen} />
        <Stack.Screen name="AidantMissionScreen2" component={AidantMissionScreen2} />
        <Stack.Screen name="AidantProfilScreen3" component={AidantProfilScreen3} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
    
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
  }
});