const axios = require('axios')
const fs = require("fs")
const gamesData = require('../data/games.json')

const games = JSON.parse(JSON.stringify(gamesData))
gamesIDS = games.filter((el) => el).map((el) => { return el.id })
console.log(gamesIDS)
const dstPath = __dirname + '/../data/categories.json'
const iPath = __dirname + '/../data/i.json'

function fetch() {
    let json = JSON.parse(fs.readFileSync(dstPath, { encoding: 'utf-8' }))

    let i = JSON.parse(fs.readFileSync(iPath, { encoding: 'utf-8' })).value
    console.log("initial i=",i)
    function toto() {
        console.log(`bactch nº${i}`)

        if (i > 62) {
            clearInterval(int)
        }


        const promises = batch(i, json) // 100 permieres promises

        Promise.all(promises).then(function () {
            console.log('json.length:', json.length, dstPath)
            fs.writeFileSync(dstPath, JSON.stringify(json, null, 4))  
        }).catch(err => {
            console.log(err)
        })
        i++
        fs.writeFileSync(iPath, JSON.stringify({ value: i }, null, 4))
    }

    
    const int = setInterval(toto, 1000 * 65)
    toto()
}


function batch(l, json) {
    const promises = []

    for (let i = 100 * l; i < (l + 1) * 100; i++) {
        const url = `https://www.speedrun.com/api/v1/games/${gamesIDS[i]}/categories`
        console.log('batch url:', url)
        const p = axios.get(url)

            .then((response) => {
                for (let j = 0; j < response.data.data.length; j++) {
                    json.push(response.data.data[j])

                }
            })
            .catch((err) => {
                console.log("boom url:", url)
            })
        promises.push(p)

    }

    return promises
}


fetch()