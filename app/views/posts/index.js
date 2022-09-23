// Dependencies
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Image,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import {useIsDrawerOpen} from '@react-navigation/drawer';

// Components
import Button from '../../components/button';
import Modal from '../../components/modal';

// Styles
import {styles} from './styles';

// API
import postAPI from '../../api/postById';

import drawer from '../../assets/icons/drawer.png';

const Posts = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    postAPI
      .get()
      .then(res => {
        setPosts(res);
        setRefreshing(false);
      })
      .catch();
  };

  useEffect(() => {
    postAPI
      .get()
      .then(res => {
        setPosts(res);
      })
      .catch();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Publicaciones',
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

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate('ViewPosts', {post: item});
      }}>
      <Image source={{uri: item.image}} style={styles.itemImage} />

      <View style={styles.textContainerRow}>
        <Text style={styles.itemTitle}>{item.title}</Text>

        <Text style={styles.itemContent}>{item.content}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Posts;
