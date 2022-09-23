import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

//Screen
import Routes from './stackRouters';
import Home from './drawer';

// Assets
import back from '../assets/icons/back.png';

const Stack = createStackNavigator();

const getButton = ({navigation}) => (
  <TouchableOpacity
    style={{flexDirection: 'row'}}
    onPress={() => navigation.goBack()}>
    <Image
      source={back}
      style={{
        width: 15,
        height: 15,
        tintColor: '#FFF',
        marginLeft: 5,
        marginRight: 5,
      }}
    />
    <Text style={{color: '#FFF'}}>Volver</Text>
  </TouchableOpacity>
);

function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Routes.Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ViewPosts"
          component={Routes.ViewPosts}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ViewSearchFriends"
          component={Routes.ViewSearchFriends}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ViewMyRequestsFriends"
          component={Routes.ViewMyRequestsFriends}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CreateUser"
          component={Routes.CreateUser}
          options={nav => ({
            title: 'Crear Usuario',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#6685A4',
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => getButton(nav),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
