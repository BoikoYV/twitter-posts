class Card {
    constructor(url, requestsObj, modal, loader) {
        this.requestsObj = requestsObj;
        this.modal = modal;
        this.url = url;
        this.list = document.querySelector('.posts');
        this.addPostBtn = document.querySelector('.add-post__btn');
        this.currentPostId = null;
        this.posts = [];
        this.loader = loader;
    }

    async getUsers() {
        const users = await this.requestsObj.getData(`${this.url}/users`)
        this.users = users;
    }

    getPosts() {
        this.loader.classList.add('loader--active');
        const posts = this.requestsObj.getData(`${this.url}/posts`)
        return posts;
    }

    getPostsList() {
        this.getUsers();

        const postsPromissesArr = this.getPosts().then(posts => {
            this.posts = posts;
            this.postsCount = this.posts.length + 1;

            return posts.map(({ userId, body, title, id }) => {
                const { name, username, email } = this.users.find(user => user.id === userId);
                return this.renderPost(userId, name, username, body, title, email, id);
            })
        });
        return postsPromissesArr;
    }

    renderPostsList() {
        const postsArr = this.getPostsList();
        postsArr.then((posts) => {
            return Promise.all(posts.map(post => {
                return new Promise((resolve) => {
                    resolve(post);
                })
            })).then((posts) => {
                this.loader.classList.remove('loader--active');
                posts.forEach(post => {
                    this.list.append(post);
                })
            })
        })
    }

    renderPost(userId, name, lastName, body, title, email, id) {
        const post = this.createElement('li', ['post__item']);
        post.dataset.postId = id;

        post.innerHTML = `
            <img class="user-photo" src="./img/${userId}.jpeg" alt="user photo">
            <p class="post__user-name">${name} ${lastName}</p>
            <p class="post__user-email">${email}</p>
            <h3 class="post__title">${title}</h3>
            <p class="post__text">${body}</p>
        `;

        const buttonsBox = this.createElement('div', ['post__buttons']);
        const editBtn = this.createElement('button', ['post__edit-btn'], 'Edit');
        const deletePostBtn = this.createElement('button', ['post__delete-btn'], 'Delete');

        deletePostBtn.addEventListener('click', (e) => {
            this.modal.deleteModal();
            this.deletePost(id, e.target.closest('.post__item'));
        })

        editBtn.addEventListener('click', () => {
            const post = document.querySelector(`[data-post-id="${id}"]`);
            const postTitle = post.querySelector('.post__title');
            const postText = post.querySelector('.post__text');

            this.modal.showModal(userId, id, name, lastName, email, postTitle.innerText, postText.innerText);

        })

        buttonsBox.append(editBtn, deletePostBtn);
        post.append(buttonsBox);
        return post
    }

    async deletePost(id, li) {
        await this.requestsObj.deleteData(`${this.url}/posts/${id}`, id)
        li.remove();
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

        this.requestsObj.updateData(`${this.url}/posts/${id}`, formData, id)

        newTitle.value = postTitle.innerText;
        newText.value = postText.innerText;

        return formData;
    }

    getNewPostData() {
        const newTitle = document.querySelector('#post__title');
        const newText = document.querySelector('#post__text');
        const formData = { title: newTitle.value, body: newText.value };
        return formData;
    }

    addPost() {
        const firstUser = {
            name: 'Leanne Graham',
            username: 'Bret',
            email: 'Sincere@april.biz',
        }

        this.addPostBtn.addEventListener('click', () => {
            const postId = this.postsCount++;
            this.postsCount = this.postsCount++;
            this.modal.showModal(
                '1',
                postId,
                firstUser.name,
                firstUser.username,
                firstUser.email,
                '', '', 'POST');
        })
    }

    createElement(tag, [classes], text = '') {
        const element = document.createElement(tag);
        element.classList.add(...[classes]);
        element.innerText = text;
        return element;
    }
}


export default Card;