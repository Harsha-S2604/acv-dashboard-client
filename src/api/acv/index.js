const acvApi = {
    getAcvByType: async (type) => {
        const serverURL = `http://localhost:3000/acv/${type}`
        const headers = {
            method: "GET"
        }
        const response = await fetch(serverURL, headers)
        const result = await response.json()
        return result
    },

    getAcv: async () => {
        const serverURL = `http://localhost:3000/acv/`
        const headers = {
            method: "GET"
        }
        const response = await fetch(serverURL, headers)
        const result = await response.json()
        return result
    }
}

export default acvApi