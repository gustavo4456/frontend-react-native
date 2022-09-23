import React, {useLayoutEffect, useState} from 'react';
import {View, TochableOpacity, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

//assets
import logout from '../../assets/icons/logout.png';
import user from '../../assets/icons/usuario.png';

import auth from '../../api/outhState';
import authLogout from '../../api/logout';

export default function CustomDrawerContent(props) {
  const [avatar, setAvatar] = useState('');

  useLayoutEffect(() => {
    auth
      .get()
      .then(usr => {
        if (usr && usr.photoURL) {
          console.log(usr.photoURL);
          setAvatar(usr.photoURL);
        }
      })
      .catch();
  }, [props]);

  return (
    <View style={{flex: 1, backgroundColor: '#283541'}}>
      <View
        style={{
          height: 250,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={avatar ? {uri: avatar} : user}
          style={{width: 150, height: 150}}
        />
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList
          activeBackgroundColor="#6685A4"
          labelStyle={{color: '#FFF'}}
          {...props}
        />
      </DrawerContentScrollView>
      <DrawerItem
        label="Cerrar sesión"
        labelStyle={{color: '#FFF'}}
        style={{marginBottom: 25}}
        icon={() => (
          <Image
            source={logout}
            style={{width: 20, height: 20, tintColor: '#FFF'}}
          />
        )}
        onPress={() => {
          var requestOptions = {
            method: 'POST',
            redirect: 'follow',
          };

          fetch(
            'https://react-native-api-seminario.herokuapp.com/logout',
            requestOptions,
          )
            .then(response => response.text())
            .then(props.navigation.navigate('Login'))
            .catch(error => console.log('error', error));
        }}
      />
    </View>
  );
}
