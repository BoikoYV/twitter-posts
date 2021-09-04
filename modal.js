import Api from './api.js';
import Card from './card.js';
const BASE_URL = 'https://ajax.test-danit.com/api/json';

const api = new Api();
const post = new Card(BASE_URL, api);

class Modal {
    constructor(url, requestsObj) {
        this.url = url;
        this.modal = this.createElement('div', ['modal']);
        this.modalOverlay = this.createElement('div', ['modal-overlay']);
        this.modalCloseBtn = this.createElement('button', ['modal__close'], 'X');
        this.requestsObj = requestsObj;
        this.post = post;
    }

    renderModal(userId, id, name, lastname, email, title = '', text = '', method = '') {
        const userInfo = this.createElement('div', ['modal__user-data']);
        userInfo.innerHTML = ` 
            <img class="user-photo" src="./img/${userId}.jpeg" alt="user photo">
            <p class="post__user-name">${name} ${lastname}</p>
            <p class="post__user-email">${email}</p>`;

        // form
        const postForm = this.createElement('form', ['form']);

        // input
        const titleLabel = this.createElement('label', ['form__label'], 'Title', { for: "post__title" });
        const titleEl = this.createElement('input', ['form__title-field'], title,
            { type: 'text', id: 'post__title', name: 'title', placeholder: 'Post title' });

        // texarea
        const textLabel = this.createElement('label', ['form__label'], 'Text', { for: "post__text" });
        const textEl = this.createElement('textarea', ['form__text-field'], text,
            { name: "text", id: "post__text", cols: "30", rows: "5", placeholder: "Post text" });

        const saveChangesBtn = this.createElement('button', ['modal__save-btn'], 'Save changes');
        saveChangesBtn.type = 'submit';

        saveChangesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (method === 'POST') {
                const newPostObjData = this.post.getNewPostData();
                newPostObjData.userId = userId;
                const { title, body } = newPostObjData;
                const newPost = this.post.renderPost(userId, name, lastname, body, title, email, id)

                this.requestsObj.sendData(`${this.url}/posts/`, newPostObjData);
                this.post.posts.push(newPostObjData);
                this.post.list.prepend(newPost);
            } else {
                post.updatePost(id);
            }

            this.deleteModal();
        })

        postForm.append(titleLabel, titleEl, textLabel, textEl, saveChangesBtn)
        this.modal.append(this.modalCloseBtn, userInfo, postForm);
        document.body.append(this.modal, this.modalOverlay)
    }


    showModal(userId, id, name, lastname, email, title, text, method = '') {
        this.renderModal(userId, id, name, lastname, email, title, text, method);
        this.modalCloseBtn.addEventListener('click', () => {
            this.deleteModal()
        })
    }

    deleteModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            const modalOverlay = document.querySelector('.modal-overlay');
            modal.innerHTML = '';
            modal.remove();
            modalOverlay.remove();
        }
    }

    createElement(tag, [classes], text = '', attributes = {}) {
        const element = document.createElement(tag);
        element.classList.add(...[classes]);

        if (tag === 'input' || tag === 'textarea') {
            element.value = text;
        } else {
            element.innerText = text;
        }

        if (attributes) {
            Object.keys(attributes).forEach(attr => {
                element.setAttribute(attr, attributes[attr]);
            })
        }

        return element;
    }
}

export default Modal;