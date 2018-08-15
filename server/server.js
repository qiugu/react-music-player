const express = require('express');
const superagent = require('superagent');
const charset = require('superagent-charset');
const cheerio = require('cheerio');

charset(superagent);
const app = express();
const baseUrl = 'http://music.taihe.com/';
// app.use('/',express.static('../index.tpl.html'));
const allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers','X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
};
app.use(allowCrossDomain);
app.get('/index',function(req,res){
    superagent.get(baseUrl + 'top/new')
        .charset('utf-8')
        .end(function(err,sres){
            let items = [];
            if(err){
                console.log('ERR:',err);
                res.json({code: 400,msg: err,sets: items});
            }
            let $ = cheerio.load(sres.text);
            $('.normal-song-list ul li').each(function (index,item) {
               let $element = $(item);
               let $cover = 'http://oeff2vktt.bkt.clouddn.com/image/50.jpg';
               let $title = $element.find('span.song-title a').attr('title');
               let $file = baseUrl + $element.find('span.song-title a').attr('href');
               let $artist = $element.find('span.singer span').attr('title');
               // console.log($cover);
               // console.log($title);
               // console.log($file);
               // console.log($artist);
               items.push({
                   id: index + 1,
                   cover: $cover,
                   title: $title,
                   file: $file,
                   artist: $artist
               })
            });
            res.json({code: 200,msg: 'ok',data: items});
        });
});

const server = app.listen(8081,function () {
   let host = server.address().address;
   let port = server.address().port;
   console.log('地址链接为 http://%s:s%', host, port);
});