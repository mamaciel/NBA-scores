getAPI();

async function getAPI() {

    const date = new Date();
    let day = date.getDate() + 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
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
        var period = item.quarter;
        var status = item.status;
        var time = item.gameTime;

        time = new Date(time).toLocaleTimeString('en', { timeStyle: 'short', hour12: true, timeZone: 'EST' });

        if (status == "Scheduled"){
            data += `<tr>
            <td class = "left" rowspan="2">${item.team1} <img src=${item.team1Img}></td>
            <td>${time} EST</td>
            <td class="right" rowspan="2"><img src=${item.team2Img}> ${item.team2}</td>
            </tr>
            
            <tr>
            <td class="period" colspan="1"><img src = images/clock.png></td>
            </tr>`;
        }

        else if (status == 'Finished'){
            data += `<tr>
            <td class="left" rowspan="2"> ${item.team1} <img src=${item.team1Img}></td>
            <td> ${item.score1}&emsp;&emsp;${item.score2}</td>
            <td class="right" rowspan="2"> <img src=${item.team2Img}>  ${item.team2}</td>
            </tr>

            <tr>
            <td class="period" colspan="1">Final</td>
            </tr>`;
        }

        else{
            data += `<tr>
            <td class="left" rowspan="2"> ${item.team1} <img src=${item.team1Img}></td>
            <td> ${item.score1}&emsp;&emsp;${item.score2}</td>
            <td class="right" rowspan="2"> <img src=${item.team2Img}>  ${item.team2}</td>
            </tr>`

            switch(period){

                case "1":
                    data += `<tr>
                <td class="period" colspan="1">${period}ST QTR</td>
                </tr>`;
                break;

                case "2":
                    data += `<tr>
                <td class="period" colspan="1">${period}ND QTR</td>
                </tr>`;
                break;

                case "3":
                    data += `<tr>
                <td class="period" colspan="1">${period}RD QTR</td>
                </tr>`;
                break;

                case "4":
                    data += `<tr>
                <td class="period" colspan="1">${period}TH QTR</td>
                </tr>`;

            } 
        }
    }

    var timeInterval = 60;
    var myInterval = setInterval(function(){
        document.getElementById("timer").innerHTML = "Refreshing stats in " + timeInterval + " seconds";
        timeInterval--;

        if(timeInterval < 0){
            clearInterval(myInterval);
            getAPI();
        }

    }, 1000)
    
    tableBody.innerHTML = data;
}
