import axios from 'axios'

export function getAccountHighscores(account) {
    console.log('Get highscores for ' + account);
    axios.get('/api/account/' + account + '/highscores').then(function (data) {
        console.log(data.data); // Need to paginate this...
    });
}
