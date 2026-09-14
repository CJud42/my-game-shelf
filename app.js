const games = [
 {id:"boss-monster",name:"Boss Monster",players:[2,4],time:[20,30],difficulty:"Light",tags:["Card Game","Dungeon Building","Take That","Fantasy","Competitive"],cover:"assets/boss-monster.jpeg",video:"https://www.youtube.com/embed/d9FR-Z3ExWs",rules:"Build a side-scrolling dungeon to lure Heroes into your rooms. Each Room has Treasure that attracts particular Heroes and Damage that helps defeat them. During the adventure phase, Heroes move through your dungeon and either die, giving you Souls, or survive and give you Wounds. Reach 10 Souls to win, but reaching 5 Wounds eliminates you. The game is built around balancing an attractive dungeon with enough damage to survive the Heroes you lure."},
 {id:"air-land-sea-critters",name:"Air, Land & Sea: Critters at War",players:[2,2],time:[15,30],difficulty:"Medium",tags:["Card Game","Two Player","Tactical","Bluffing","Competitive"],cover:"assets/air-land-sea-critters.jpeg",video:"https://www.youtube.com/embed/3g6mY2u1VqU",rules:"Battle for control of three theaters: Air, Land, and Sea. Each player begins a battle with six cards and does not draw additional cards during that battle. Cards can be played face-up to use their tactical abilities or face-down as wild cards with strength 2. Continue playing cards or strategically withdraw. Victory points are awarded based on the battle result, and the first player to reach 12 victory points wins the war."},
 {id:"dice-throne",name:"Dice Throne",players:[2,6],time:[20,40],difficulty:"Medium",tags:["Dice","Card Game","Fighting","Fantasy","Competitive"],cover:"",video:"https://www.youtube.com/embed/AhMjkitJTgY",rules:"Choose a unique hero with a personal board, deck, and five custom dice. On your turn, manage status effects and combat points, play cards, then roll your dice up to three times to activate an offensive ability. Your opponent gets a defensive roll and may mitigate the attack. Upgrade abilities and manipulate dice with cards. Reduce your opponents to zero health; the last hero standing wins."}
];

const $=s=>document.querySelector(s);
const search=$("#search"), players=$("#players"), time=$("#time"), difficulty=$("#difficulty"), sort=$("#sort"), gamesEl=$("#games"), empty=$("#empty"), count=$("#count");
function matches(g){
 const q=search.value.toLowerCase().trim();
 return (!q || [g.name,...g.tags,g.difficulty].join(" ").toLowerCase().includes(q))
 && (!players.value || g.players[1]>=+players.value)
 && (!time.value || g.time[1]<=+time.value)
 && (!difficulty.value || g.difficulty===difficulty.value);
}
function render(){
 let list=games.filter(matches);
 if(sort.value==="time") list.sort((a,b)=>a.time[0]-b.time[0]);
 else if(sort.value==="players") list.sort((a,b)=>a.players[0]-b.players[0]);
 else list.sort((a,b)=>a.name.localeCompare(b.name));
 count.textContent=`${list.length} game${list.length===1?"":"s"}`;
 gamesEl.innerHTML=list.map(g=>`<article class="card">
  <div class="cover">${g.cover ? `<img src="${g.cover}" alt="${g.name} box art" loading="lazy">` : `<div class="cover-placeholder">${g.name}</div>`}</div>
  <div class="card-body"><h3>${g.name}</h3>
  <div class="meta"><span>👥 ${g.players[0]}–${g.players[1]}</span><span>⏱ ${g.time[0]}–${g.time[1]} min</span><span>${g.difficulty}</span></div>
  <div class="tags">${g.tags.slice(0,3).map(t=>`<span class="tag">${t}</span>`).join("")}</div>
  <button onclick="openGame('${g.id}')">View game →</button></div></article>`).join("");
 empty.hidden=!!list.length;
}
function openGame(id){
 const g=games.find(x=>x.id===id);
 const modal=document.createElement("div"); modal.className="modal open"; modal.id="modal";
 modal.innerHTML=`<div class="dialog"><div class="dialog-top"><strong>GAME DETAILS</strong><button class="close" onclick="closeGame()">×</button></div>
 <div class="detail"><div class="detail-grid"><div><div class="detail-cover">${g.cover ? `<img src="${g.cover}" alt="${g.name}">` : `<div class="cover-placeholder">${g.name}</div>`}</div></div>
 <div><h2>${g.name}</h2><div class="tags">${g.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
 <div class="facts"><div class="fact"><small>Players</small><strong>${g.players[0]}–${g.players[1]}</strong></div><div class="fact"><small>Play time</small><strong>${g.time[0]}–${g.time[1]} min</strong></div><div class="fact"><small>Difficulty</small><strong>${g.difficulty}</strong></div></div>
 <h3>General rules</h3><p class="rules">${g.rules}</p></div></div>
 <h3>How to play</h3><div class="video"><iframe src="${g.video}" title="How to play ${g.name}" allowfullscreen loading="lazy"></iframe></div>
 </div></div>`;
 document.body.appendChild(modal); modal.addEventListener("click",e=>{if(e.target===modal)closeGame()});
}
function closeGame(){document.getElementById("modal")?.remove()}
[search,players,time,difficulty,sort].forEach(x=>x.addEventListener("input",render));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeGame()});
render();
