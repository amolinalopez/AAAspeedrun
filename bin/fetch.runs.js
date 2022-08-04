// faire une boucle for
//     requete axios ---> incrementer offset
//     --->stocker resultat dans une variable json
// dumper json dans un fichier (utiliser "filewritesync")

const axios=require('axios')
const fs=require("fs")


function fetch(){
    const promises = []

    for(let i=0;i<=49;i++){
        const p = axios.get(`https://speedrun.com/api/v1/runs?offset=${i*200}&max=200&status=verified&orderby=verify-date&direction=desc`)
            .then((response)=>{
                for (let j=0;j<200;j++){
                    json.push(response.data.data[j])
                    
                }
            })
        promises.push(p)
    }

    Promise.all(promises).then(function () {
        const dstPath = __dirname+'/../data/runs.json'
        console.log('json.length:',json.length, dstPath)
        fs.writeFileSync(dstPath, JSON.stringify(json, null, 4))
    }).catch(err => {
        console.log(err)
        throw err
    })

}


fetch()
