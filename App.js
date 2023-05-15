import { StyleSheet, Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './screens/HomeScreen';
import AidantMessageScreen from './screens/AidantMessageScreen';
import AidantMissionScreen from './screens/AidantMissionScreen';
import AidantRechercheScreen from './screens/AidantRechercheScreen';
import AidantProfilScreen1 from './screens/AidantProfilScreen1'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      if (route.name === 'Mission') {
        return (
          <Image
            source={require('./assets/iconMissionGrey.png')}
            style={{ width: size*0.8, height: size, tintColor: color }}
          />
        );
      }

      let iconName = '';

      if (route.name === 'Recherche') {
        iconName = 'search';
      } else if (route.name === 'Message') {
        iconName = 'envelope';
      } else if (route.name === 'Profil') {
        iconName = 'user';
      }

      return (
        <FontAwesome name={iconName} size={size} color={color} />
      );
    },
    tabBarActiveTintColor: '#5ABAB6',
    tabBarInactiveTintColor: '#B4B4B4',
    headerShown: false,
  })}>

      <Tab.Screen name="Recherche" component={AidantRechercheScreen} />
      <Tab.Screen name="Message" component={AidantMessageScreen} />
      <Tab.Screen name="Mission" component={AidantMissionScreen} />
      <Tab.Screen name="Profil" component={AidantProfilScreen1} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
