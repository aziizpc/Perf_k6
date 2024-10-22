import http from 'k6/http'

export const options = {
    vus: 2,
    iterations: 2,
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<200', 'p(90)<195', 'p(99)<300']      // We can give Single/ Multiple
    }
}

const url ="https://www.microsoft.com/"

export default function(){
    http.get(url)
}