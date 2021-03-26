// On passe une url, si tu trouves le fichier côté serveur tu le renvoie direct au http
//      cf. 04-ma-premiere-ES-asynchrone-correction.js
const
    fileExtToContentType    = require('./fileExtToContentType')
    ,fs                     = require('fs')
    ,path                   = require('path')
;

function gonnaGetGet(urlFournie, responseFournieParHttp) {
    console.log(`gonnaGetGet(${urlFournie})`);

    // console.log(path.extname(urlFournie));
    const lExtensionDufichier   = path.extname(urlFournie);
    const contentType           = fileExtToContentType(lExtensionDufichier);

    // Asyc, du coup pas de return > on passe par un callback
    //      https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
    fs.readFile(
        urlFournie,
        'utf8', // Force String output
        (err, data) => {
            console.log("fs.readFile() > err :", err);
            // Voir les données passer en brut
            //      ATTENTION, les console log ralentissent les perfs x)
            // console.log("fs.readFile() > data :", data);
            
            // TODO: Gérer ici les 404 et autres joyeusetées?
            if (err)
                throw err;
            
            responseFournieParHttp.writeHead(200, { 'Content-Type': contentType });
            // Correction du chemin sur le serveur
            return responseFournieParHttp.end(data);
            
        }
    );
}

module.exports = gonnaGetGet;