import Api from './api.js';
import Card from './card.js';
import Modal from './modal.js';
const BASE_URL = 'https://ajax.test-danit.com/api/json';

const loader = document.querySelector('.loader');

const api = new Api();
const modal = new Modal(BASE_URL, api,);

const post = new Card(BASE_URL, api, modal, loader);
modal.post = post;


document.addEventListener('DOMContentLoaded', () => {
    post.renderPostsList();
    post.addPost();
})