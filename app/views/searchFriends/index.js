import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import Input from '../../components/input';
// Assets
import close from '../../assets/icons/close.png';

// API
import getUsers from '../../api/getSearchUsers';
import getTrueOrFalseFriendSent from '../../api/getTrueOrFalseFriendSent';

// Styles
import {styles} from './styles';

// Assets
import search from '../../assets/icons/search.png';
import ModalCustom from '../../components/modal';

const SearchFriends = ({navigation, route}) => {
  const [usersList, setUsersList] = useState([]);
  const [nameUser, setNameUser] = useState('');
  // ya se le envio una solicitud o no a este usuario?
  const [resultTrueOrFalse, setResultTrueOrFalse] = useState('');

  const [modalActive, setModalActive] = useState(false);
  const [msgModal, setMsgModal] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Buscar amigos',
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
    console.log('holaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    console.log(route.params);
    if (typeof route.params !== 'undefined') {
      const modalView = route.params.modalView;
      const msg = route.params.msg;
      setMsgModal(msg);
      setModalActive(modalView);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        // console.log(item.id);
        getTrueOrFalseFriendSent
          .getOne(item.id)
          .then(res => {
            setResultTrueOrFalse(res.resultado);
            console.log('antes: ' + res.resultado);

            navigation.navigate('ViewSearchFriends', {
              usr: item,
              result: res.resultado,
            });
          })

          .then(res => {})
          .catch(err => console.log(err));
      }}>
      <Image source={{uri: item.photoURL}} style={styles.itemImage} />

      <View style={styles.textContainerRow}>
        <Text style={styles.itemTitle}>{item.email}</Text>
        <TouchableOpacity onPress={() => {}}>
          {/* <Text style={styles.buttonTxtRow}>{txtRequest}</Text> */}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const clear = () => {
    setModalActive(false);
  };

  return (
    <View style={styles.container}>
      <Modal animationType="fade" visible={modalActive} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalSubcontainer}>
            <View style={styles.modalHeaderContainer}>
              <TouchableOpacity onPress={clear}>
                <Image source={close} style={styles.modalBtnClose} />
              </TouchableOpacity>
            </View>

            <Text style={styles.txtModal}>{msgModal}</Text>
          </View>
        </View>
      </Modal>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingVertical: 10,
          paddingHorizontal: 5,
        }}>
        <Input
          //   title="Buscar usuario (Email)"
          custom={{
            autoCapitalize: 'none',
            width: '90%',
            value: {nameUser},
            onChangeText: usr => setNameUser(usr),
          }}
        />
        {/* LUPA, BOTON PARA BUSCAR */}
        <TouchableOpacity
          style={{height: 50, width: 50}}
          onPress={() => {
            // Obtiene lista de usuarios por parametro
            getUsers
              .getSearch(nameUser)
              .then(res => {
                console.log(res);
                setUsersList(res);
              })
              .catch(err => {
                console.log(err);
              });
          }}>
          <Image source={search} style={styles.searchBtn} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerList}>
        <FlatList
          data={usersList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          //   refreshControl={
          //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          //   }
        />
      </View>
    </View>
  );
};

export default SearchFriends;
