
class Card {
    constructor(url, requestsObj, modal) {
        this.requestsObj = requestsObj;
        this.modal = modal;
        this.url = url;
        this.list = document.querySelector('.posts');
        // this.deletePostBtn.addEventListener('click', this.deletePost)
    }

    async getUsers() {
        const users = await this.requestsObj.getData(`${this.url}/users`)
        this.users = users;
        // console.log(users);
    }

    async getPosts() {
        const posts = await this.requestsObj.getData(`${this.url}/posts`)
        return posts;
    }

    async showPostsList() {
        this.getUsers();
        this.getPosts().then(posts => {
            // console.log(posts);
            this.posts = posts;

            posts.forEach(({ userId, body, title, id }) => {
                const { name, username, email } = this.users.find(user => user.id === userId);
                this.renderPost(userId, name, username, body, title, email, id);
            })
        });

        return;
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

            // const post = document.querySelector(`[data-post-id="${id}"]`);
            const post = document.querySelector(`[data-post-id="${id}"]`);
            const postTitle = post.querySelector('.post__title');
            // postTitle.innerText = newTitle.value;

            const postText = post.querySelector('.post__text');
            // postText.innerText = newText.value;

            this.modal.showModal(userId, id, name, lastName, email, postTitle.innerText, postText.innerText);
        })

        buttonsBox.append(editBtn, deletePostBtn);
        post.append(buttonsBox);
        this.list.append(post);

    }

    async deletePost(id, li) {
        console.log(li);
        await this.requestsObj.deleteData(`${this.url}/posts/${id}`)
        li.remove();
    }

    // updatePost(id) {
    //     const post = document.querySelector(`[data-post-id=${id}]`);
    //     console.log(post);
    // }
    addPost() { }


    savePost() { }


    createElement(tag, [classes], text = '') {
        const element = document.createElement(tag);
        element.classList.add(...[classes]);
        element.innerText = text;
        return element;
    }
}


export default Card;