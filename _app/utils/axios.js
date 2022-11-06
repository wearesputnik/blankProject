import endpoint from './config';
const {default: Axios} = require('axios');

export default axios = Axios.create({
  baseURL: endpoint,
  timeout: 5000,
  headers: {token: '---------'},
});
