import http from 'k6/http'
import { check } from 'k6'                  // Required for doing test validations

export const options = {
    vus: 10,
    iterations: 20
}

const params = {                            // One way to declare parameters
    headers: {
        'Authorization': 'Bearer 737433476'
    }
}

let headers_api = {                         // The other way
    'Authorization': 'Bearer 535534'
}

const url ="https://gorest.co.in/public/v2/users/"

export default function () {

    const response = http.get(url, params)
    check(response, {
        'Status Code Validation': (response) => response.status === 200
    })

}