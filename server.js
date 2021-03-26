//// Basic server

const   http = require('http')
        ,monModuleGet =  require('./module-get')
;

// console.log(process.argv);
const tousLesArgs       = [ ...process.argv ];
const port              = tousLesArgs[2];
const publicFolderPath  = `./public/_boilerplate`;

// console.log(`Go clic : http://localhost:${port}/`);

const server = http.createServer((request, response) => {
    const myURL = new URL(request.url, `http://${request.headers.host}/`);
    console.log("myURL", myURL);

    // Par défaut on renvoie la page HTML
    if(myURL.pathname === '/') {
        // Comme on passe par fs.readFile (en asynchrone)
        // On a pas de retour et on doit donc passer par un callback de merde
        // EN GROS c'est compliqué de faire remonter les data pour les mettre dans la response http
        //      Du coup je fais descendre la reponse http
        monModuleGet(`${publicFolderPath}/index.html`, response);
    }
    // sinon on fait le passe plat (le mec demande "style.css" > je lui envoie "style.css" #braindead)
    else {
        // On renvoie le fichier demandé MAY en tapant dans le dossier ouksé rangé pour pas foutre le bordel
        // ex : './public/_boilerplate/favicon.ico'
        monModuleGet(`${publicFolderPath}${myURL.pathname}`, response);
    }

    // Ensuite on traite ce que l'on renvoi en fonction des types de fichier
})
server.listen(port);