
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