
class Api {

    async makeRequest(baseUrl, requestParams = {}) {
        return await fetch(`${baseUrl}`, requestParams)
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