const getLeadersArray = () =>{
    return fetch(`http://localhost:3000/leaders`)
          .then(resp => resp.json())
          .then(leaderboard => addLeaders(leaderboard))
}
// const leaderboard = 
// [{"name":"Tim", "score":80}, 
// {"name":"Deji", "score":65}, 
// {"name":"John", "score":33}, 
// {"name":"hhh", "score":24}, 
// {"name":"Harry", "score":0}] 
const leadertable = document.createElement("table")
leadertable.className = "leaderboard"
leadertable.cellspace= 0
body = document.querySelector("body")
body.appendChild(leadertable)


const addALeader = (player) => {
    const tr = document.createElement('tr')
    tr.innerHTML =`<td>${player.name}</td><td>${player.score}</td>`
    leadertable.appendChild(tr)
}

const addLeaders = leaders => {
    leadertable.innerHTML =""
    const header = document.createElement("tr")
    header.innerHTML = '<th>Player</th><th>High <br> Score</th>'
    leadertable.appendChild(header)
    for (const leader of leaders)
    addALeader(leader)
}

getLeadersArray()
