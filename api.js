
class Api {

    makeRequest(baseUrl, requestParams = {}) {
        return fetch(`${baseUrl}`, requestParams)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Server Error')
                }
            })
    }

}



export default Api;