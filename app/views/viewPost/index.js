// Dependencies
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from '../../components/modal';

// Styles
import {styles} from './styles';

const ViewPosts = ({navigation, route}) => {
  const [posts, setPosts] = useState({});
  const [view, setView] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Ver publicaciones',
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
    const {post} = route.params;
    setPosts(post);
    console.log(post);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cleanStates = () => {
    setView(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setView(true)}>
        <Image
          source={{uri: posts.image}}
          style={{width: '100%', height: 180}}
        />
      </TouchableOpacity>

      <Modal visible={view} onClose={cleanStates}>
        <Image
          source={{uri: posts.image}}
          style={{flex: 1, width: null, height: null, resizeMode: 'contain'}}
        />
      </Modal>

      <Text
        style={{
          color: '#FFF',
          fontSize: 30,
          fontWeight: 'bold',
          marginTop: 10,
          marginLeft: 10,
        }}>
        {posts.title}
      </Text>

      <Text
        style={{
          color: '#FFF',
          fontSize: 18,
          marginTop: 10,
          marginLeft: 10,
        }}>
        {posts.content}
      </Text>
    </View>
  );
};

export default ViewPosts;
