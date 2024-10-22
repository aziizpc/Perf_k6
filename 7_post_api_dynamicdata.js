// Generating Random String (Dynamic Payload)

import http from 'k6/http'
import { check } from 'k6'                  // Required for doing test validations
import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.0.1/faker.min.js' // Faker Library

export const options = {
    vus: 5,
    duration: '2s'
}

const url = "https://reqres.in/api/users"

const payload = {
    "name" : faker.name.findName(),     // This is the command to get name. There are others for Emails and all.
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