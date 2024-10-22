// Passing data from file

import http from 'k6/http'
import { check } from 'k6'                  // Required for doing test validations

export const options = {
    vus: 5,
    duration: '2s'
}

const url = "https://reqres.in/api/users"

const data = open('./5_post_payload.json')

export default function () {
    const response = http.post(url, data)
    console.log("*** Printing the Payload ***", data)
    console.log("*** Printing the Response ***", response.body)
    check(response, {
        'Status Code Validation': (response) => response.status === 201,        // Validates the response code
        'Response ID Validation': (response) => response.body.includes ('id')}) // Validates 'id' key is present in response
}