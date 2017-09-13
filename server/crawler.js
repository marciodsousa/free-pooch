var request = require('request');
var srequest = require('sync-request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var fs = require('fs');
var path = require('path');
var phantom = require("phantom");
  var $ = cheerio.load(fs.readFileSync('meusres.html')); // equivalent to http://www.meusresultados.com/futebol/portugal/primeira-liga-2015-2016/resultados/ but with all games displayed "Mostrar mais jogos"
  var fixtures = [];
  var finalStatsHomeTeam =  [];
  fs.writeFile('dataLiga.txt', '');
  $('#fs-results table tr').each(function( index ) {
    var round = $(this).find('td[colspan=6]').text().trim();
    var home = $(this).find('td > span.padr').text().trim();
    var away = $(this).find('td > span.padl').text().trim();
    var score = $(this).find('td.cell_sa').text().trim();
    var matchId = $(this).attr('id');
    if(matchId)
    var id = matchId.substring(4);
    var  finalStatsHomeTeam = [], finalStatsAwayTeam= [];
    if(home && away && score){
    fs.appendFileSync('dataLiga.txt', "Home: " +home + ' |'+score+'| ' + away +'\n'+'id: '+id+'\n');
        var homeStats= getFixturesStats2(id,1);
        var awayStats= getFixturesStats2(id,2);
    fixtures[fixtures.length-1].matches.push({homeTeam: home, awayTeam: away, score: score, matchId: id, homeTeamStats:homeStats,  awayTeamStats:awayStats});
    }
    if(round){
      fs.appendFileSync('dataLiga.txt', "Round: " +round+'\n');
      fixtures.push({fixture: round, matches : []});
    }
  });


fs.writeFile('dataLigaJson.txt', '');
fs.appendFileSync('dataLigaJson.txt', JSON.stringify(fixtures, null, 4));

function getFixturesStats2(matchId, isHomeTeam) {

    var statsName = ["Possession", "GoalAttempts", "ShotsOnTarget", "ShotsMissedTarget", "Corners", "Offsides", "GoalKeeperDefenses","Fouls","YelllowCards", "RedCards"];
    var i = 0;
    var stats ={};

    var res = srequest('GET', 'http://d.meusresultados.com/x/feed/d_st_' +matchId + '_pt_1', {
    headers: {"X-Fsign":"SW9D1eZo", "Referer":'http://d.meusresultados.com/x/feed/proxy', 'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
        'X-ClientIP':'1', 'X-GeoIP':'1', 'X-Requested-With':'XMLHttpRequest'}
    });

    var body = res.getBody('utf8');

    var $ = cheerio.load(body);

    $('#tab-statistics-0-statistic table tr').each(function( index ) {
        var stat = null;
        if(isHomeTeam ==1) {
            stat = $(this).find('td.summary-vertical.fl > div:nth-child(' + isHomeTeam + ')').text().trim();
        }else{
            stat = $(this).find('td.summary-vertical.fr > div:nth-child(' + isHomeTeam + ')').text().trim();
        }
        var obj = {};
        var nume = statsName[i];
        stats[nume] = stat;
        i++;
      });

    return stats;
}


function getFixturesStats(fixture) {
  
var statsName = ["Possession", "GoalAttempts", "ShotsOnTarget", "ShotsMissedTarget", "Corners", "Offsides", "GoalKeeperDefenses","Fouls","YelllowCards", "RedCards"];
var i = 0;
var stats =[];
var reqOptions = {
        url: 'http://d.meusresultados.com/x/feed/d_st_' + fixture.matches[0].id + '_pt_1',
        headers: {"X-Fsign":"SW9D1eZo", "Referer":'http://d.meusresultados.com/x/feed/proxy', 'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
        'X-ClientIP':'1', 'X-GeoIP':'1', 'X-Requested-With':'XMLHttpRequest'}
    };
 request(reqOptions, function(error, response, body, id ) {

        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            $('#tab-statistics-0-statistic table tr').each(function( index ) {
            var stat = $(this).find('td.summary-vertical.fl > div:nth-child(1)').text().trim();
            stats[statsName[i]] = stat;
            if (i==7)
            {
             fixture.matches[0].finalStatsHomeTeam[statsName[i]] = stat;
            }
            i++;


 
  });
        } else console.log('err'+error)
    });  
};

