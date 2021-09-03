class User {
    constructor(url, requestsObj) {
        this.requestsObj = requestsObj;
        this.url = url;
    }

    async getUsers() {
        const users = await this.requestsObj.makeRequest(`${this.url}/users`)

        console.log(users);
    }
}

export default User;