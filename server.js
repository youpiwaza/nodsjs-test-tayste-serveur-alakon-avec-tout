//// Basic server

const http = require('http');

// console.log(process.argv);
const tousLesArgs = [ ...process.argv ];
const port        = tousLesArgs[2];

// console.log(`Go clic : http://localhost:${port}/`);

const server = http.createServer((request, response) => {
    const myURL = new URL(request.url, `http://${request.headers.host}/`);
    // console.log(myURL);

    // ATTENTION, classe dédiée à l'utilisation des trucs dans GET ( machin.com?ceTruc=La)
    //       https://nodejs.org/docs/latest-v14.x/api/url.html#url_urlsearchparams_get_name
    // const maDateAuFormaInternational = myURL.searchParams.get('iso');

    // Sécurité
    return response.end(`fing`);
})
server.listen(port);