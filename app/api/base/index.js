import axios from 'axios';
import {Service} from 'axios-middleware';

const base = 'https://react-native-api-seminario.herokuapp.com/';
const _headers = {
  headers: {'Content-Type': 'application/json', withCredentials: true},
};

class Register {
  constructor() {
    if (typeof Register.instance === 'object') {
      return Register.instance;
    }
    Register.instance = this;
  }

  onResponse(response) {
    // console.log(response.data);
    if (response.status === 200 && response.data === '') {
      return {hola: 'data esta vacio'};
    } else if (
      response.data === 'Eliminar' ||
      response.data === 'Agregar' ||
      response.data === 'Cancelar solicitud'
    ) {
      return {resultado: response.data};
    } else {
      const res = JSON.parse(response.data);
      return res;
    }
  }
}

class Request {
  constructor(url, baseURL) {
    this.url = url;
    this.baseURL = baseURL || base;
    this.request = axios.create({
      baseURL: this.baseURL,
      headers: this._headers,
    });
    const service = new Service(this.request);
    service.register(new Register());
  }

  get() {
    return this.request({url: this.url});
  }

  getOne(id) {
    return this.request({url: this.url + '/' + id});
  }

  post(value) {
    return this.request({url: this.url, data: value, method: 'post'});
  }

  postLogout() {
    return this.request({url: this.url, method: 'post'});
  }

  // Buscar amigos
  getSearch(usuario) {
    return this.request({url: this.url + '/' + usuario, method: 'get'});
  }

  postLogin(value) {
    //console.log('Username: ' + value.email + ' password: ' + value.password);
    return this.request({
      url: this.url,
      data: value,
      auth: {
        username: value.email,
        password: value.password,
      },
      method: 'post',
    });
  }

  put(value, id) {
    return this.request({url: this.url + '/' + id, data: value, method: 'put'});
  }

  delete(id) {
    return this.request({url: this.url + '/' + id, method: 'delete'});
  }
}

export default Request;
