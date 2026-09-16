// My Game Shelf — site behavior
// Your collection is stored in games.json. This file handles the interface.
let games = [];

async function loadGames(){
 try {
  const response = await fetch("games.json");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  games = await response.json();
  render();
 } catch(error) {
  console.error("Could not load games.json:", error);
  const grid = document.getElementById("games");
  if (grid) grid.innerHTML = '<div class="empty-state"><h2>Couldn’t load the collection</h2><p>Make sure <code>games.json</code> is in the same folder as <code>index.html</code>.</p></div>';
 }
}

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
loadGames();
