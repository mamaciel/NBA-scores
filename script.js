getAPI();
//window.onload = () => {
    //loadTableData();
//};

async function getAPI() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e604efca67mshfd71a9503b3a366p1a753fjsne35759d5a9aa',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };
    var res = await fetch('https://api-nba-v1.p.rapidapi.com/games?date=2022-11-16', options)
        .catch(err => console.error(err));

    var data = await res.json();
    console.log(data.response);
    
    loadTableData(data.response)
}

function loadTableData(response){
    tableData = []

    for(item of response){
        tableData.push({team1: `${item.teams.home.name}`, score1: `${item.scores.home.points}`, team2: `${item.teams.visitors.name}`, score2: `${item.scores.visitors.points}` })
    }

    for (item of tableData){
        if(item.score1 === null || item.score2 === null){
            item.score1 = '-'
            console.log(item.score1)
            item.score2 = '-'
        }
    }

    console.log(tableData)
    //let tableData = [
        //{ team1: 'Boston Celtics', score1: 100, team2: 'Oklahome City Thunder', score2: 98}
   //]

    const tableBody = document.getElementById('tableData');
    let data = '';

    for (item of tableData) {
        data += `<tr><td> ${item.team1} </td><td> ${item.score1} </td><td> ${item.score2} </td><td> ${item.team2}</td></tr>`;
    }

    console.log(data)

    tableBody.innerHTML = data;
}