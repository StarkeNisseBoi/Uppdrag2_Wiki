import http from 'http';
import fs from 'fs/promises'

/**
 * 
 * @param {string[]} pathSegments 
 * @param {http.IncomingMessage} request 
 * @param {http.ServerResponse} response 
 */


export async function handlestaticFileRequest(pathSegments, request, response){
    if (request.method !== 'GET'){
        response.writeHead(405, {'content-type': 'text/plain'});
        response.write('405 Method Not Allowed');
        response.end();
        return;
    }

    let fileName = pathSegments[pathSegments.length - 1];
    let dotIndex = fileName.lastIndexOf('.');



    if(dotIndex === -1){
        response.writeHead(400, { 'Content-Type': 'text/plain' });
        response.write('400 Bad Request');
        response.end();
    }

    let ext = fileName.substring(dotIndex + 1);

    let mimeType;
    if (ext === 'ext') {
        mimeType = 'text/plain;charset=UTF-8';
    } else if (ext === 'html'){
        mimeType = 'text/html;charset=UTF-8';
    } else if (ext === 'css'){
        mimeType = 'text/css;charset=UTF-8';
    }else if (ext === 'png'){
        mimeType = 'image/png';
    } else if (ext ==='JPG'|| ext === 'JPEG') {
        mimeType = 'image/jpeg';    
    } else if(ext === 'SVG'){
        mimeType = 'image/svg+xml';
    }  else if(ext === 'MP4'){
        mimeType = 'video/mp4';
    } else {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.write('500 Internal Server Error');
        response.end();

    }

    let filePath = pathSegments.join('/');

    let fileContents;

    try{
        fileContents = await fs.readFile('public/' + filePath);
    }catch (err){
        if (err.code === 'ENOENT'){
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('404 Not Found');
            response.end();
            return;
        } else{
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.write('500 Internal Server Error');
            response.end();
            return;
        }
    }
    

    response.writeHead(200, { 'Content-Type': mimeType });
    response.write(fileContents);
    response.end();
    //index.html
}