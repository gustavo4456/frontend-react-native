import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Components
import DrawerComponent from '../components/drawer';

// Routes
import Routes from './drawerRoutes';

const Drawer = createDrawerNavigator();

// Container #283541
// Current #6685A4

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      headerMode="screen"
      drawerContent={props => <DrawerComponent {...props} />}>
      <Drawer.Screen name="Publicaciones" component={Routes.Posts} />
      <Drawer.Screen name="Mis Publicaciones" component={Routes.MyPosts} />
      <Drawer.Screen
        name="Publicaciones de amigos"
        component={Routes.FriendsPosts}
      />
      <Drawer.Screen name="Buscar Amigos" component={Routes.MyFriends} />
      <Drawer.Screen
        name="Solicitudes de amistad"
        component={Routes.MyRequestsFriends}
      />
    </Drawer.Navigator>
  );
}
