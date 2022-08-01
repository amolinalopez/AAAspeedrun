const axios = require('axios')
const fs = require("fs")


function fetch() {
    const json=[]
    const promises = []
    const p = axios.get(`https://www.speedrun.com/api/v1/platforms?max=200`)
        .then((response) => {
            for (let j = 0; j < 200; j++) {
                json.push(response.data.data[j])

            }
        })
    promises.push(p)

    Promise.all(promises).then(function () {
        const dstPath = __dirname + '/../data/platforms.json'
        console.log('json.length:', json.length, dstPath)
        fs.writeFileSync(dstPath, JSON.stringify(json, null, 4))
    }).catch(err => {
        console.log(err)
        throw err
    })

}


fetch()