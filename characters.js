import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import { PerformanceObserverEntryList } from 'perf_hooks';
/**
 *
 * @param {string[]} pathSegments
 * @param {http.IncomingMessage} request
 * @param {http.ServerResponse} response
 */
export async function handleCharactersRoute(pathSegments, request, response){
    let nextSegment = pathSegments.shift();

    let judyHopps = {
        "name": "Judy Hopps",
        "species": "rabbit",
        "gender": "F",
        "occupation": "police officer",
        "personalityTraits": [
            "energetic",
            "overconfident",
            "perky",
            "heroic",
            "self-righteous",
            "optimistic",
            "intelligent",
            "persistent",
            "ambitious",
            "enthusiastic",
            "diligent",
            "idealistic",
            "loyal",
            "selfless",
            "caring",
            "forgiving",
            "courageous"
        ]
    };

    let leodoreLionheart = {
        "name": "Leodore Lionheart",
        "species": "lion",
        "gender": "M",
        "occupation": "mayor",
        "personalityTraits": [
            "charismatic",
            "prideful",
            "blustery",
            "commanding",
            "gruff",
            "practical",
            "intelligent",
            "noble",
            "inspiring",
            "occasionally sarcastic",
            "somewhat smarmy",
            "pompous",
            "dismissive",
            "neglectful"
        ]
    };

    

    if(!nextSegment){
        if (request.method !== 'GET'){
            response.writeHead(405, {'Content-Type': 'text/plain'});
            response.write('405 Method Not Allowed');
            response.end();
            return;
        }


        // let linksString = '';
        // for(let i = 0; i < links.length; i++){
        //     let linkObj = links[i];
        //     linksString += '<li><a href="' + linkObj.link + '">' + linkObj.text + '</a></li>';
        // }

        //let template = (await fs.readFile('templates/menu.volvo')).toString();

        // template = template.replaceAll('%{menuLinks}%', linksString);

        // response.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
        // response.write(template);
        // response.end();
        // return;
    }

    if (nextSegment === 'judyHopps'){
        if(pathSegments.length > 0){
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('404 Not Found');
            response.end();
            return;
        }
        if (request.method !== 'GET'){
            response.writeHead(405, {'Content-Type': 'text/plain'});
            response.write('405 Method Not Allowed');
            response.end();
            return;
        }

        let template = (await fs.readFile('template/judyhopps.volvo')).toString();

        template = template.replaceAll('%{name}%', judyHopps.name);
        template = template.replaceAll('%{species}%', judyHopps.species);
        template = template.replaceAll('%{gender}%', judyHopps.gender);
        template = template.replaceAll('%{occupation}%', judyHopps.occupation);
        


        let personalityTraitsString = '';
        for (let i = 0; i <judyHopps.personalityTraits.length; i++){
            personalityTraitsString += '<li>' + judyHopps.personalityTraits[i] + '</li>';
        }
        template = template.replaceAll('%{personalityTraits}%', personalityTraitsString);

        response.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
        response.write(template);
        response.end();
        return;
    }

    if (nextSegment === 'leodoreLionheart'){
        if(pathSegments.length > 0){
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('404 Not Found');
            response.end();
            return;
        }
        if (request.method !== 'GET'){
            response.writeHead(405, {'Content-Type': 'text/plain'});
            response.write('405 Method Not Allowed');
            response.end();
            return;
        }

        let template = (await fs.readFile('template/leodoreLionheart.volvo')).toString();

        template = template.replaceAll('%{name}%', leodoreLionheart.name);
        template = template.replaceAll('%{species}%', leodoreLionheart.species);
        template = template.replaceAll('%{gender}%', leodoreLionheart.gender);
        template = template.replaceAll('%{occupation}%', leodoreLionheart.occupation);
        


        let personalityTraitsString = '';
        for (let i = 0; i <leodoreLionheart.personalityTraits.length; i++){
            personalityTraitsString += '<li>' + leodoreLionheart.personalityTraits[i] + '</li>';
        }
        template = template.replaceAll('%{personalityTraits}%', personalityTraitsString);

        response.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
        response.write(template);
        response.end();
        return;
    }

    // if (nextSegment === 'meat'){
    //     if(pathSegments.length > 0){
    //         response.writeHead(404, { 'Content-Type': 'text/plain' });
    //         response.write('404 Not Found');
    //         response.end();
    //         return;
    //     }
    //     if (request.method !== 'GET'){
    //         response.writeHead(405, {'Content-Type': 'text/plain'});
    //         response.write('405 Method Not Allowed');
    //         response.end();
    //         return;
    //     }

    //     let template = (await fs.readFile('templates/submenu.volvo')).toString();
    //     template = template.replaceAll('%{menuTitle}%', 'Köttmeny');
    //     template = template.replaceAll('%{menuDescription}%', 'KÖTT MMMMM');

    //     response.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
    //     response.write(template);
    //     response.end();
    //     return;
    // }

    // if (nextSegment === 'dog'){
    //     if(pathSegments.length > 0){
    //         response.writeHead(404, { 'Content-Type': 'text/plain' });
    //         response.write('404 Not Found');
    //         response.end();
    //         return;
    //     }
    //     if (request.method !== 'GET'){
    //         response.writeHead(405, {'Content-Type': 'text/plain'});
    //         response.write('405 Method Not Allowed');
    //         response.end();
    //         return;
    //     }

    //     let template = (await fs.readFile('templates/submenu.volvo')).toString();
    //     template = template.replaceAll('%{menuTitle}%', 'Hundmeny')
    //     template = template.replaceAll('%{menuDescription}%', 'Mat för/hundar')

    //     response.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
    //     response.write(template);
    //     response.end();
    //     return;
    // }

    // if (nextSegment === 'fish'){
    //     if(pathSegments.length > 0){
    //         response.writeHead(404, { 'Content-Type': 'text/plain' });
    //         response.write('404 Not Found');
    //         response.end();
    //         return;
    //     }
        // if (request.method !== 'GET'){
        //     response.writeHead(405, {'Content-Type': 'text/plain'});
        //     response.write('405 Method Not Allowed');
        //     response.end();
        //     return;
        // }

        // let template = (await fs.readFile('templates/submenu.volvo')).toString();
        // template = template.replaceAll('%{menuTitle}%', 'Fiskmeny')
        // template = template.replaceAll('%{menuDescription}%', 'här hittar du vår FISKMENY!!')

        // response.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
        // response.write(template);
        // response.end();
        // return;
    //}

    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('404 Not Found');
    response.end();
    return;
}