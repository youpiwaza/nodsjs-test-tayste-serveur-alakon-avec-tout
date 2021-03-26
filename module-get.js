// On passe une url, si tu trouves le fichier côté serveur tu le renvoie direct au http
//      cf. 04-ma-premiere-ES-asynchrone-correction.js
const fs = require('fs');

function gonnaGetGet(urlFournie, responseFournieParHttp) {
    console.log(`gonnaGetGet(${urlFournie})`);

    // Asyc, du coup pas de return > on passe par un callback
    //      https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
    fs.readFile(
        urlFournie,
        'utf8', // Force String output
        (err, data) => {
            console.log("fs.readFile() > err :", err);
            console.log("fs.readFile() > data :", data);
        
            if (err)
                throw err;
            
            responseFournieParHttp.writeHead(200, { 'Content-Type': 'text/html' });
            // Correction du chemin sur le serveur
            return responseFournieParHttp.end(data);
            
        }
    );
}

module.exports = gonnaGetGet;