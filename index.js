import 'dotenv/config';
import http from 'http';
import { handlestaticFileRequest } from './static-file-handler.js';
import { handleCharactersRoute } from './characters.js';
import { handleDiscussionRoute } from './discussion.js';

async function handleRequest(request, response){
    let url = new URL(request.url, 'http://' + request.headers.host);
    let path = url.pathname;
    let pathSegments = path.split('/').filter(function (segment){
        if (segment === '' || segment === '..'){
            return false;
        }else {
            return true;
        }
    });

    let nextSegment = pathSegments.shift();

    //rotändpunkt
    if(!nextSegment){
        response.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
        response.write(`
            <html>
                <head>
        
                </head>
                <body>
                    <h1>HEjHEJ välkommen</h1>
                </body>
        
            </html>
        `);
        response.end();
        return;
    }
    if (nextSegment === 'static'){
        await handlestaticFileRequest(pathSegments, request, response);
        return;
    }

    if(nextSegment === 'characters'){
        await handleCharactersRoute(pathSegments, request, response);
        return;
    }

    if(nextSegment === 'discussion'){
        await handleDiscussionRoute(pathSegments, request, response);
        return;
    }

    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('404 Not Found');
    response.end();
}

let server = http.createServer(handleRequest);

server.listen(process.env.PORT);