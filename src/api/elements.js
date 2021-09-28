import {HTTP} from './common'

export const GetData = {
    async post(config) {
        console.log(config)
        return HTTP.post('/get_data/',config).then(response => {
            console.log(response)
            return response.data
        })
    },
}

