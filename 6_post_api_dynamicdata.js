// Generating Random String (Dynamic Payload)

import http from 'k6/http'
import { check } from 'k6'                  // Required for doing test validations
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'  // This import is required

export const options = {
    vus: 5,
    duration: '2s'
}

const url = "https://reqres.in/api/users"

const payload = {
    "name" : randomString(8),               // Generate a random string od length 8
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