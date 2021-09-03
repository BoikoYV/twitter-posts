import Api from './api.js';
import Card from './card.js';
// import User from './user.js';
const BASE_URL = 'https://ajax.test-danit.com/api/json';




const api = new Api();
const post = new Card(BASE_URL, api);
post.showPostsList();
// post.getUsers()
