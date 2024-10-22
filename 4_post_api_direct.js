// Passing data directy as payload

import http from 'k6/http'
import { check } from 'k6'                  // Required for doing test validations

export const options = {
    vus: 5,
    duration: '2s'
}

const url = "https://reqres.in/api/users"

const payload = {
    "name" : "Abdul Azeez",
    "job" : "QA"
}

export default function () {
    const response = http.post(url, payload)
    console.log("*** Printing the Payload ***", payload)
    console.log("*** Printing the Response ***", response.body)
    check(response, {
        'Status Code Validation': (response) => response.status === 201,        // Validates the response code
        'Response ID Validation': (response) => response.body.includes ('id')}) // Validates 'id' key is present in response
}