import {decode, encode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}
import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity, Text, Image} from 'react-native';

// Components
import Button from '../../components/button';
import Input from '../../components/input';

import {styles} from './styles';

import userImg from '../../assets/icons/usuario.png';

import login from '../../api/login';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Email: null,
      Password: null,
      Result: '',
    };
  }

  render() {
    const {Email, Password, Result} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <Image source={userImg} style={styles.img} />
        </View>

        <View style={styles.subcontainer}>
          <Input
            title="Correo electronico"
            custom={{
              autoCapitalize: 'none',
              value: {Email},
              onChangeText: em => this.setState({Email: em}),
            }}
          />

          <Input
            title="Clave"
            custom={{
              value: {Password},
              onChangeText: psw => this.setState({Password: psw}),
              secureTextEntry: true,
            }}
          />

          <Button
            title="Iniciar sesión"
            action={() => {
              const usr = {
                email: Email,
                password: Password,
              };
              login
                .postLogin(usr)
                .then(rows => this.props.navigation.navigate('Home'))
                .catch(err =>
                  this.setState({Result: `error al crear el usuario ${err}`}),
                );
            }}
          />

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('CreateUser')}>
            <Text style={{color: '#FFF', fontWeight: 'bold', marginTop: 10}}>
              Crear una cuenta
            </Text>
          </TouchableOpacity>
          <Text style={styles.text}>{Result}</Text>
        </View>
      </View>
    );
  }
}

export default Login;
