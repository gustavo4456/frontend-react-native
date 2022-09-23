// Dependencies
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  Alert,
} from 'react-native';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// Components
import Button from '../../components/button';
import Modal from '../../components/modal';
import Input from '../../components/input';

// Styles
import {customStyles, styles} from './styles';

// API
import postAPI from '../../api/postById';
import postAPIGet from '../../api/postGet';
import postDelete from '../../api/postDelete';
import auth from '../../api/outhState';

import add from '../../assets/icons/add.png';

const Posts = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState(false);
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [id, setId] = useState();
  const [idPost, setIdPost] = useState();
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    postAPI
      .get()
      .then(res => {
        setPosts(res);
      })
      .catch();

    auth
      .get()
      .then(usr => {
        setId(usr.id);
      })
      .catch();
  }, []);

  const cleanStates = () => {
    setContent(''),
      setTitle(''),
      setImage(''),
      setView(false),
      setIdPost(null),
      setErrors({
        title: '',
        content: '',
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Mis publicaciones',
      headerStyle: {
        backgroundColor: '#6685A4',
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerShown: true,
      headerRight: () => (
        // BOTON PARA AGREGAR UNA NUEVA PUBLICACION
        <TouchableOpacity onPress={() => setView(true)}>
          <Image source={add} style={styles.addBtn} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderItem = ({item, index}) => (
    // PARA LA LISTA DE LAS PUBLICACIONES
    <View style={styles.itemContainer}>
      <Image source={{uri: item.image}} style={styles.itemImage} />

      <View style={styles.textContainerRow}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemContent}>{item.content}</Text>
      </View>

      {/* ---------------EDITAR PUBLICACION --------------------- */}
      <View style={styles.buttonContainerRow}>
        <TouchableOpacity
          onPress={() => {
            console.log(item);
            setTitle(item.title);
            setContent(item.content);
            setImage({uri: item.image});
            setIdPost(item.id);
            setView(true);
          }}>
          <Text style={styles.buttonTxtRow}>Editar</Text>
        </TouchableOpacity>

        {/* ------------------- ELIMINAR PUBLICACION --------------------- */}
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Alert', '¿Quieres eliminar esta publicación?', [
              {
                text: 'Si',
                onPress: () => {
                  postDelete
                    .delete(item.id)
                    .then(
                      postAPI
                        .get()
                        .then(res => {
                          setPosts(res);
                        })
                        .catch(),
                    )
                    .catch();
                },
              },
              {
                text: 'No',
                style: 'cancel',
              },
            ]);
          }}>
          <Text style={styles.buttonTxtRow}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    // --------------------- SE GENERA LA LISTA DE PUBLICACIONES -------------------
    <View style={styles.container}>
      <FlatList data={posts} renderItem={renderItem} />

      {/* MODAL QUE SE UTILILIZA TANTO PARA EDITAR COMO CREAR UNA PUBLICACION */}
      <Modal visible={view} onClose={cleanStates}>
        {/* -------------------- text e inputs del modal ------------------------ */}
        <Input
          title="Titulo"
          value={title}
          custom={{
            onChangeText: em => {
              setTitle(em);
              setErrors(_errors => ({..._errors, title: ''}));
            },
          }}
        />

        {errors.title ? (
          <Text style={styles.errorLabel}>{errors.title}</Text>
        ) : null}

        <Input
          title="Contenido"
          value={content}
          custom={{
            onChangeText: em => {
              setContent(em);
              setErrors(_errors => ({..._errors, content: ''}));
            },
            multiline: true,
            style: customStyles,
          }}
        />

        {errors.content ? (
          <Text style={styles.errorLabel}>{errors.content}</Text>
        ) : null}

        {/* BOTON PARA CARGAR IMAGEN DE LA PUBLICACION */}
        <Button
          action={() => {
            const options = {
              title: 'Selecciona foto de perfil',
            };
            launchImageLibrary(options, res => {
              res.assets.forEach(element => {
                const uri = element.uri;
                const type = element.type;
                const name = element.fileName;

                const photo = {uri, type, name};

                const url =
                  'https://react-native-api-seminario.herokuapp.com/uploadFile';

                const formData = new FormData();
                formData.append('file', photo);

                fetch(url, {
                  method: 'POST',
                  body: formData,
                })
                  .then(res => res.json(res))
                  .then(res => {
                    setImage({uri: res.fileDownloadUri});
                  });
              });
            });
          }}
          title="Cargar imagen"
        />

        {image ? <Text style={styles.errorLabel}>Imagen Cargada</Text> : null}

        {/* ------------- BOTON GUARDAR: PARA EDITAR Y CREAR PUBLICACIONES --------------- */}
        <Button
          action={() => {
            //OBJETO NECESARIO PARA CREAR UNA PUBLICACION
            const postObj = {
              title: title,
              content: content,
              image: image.uri,
              idUser: id,
            };

            // OBEJETO NECESARIO PARA EDITAR UNA PUBLICACIONES
            const postObjUpdate = {
              id: idPost,
              title: title,
              content: content,
              image: image.uri,
              idUser: id,
            };

            let err = {};

            if (!title) {
              err = {...err, title: 'Por favor complete el campo de título'};
            }
            if (!content) {
              err = {
                ...err,
                content: 'Por favor complete el campo de contenido',
              };
            }

            if (err.title) {
              setErrors(_errors => ({..._errors, ...err}));
            } else {
              if (idPost) {
                // SI EL IDPOST EXITE ENTONCES SE HIZO CLIC EN EDITAR
                postAPIGet
                  .post(postObjUpdate)
                  .then(({res}) => {
                    postAPI
                      .get()
                      .then(res => {
                        setPosts(res);
                      })
                      .catch();
                    cleanStates();
                  })
                  .catch(err => console.log(err));
              } else {
                // NO EXISTE ID ENTONCES ES CREAR PUBLICACION
                postAPIGet
                  .post(postObj)
                  .then(({res}) => {
                    postAPI
                      .get()
                      .then(res => {
                        setPosts(res);
                      })
                      .catch();
                    cleanStates();
                  })
                  .catch(err => console.log(err));
              }
            }
          }}
          title="Guardar"
        />
      </Modal>
    </View>
  );
};

export default Posts;
