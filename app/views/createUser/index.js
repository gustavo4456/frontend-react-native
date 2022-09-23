import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

//Components
import Button from '../../components/button';
import Input from '../../components/input';
import createUser from '../../api/user';

//Styles
import {styles} from './styles';

import userImg from '../../assets/icons/usuario.png';

class CreateUser extends Component {
  funct(props) {}
  constructor(props) {
    super(props);

    this.state = {
      Email: null,
      Password: null,
      Result: '',
      uri: null,
    };
  }

  render() {
    const {Email, Password, Result, uri} = this.state;

    // secureTextEntry

    return (
      <View style={styles.container}>
        {/* FOTO DEL USUARIO */}
        <TouchableOpacity
          style={{
            height: 200,
            width: 200,
            borderRadius: 100,
            borderColor: '#FFF',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
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
                    console.log({res});
                    this.setState({uri: res.fileDownloadUri});
                  });
              });
            });
          }}>
          <Image
            source={uri ? {uri} : userImg}
            style={{
              height: 120,
              width: 120,
            }}
          />
        </TouchableOpacity>

        <Input
          title="Correo electronico"
          custom={{
            autoCapitalize: 'none',
            value: {Email},
            onChangeText: val => this.setState({Email: val}),
          }}
        />

        <Input
          title="Clave"
          custom={{
            value: {Password},
            onChangeText: val => this.setState({Password: val}),
            secureTextEntry: true,
          }}
        />

        <Button
          title="Guardar"
          action={() => {
            const usr = {
              email: Email,
              password: Password,
              photoURL: uri,
            };
            console.log({usr});
            createUser
              .post(usr)
              .then(rows =>
                this.setState({Result: 'Usuario creado correctamente.'}),
              )
              .catch(error =>
                this.setState({Result: 'Error al crear el usuario.'}),
              );
          }}
        />
        <Text style={styles.text}>{Result}</Text>
      </View>
    );
  }
}

export default CreateUser;
