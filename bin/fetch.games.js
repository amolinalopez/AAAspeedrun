const axios=require('axios')
const fs=require("fs")


function fetch(){
    let json = []

    const promises = []

    for(let i=0;i<=30;i++){
        const p = axios.get(`https://www.speedrun.com/api/v1/games?offset=${i*1000}&max=1000&orderby=released&direction=desc`)
        
       
            .then((response)=>{
                for (let j=0;j<1000;j++){
                    json.push(response.data.data[j])
                    
                }
            })
        promises.push(p)
    }

    Promise.all(promises).then(function () {
        const dstPath = __dirname+'/../data/games.json'
        console.log('json.length:',json.length, dstPath)
        fs.writeFileSync(dstPath, JSON.stringify(json, null, 4))
    }).catch(err => {
        console.log(err)
        throw err
    })

}


fetch()