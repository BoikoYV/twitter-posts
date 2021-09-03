
class Card {
    constructor(url, requestsObj) {
        this.requestsObj = requestsObj;
        this.url = url;
        this.list = document.querySelector('.posts');
    }

    async getUsers() {
        const users = await this.requestsObj.makeRequest(`${this.url}/users`)
        this.users = users;
        console.log(users);
    }

    async getPosts() {
        const posts = await this.requestsObj.makeRequest(`${this.url}/posts`)
        return posts;
    }

    async showPostsList() {
        this.getUsers();
        this.getPosts().then(posts => {
            console.log(posts);

            posts.forEach(({ userId, body, title }) => {
                const { name, username, email } = this.users.find(user => user.id === userId);
                this.renderPost(userId, name, username, body, title, email);
            })
        });

        return;
    }

    renderPost(userId, name, lastName, body, title, email) {
        const post = this.createElement('li', ['post__item']);
        post.innerHTML = `
            <img class="user-photo" src="./img/${userId}.jpeg" alt="user photo">
            <p class="post__user-name">${name} ${lastName}</p>
            <p class="post__user-email">${email}</p>
            <h3 class="post__title">${title}</h3>
            <p class="post__text">${body}</p>
        `;

        const buttonsBox = this.createElement('div', ['post__buttons']);
        const updateBtn = this.createElement('button', ['post__update-btn'], 'Edit');
        const deleteBtn = this.createElement('button', ['post__delete-btn'], 'Delete');
        buttonsBox.append(updateBtn, deleteBtn);
        post.append(buttonsBox);
        this.list.append(post);

        this.updateBtn = updateBtn;
        this.deleteBtn = deleteBtn;
    }

    deletePost() {
        this.deleteBtn.addEventListener('click', () => {

        })
    }

    addPost() { }

    updatePost() { }

    createElement(tag, [classes], text = '') {
        const element = document.createElement(tag);
        element.classList.add(...[classes]);
        element.innerText = text;
        return element;
    }
}


export default Card;