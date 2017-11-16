import axios from 'axios'
import Promise from 'bluebird'
import _ from 'lodash'

function getHighscoresPage(account, page) {
    return axios.get('/api/account/' + account + '/highscores', {
        params: {
            page: page
        }
    }).then(function (data) {
        return data.data;
    });
}

export function getAccountHighscores(account) {
    console.log('Get highscores for ' + account);
    const firstPage = Promise.try(() => {
        return getHighscoresPage(account, 1);
    });
    const extraPages = firstPage.then(data => {
        const currentPage = data.meta.current_page;
        const lastPage = data.meta.last_page;
        if (lastPage <= currentPage) {
            return []
        }
        return _.range(currentPage + 1, lastPage + 1);
    }).map(page => {
        return getHighscoresPage(account, page);
    }, {concurrency: 1});
    return Promise.all([firstPage, extraPages]).spread((first, extra) => {
        extra.unshift(first);
        return extra;
    }).map(page => {
        return page.data
    }).reduce((reduced, pages) => {
        return reduced.concat(pages);
    })
}
