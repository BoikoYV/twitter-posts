
class Modal {
    constructor(url, api) {
        this.url = url;
        this.modal = this.createElement('div', ['modal']);
        this.modalOverlay = this.createElement('div', ['modal-overlay']);
        this.modalCloseBtn = this.createElement('button', ['modal__close'], 'X');
        this.api = api;
    }

    createModal(userId, id, name, lastname, email, title = '', text = '') {
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

        saveChangesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.updatePost(id);
            // изменить текст поста

            this.deleteModal();

        })

        postForm.append(titleLabel, titleEl, textLabel, textEl, saveChangesBtn)
        this.modal.append(this.modalCloseBtn, userInfo, postForm);
        document.body.append(this.modal, this.modalOverlay)
    }

    updatePost(id) {
        const newTitle = document.querySelector('#post__title');
        const newText = document.querySelector('#post__text');
        const formData = { title: newTitle.value, body: newText.value };

        const post = document.querySelector(`[data-post-id="${id}"]`);
        const postTitle = post.querySelector('.post__title');
        postTitle.innerText = newTitle.value;

        const postText = post.querySelector('.post__text');
        postText.innerText = newText.value;

        this.api.updateData(`${this.url}/posts/${id}`, formData)

        newTitle.value = postTitle.innerText;
        newText.value = postText.innerText;
    }

    showModal(id, userId, name, lastname, email, title, text) {
        this.createModal(id, userId, name, lastname, email, title, text);

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