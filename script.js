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
    var res = await fetch(`https://api-nba-v1.p.rapidapi.com/games?date=${year}-${month}-${day}`, options)
        .catch(err => console.error(err));

    var data = await res.json();
    loadTableData(data.response)
}

function loadTableData(response){
    tableData = []

    for(item of response){

        var homeTeam = item.teams.home.name;
        var awayTeam = item.teams.visitors.name;
        
        homeTeam = homeTeam.replace(/\s+/g, '-').toLowerCase();
        awayTeam = awayTeam.replace(/\s+/g, '-').toLowerCase();

        tableData.push({team1: `${item.teams.home.name}`, score1: `${item.scores.home.points}`, team1Img: `team-logos/${homeTeam}.png`, team2: `${item.teams.visitors.name}`, score2: `${item.scores.visitors.points}`, team2Img: `team-logos/${awayTeam}.png`})
    }

     for (item of tableData){
        console.log(item)
        console.log(item.score1)
        if(item.score1 == 'null' || item.score2 == 'null'){
            console.log("worked")
            item.score1 = '-'
            console.log(item.score1)
            item.score2 = '-'
        }
    }
    

    console.log(tableData)

    const tableBody = document.getElementById('tableData');
    let data = '';

    for (item of tableData) {
        data += `<tr><td class = "left">${item.team1} <img src=${item.team1Img}></td><td> ${item.score1} </td><td> ${item.score2} </td><td class="right"><img src=${item.team2Img}>  ${item.team2}</td></tr>`;
    }

    console.log(data)

    tableBody.innerHTML = data;
}