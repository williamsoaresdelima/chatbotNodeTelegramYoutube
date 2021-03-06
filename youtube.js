const YouTube = require('youtube-node');
const config = require('./yt-config');

const youtube = new YouTube();

youtube.setKey(config.key);

function searchVideo(message, queryText){
    return new Promise((resolve, reject)=>{
        
        youtube.search(`'programação node ${queryText}'`, 2, function(error,result){
            if(!error){
                console.log(JSON.stringify(result),null,2);
                const videosIds = result.items.map((item)=>
                                    item.id.videoId)
                                    .filter(item => item);
                const youtubeLinks = videosIds.map(videoId =>`https://www.youtube.com/watch?v=${videoId}`);
                resolve(`${message} ${youtubeLinks.join(`, `)}`);

            }else{
                console.log('errooooo!');
                reject('erro');
            }
        });
    });
};

module.exports.searchVideo = searchVideo;