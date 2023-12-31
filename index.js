document.addEventListener("DOMContentLoaded", async ()=> {
    setupNewMatchup()
})

let opt1 = document.querySelector("#option1")
let opt2 = document.querySelector("#option2")

document.querySelector("#skip-btn").addEventListener("click", setupNewMatchup)

async function setupNewMatchup(){
    matchup = await $.get("[2a02:8109:9f11:aa00:5b1f:7c3b:7a73:1173]:5000/matchup")
    console.log(matchup)
    opt1.innerText = matchup[0][1]
    opt1.setAttribute("data-uuid", matchup[0][0])

    opt2.innerText = matchup[1][1]
    opt2.setAttribute("data-uuid", matchup[1][0])
}

function selectWinner(sender) {
    url = "[2a02:8109:9f11:aa00:5b1f:7c3b:7a73:1173]:5000/handle"
    data = {
        winner: sender.dataset["uuid"],
        loser: ""
    }
    if (sender == opt1) {
        data.loser = opt2.dataset["uuid"]
    }
    else {
        data.loser = opt1.dataset["uuid"]
    }
    $.post(url, data)
    setupNewMatchup()
}
