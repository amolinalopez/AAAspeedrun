// faire une boucle for
//     requete axios ---> incrementer offset
//     --->stocker resultat dans une variable json
// dumper json dans un fichier (utiliser "filewritesync")

const axios=require('axios')
const fs=require("fs")


function fetch(){
for(let i=0;i<=40;i+=20){
    axios.get(`https://speedrun.com/api/v1/runs?offset=${i}&max=5&status=verified&orderby=verify-date&direction=desc`)
        .then((response)=>{
            let json = response.data.data
            console.log(json)
            fs.writeFileSync('../runs.json', `${json}`)
        })
        .catch(err=>{
            console.log('error:',err)
        })
}}

fetch()
