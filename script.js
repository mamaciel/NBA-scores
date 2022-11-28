// ADD FUNCTION RECURRING API UPDATE EVERY 1MIN OR SO


getAPI();
//window.onload = () => {
    //loadTableData();
//};

async function getAPI() {

    const date = new Date();
    let day = date.getDate() + 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e604efca67mshfd71a9503b3a366p1a753fjsne35759d5a9aa',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };
    var res = await fetch(`https://api-nba-v1.p.rapidapi.com/games?date=${year}-${month}-26`, options)
        .catch(err => console.error(err));

    var data = await res.json();
    loadTableData(data.response)
}

function loadTableData(response){
    tableData = []
    console.log(response)
    for(item of response){

        var homeTeam = item.teams.home.name;
        var awayTeam = item.teams.visitors.name;
        
        homeTeam = homeTeam.replace(/\s+/g, '-').toLowerCase();
        awayTeam = awayTeam.replace(/\s+/g, '-').toLowerCase();


        tableData.push({gameTime: `${item.date.start}`, status: `${item.status.long}`, quarter: `${item.periods.current}`, team1: `${item.teams.home.name}`, score1: `${item.scores.home.points}`, team1Img: `team-logos/${homeTeam}.png`, team2: `${item.teams.visitors.name}`, score2: `${item.scores.visitors.points}`, team2Img: `team-logos/${awayTeam}.png`})
    }

    const tableBody = document.getElementById('tableData');
    let data = '';

     for (item of tableData){
        var period = item.quarter
        var status = item.status
        var time = item.gameTime;
        time = new Date(time).toLocaleTimeString('en', { timeStyle: 'short', hour12: true, timeZone: 'EST' });

        if(item.score1 == 'null' || item.score2 == 'null'){
            console.log("worked")
            item.score1 = '-'
            console.log(item.score1)
            item.score2 = '-'
            data += `<tr>
            <td class = "left" rowspan="2">${item.team1} <img src=${item.team1Img}></td>
            <td>${time}</td>
            <td>EST</td>
            <td class="right" rowspan="2"><img src=${item.team2Img}> ${item.team2}</td>
            </tr>
            
            <tr>
            <td class="period" colspan="2"><img src = images/clock.png></td>
            </tr>`;
        }

        else if (status == 'Finished'){
            data += `<tr>
            <td class="left" rowspan="2"> ${item.team1} <img src=${item.team1Img}></td>
            <td> ${item.score1} </td>
            <td> ${item.score2} </td>
            <td class="right" rowspan="2"> <img src=${item.team2Img}>  ${item.team2}</td>
            </tr>

            <tr>
            <td class="period" colspan="2">Final</td>
            </tr>`;
        }

        else{
            data += `<tr>
            <td class="left" rowspan="2"> ${item.team1} <img src=${item.team1Img}></td>
            <td> ${item.score1} </td>
            <td> ${item.score2} </td>
            <td class="right" rowspan="2"> <img src=${item.team2Img}>  ${item.team2}</td>
            </tr>

            <tr>
            <td class="period" colspan="2">${period}TH QR</td>
            </tr>`;
        }
    }

    tableBody.innerHTML = data;
}