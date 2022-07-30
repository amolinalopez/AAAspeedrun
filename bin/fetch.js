// faire une boucle for
//     requete axios ---> incrementer offset
//     --->stocker resultat dans une variable json
// dumper json dans un fichier (utiliser "filewritesync")

const axios=require('axios')
const fs=require("fs")


function fetch(){
    let json = []

    const promises = []

    for(let i=0;i<=1;i++){
        const p = axios.get(`https://speedrun.com/api/v1/runs?offset=${i*20}&max=5&status=verified&orderby=verify-date&direction=desc`)
            .then((response)=>{
                for (let j=0;j<5;j++){
                    json.push(response.data.data[j])
                    
                }
            })
        promises.push(p)
    }

    Promise.all(promises).then(function () {
        fs.writeFileSync('../runs.json',JSON.stringify(json))
    }).catch(err => {
        console.log(err)
        throw err
    })
    //
    // qd toutes les requetes auront repondues => fileWriteSync la var json dans un fichier
    //

}


fetch()
