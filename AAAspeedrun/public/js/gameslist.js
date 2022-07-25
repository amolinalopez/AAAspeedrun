import axios from 'axios';

axios({
  method: 'GET',
  url: 'https://www.speedrun.com/api/v1/games',
})
  .then(response => {

    console.log(response.data)

  })

  .catch(err => {

    console.log('error:',err)
    next(err)

  });
