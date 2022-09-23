// Dependencies
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Button from '../../components/button';
import Modal from '../../components/modal';

// Styles
import {styles} from './styles';

// API
import postRequestConfirm from '../../api/postRequesConfirm';
import postFriendRechazar from '../../api/postRequestRechazar';
import auth from '../../api/outhState';

const ViewSearchFriends = ({navigation, route}) => {
  // user es el usuario a que se quiere enviar la solicitud
  const [user, setUser] = useState({});
  // useId id del usuario que inicio sesion el que envia la solicitud
  const [userId, setUserId] = useState();
  //Cambiar el texto agregar por cancelar
  const [txtFlag, setTxtFlag] = useState('');

  // datos del usuario que inicio sesion
  const [userCurrent, setUserCurrent] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Solicitud de amistad',
      headerStyle: {
        backgroundColor: '#6685A4',
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerShown: true,
    });
  }, [navigation]);

  useEffect(() => {
    auth
      .get()
      .then(res => {
        setUserCurrent(res.id);
      })
      .catch(err => {
        console.log(err);
      });

    // Datos enviados de la pantalla anterior
    const {usr} = route.params;
    setUser(usr);
    console.log('despues: ' + route.params.result);
    setTxtFlag(route.params.result);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{uri: user.photoURL}}
        style={{width: '100%', height: 180}}
      />

      <Text
        style={{
          color: '#FFF',
          fontSize: 30,
          fontWeight: 'bold',
          marginTop: 10,
          marginLeft: 10,
        }}>
        {user.email}
      </Text>

      <Button
        title="Confirmar"
        action={() => {
          console.log('Confirmadoooooo');
          console.log('idUsuario: ' + user.id);
          console.log('idAmigo: ' + userCurrent);
          const requestObj = {
            idUsuario: user.id,
            idAmigo: userCurrent,
          };

          postRequestConfirm
            .post(requestObj)
            .then(res => {
              navigation.navigate('Solicitudes de amistad', {
                modalView: true,
                msg:
                  'La solicitud de amistad del usuario ' +
                  user.email +
                  ' fue aceptada.',
              });
            })
            .catch(err => {
              console.log(err);
              navigation.navigate('Solicitudes de amistad', {
                modalView: true,
                msg:
                  'Error al confirmar al solicitud de amisdad de ' +
                  user.email +
                  ' .',
              });
            });
        }}
      />
      <Button
        title="Rechazar"
        action={() => {
          console.log('RECHANZANDOOOOOOO');
          console.log('idUsuario: ' + user.id);
          console.log('idAmigo: ' + userCurrent);
          const requestObj = {
            idUsuario: user.id,
            idAmigo: userCurrent,
          };
          postFriendRechazar
            .post(requestObj)
            .then(res => {
              navigation.navigate('Solicitudes de amistad', {
                modalView: true,
                msg:
                  'La solicitud de amistad del usuario ' +
                  user.email +
                  ' fue rechazada.',
              });
            })
            .catch(err => {
              console.log(err);
              navigation.navigate('Solicitudes de amistad', {
                modalView: true,
                msg:
                  'Error al rechazar la solicitud de amistad a ' + user.email,
              });
            });
        }}
      />
    </View>
  );
};

export default ViewSearchFriends;
