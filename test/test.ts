import fetch from 'node-fetch'

const port = require('../config.json').expressPort
const content = JSON.stringify(require('./test_valid.json'))

async function test() {
    console.log(content)
    await fetch(
        `http://localhost:${port}/lfg`,
        {
            method: 'POST',
            body: content,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res: any) => {
            if (!res.ok) {
                console.log(res)
            }
        })
}

test()