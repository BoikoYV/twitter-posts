
class Api {

    async getData(baseUrl) {
        return await fetch(`${baseUrl}`)
            .then((response) => {
                return this.checkResponse(response)
            })
    }

    async deleteData(baseUrl) {
        return await fetch(`${baseUrl}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                if (!response.ok) throw new Error('Server Error');
                // return this.checkResponse(response)
            })
    }

    async updateData(baseUrl, objData) {
        return await fetch(`${baseUrl}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(objData)
        })
            .then((response) => {
                return this.checkResponse(response)
            })
    }

    async sendData(baseUrl, objData) {
        return await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(objData)
        })
            .then((response) => {
                return this.checkResponse(response)
            })
    }


    checkResponse(response) {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Server Error')
        }
    }

}



export default Api;