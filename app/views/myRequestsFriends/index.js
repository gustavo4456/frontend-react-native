import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';

// Assets
import close from '../../assets/icons/close.png';

// API
import getUsersRequests from '../../api/getRequestReceivedUsers';

const MyRequestsFriends = ({navigation, route}) => {
  // Para mostrar la lista de usuarios
  const [requestsList, setrequestsList] = useState([]);
  //Modal
  const [modalActive, setModalActive] = useState(false);
  const [msgModal, setMsgModal] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Solicitudes de amistad',
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
    getUsersRequests
      .get()
      .then(res => {
        console.log(res);
        setrequestsList(res);
      })
      .catch(err => {
        console.log(err);
      });

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
        navigation.navigate('ViewMyRequestsFriends', {
          usr: item,
        });
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

      <View style={styles.containerList}>
        <FlatList
          data={requestsList}
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

export default MyRequestsFriends;
