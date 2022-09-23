// Dependencies
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Button from '../../components/button';
import Modal from '../../components/modal';

// Styles
import {styles} from './styles';

// API
import postFriendSaveSent from '../../api/postFriendSaveSent';
import postFriendCancel from '../../api/friendRequestRejected';
import auth from '../../api/outhState';
import deleteUser from '../../api/deleteFriend';

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
      title: 'Enviar solicitud de amistad',
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
        title={txtFlag}
        action={() => {
          if (txtFlag === 'Cancelar solicitud') {
            console.log('Se envia la cancelacion de la solicitud');
            const requestObj = {
              idUsuario: userCurrent,
              idAmigo: user.id,
            };
            postFriendCancel
              .post(requestObj)
              .then(res => {
                console.log(
                  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasssssssss',
                );
                console.log(res);
                navigation.navigate('Buscar Amigos', {
                  modalView: true,
                  msg:
                    'La solicitud al usuario ' +
                    user.email +
                    ' fue cancelada con exito.',
                });
              })
              .catch(err => {
                console.log(err);
                navigation.navigate('Buscar Amigos', {
                  modalView: true,
                  msg:
                    'Error al cancelar la solicitud de amistad a ' + user.email,
                });
              });
          }

          if (txtFlag === 'Agregar') {
            console.log('Se envia la solicitud de amistad');
            const requestFriend = {
              idUsuario: userCurrent,
              idAmigo: user.id,
            };
            postFriendSaveSent
              .post(requestFriend)
              .then(res => {
                navigation.navigate('Buscar Amigos', {
                  modalView: true,
                  msg:
                    'Se envio la solicitud de amidad a ' +
                    user.email +
                    ' con exito.',
                });
              })
              .catch(err => {
                console.log(err);
                navigation.navigate('Buscar Amigos', {
                  modalView: true,
                  msg:
                    'Error al enviar la solicitud de amistad a ' + user.email,
                });
              });
          }

          if (txtFlag === 'Eliminar') {
            console.log('eliminado ' + user.id);
            deleteUser
              .delete(user.id)
              .then(res => {
                console.log(res);
                navigation.navigate('Buscar Amigos', {
                  modalView: true,
                  msg: 'Se elimino a ' + user.email + ' de amigos.',
                });
              })
              .catch(err => {
                console.log(err);
                navigation.navigate('Buscar Amigos', {
                  modalView: true,
                  msg: 'Error al eliminar a ' + user.email + ' de amigos.',
                });
              });
          }
        }}
      />
    </View>
  );
};

export default ViewSearchFriends;
