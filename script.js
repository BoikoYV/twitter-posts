import Api from './api.js';
import Card from './card.js';
import Modal from './modal.js';
// import User from './user.js';
const BASE_URL = 'https://ajax.test-danit.com/api/json';




const api = new Api();
const modal = new Modal(BASE_URL, api);
const post = new Card(BASE_URL, api, modal);
document.addEventListener('DOMContentLoaded', () => {
    post.showPostsList();

})
// post.updatePost()
// console.log(Card);