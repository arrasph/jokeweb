if(location.href.includes("#post")){
  location.href=location.href.split("#post")[0]
}
const comBox = document.getElementById("comments");
const contentBox = document.getElementById("post");
let sessionID=(Math.floor(Math.random()*(36**8))).toString(36);
function chkDevice(){
  let idType
  const UA=navigator.userAgent;
  if(UA.includes("Windows")){
    idType="0"
  }
  else if(UA.includes("Linux")){
    idType="0"
  }
  else if(UA.includes("Android")){
    const droids=["a","d","r"]
    idType=droids[Math.floor(Math.random()*droids.length)]
  }
  else if(UA.includes("iPhone")||UA.includes("iPad")){
    const iphones=["a","d","p","x"]
    idType=iphones[Math.floor(Math.random()*iphones.length)]
  }
  else {idType="H"}
  return idType
}
const device=chkDevice()
sessionID+=device;

let freq=5000
const params = new URLSearchParams(new URL(location.href).search);
if(params.get("f")){
  freq=Number(params.get("f"))
}
let theme=""
if(params.get("t")){theme=params.get("t")}
/*try{
  theme=decodeURI(location.href.split("?t=")[1].split("&")[0]);
   }catch{
     theme="無"
   }*/
let posts=1;
const themeBox=document.getElementById("theme")
params.get("i") ? themeBox.textContent=params.get("i") : themeBox.textContent=theme+"について語るスレ"
function getDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月は0始まりなので+1
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  const formattedDay = `${year}/${month}/${day} `
  let formattedTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;
  if(location.href.includes("dev")){
    formattedTime="00:00:00.006"
  }
  return formattedDay+formattedTime;
}
async function getip(){
  const res =await fetch("https://api.ipify.org/")
  const data=res.text()
  return data
}

let botIDs=[]
function botIDchk(){
  const r=Math.floor(Math.random()*100)
  let ID=undefined
  if(r<30-(posts/50)&&botIDs.length>=1){
    const idx=Math.floor(Math.random()*botIDs.length)
    ID=botIDs[idx]
  }
  return ID
}
async function newPost(name, content, bot=false) {
  if(content.length>400&&!bot){
    alert("レスが長すぎます！")
    return
  }
  const now=getDate();
  
  // bot name
  if(bot){
    const r=Math.floor(Math.random()*100)
      if(r<=10){
        let names=[
          "!omikuji",
          "!omikuji丼!dama",
          "#"+Math.random()*10
        ]
        const idx=Math.floor(Math.random()*names.length)
        name=names[idx]
      }
    }
  // name check
  name=name.replace("◆","◇");
  if(name.includes("#")){
    const saveMe=name.split("#")[0]
    const tripcode=name.split("#")[1];
    const res=getCode(tripcode);
    name=saveMe+"◆"+res;
  }
  name=name.replace("<","&lt;").replace(">","&gt;")
  if(name.includes("!omikuji")){
    const kujis=[
      "【大吉】",
      "【吉】",
      "【中吉】",
      "【小吉】",
      "【中吉】",
      "【凶】",
      "【大凶】",
      "【豚】"
    ]
    const rares=[
      '<span style="color:silver">【髪】</span>',
      '<span style="color:gold">【神】</span>',
      '<span style="color:pink">【女神】</span>',
      '<span style="color:blue">【尊師】</span>'
    ]
    const dice=Math.random()*100
    let choose=kujis
    if(dice>99){
      choose=rares
    }
    const r=Math.floor(Math.random()*choose.length);
    const kuji=choose[r]
    name=name.replace("!omikuji","<b>"+kuji+"</b>")
  }
  if(name.includes("!dama")){
    const dice=Math.random()*100
    let price=0;
    if(dice>99){
      price=Math.floor(Math.random()*500001)
    }
    else{price=Math.floor(Math.random()*1001)}
    name=name.replace("!dama",`<b>【${price}円】</b>`)
  }
  if(name.includes("fusianasan")){
    const ip=await getip()
    name=name.replace("fusianasan",`[${ip}]`)
  }
  //content
  if(content.includes("!chkBBx:")){
    const ip=await getip()
    content=content.replace("!chkBBx:",ip+", "+navigator.userAgent)
  }
  
  //id
  let sesID=sessionID;
  if(bot){
    const chk=botIDchk()
    if(chk) sesID=chk
    if(!chk){
    const chars="a,d,p,r,x,F,H,0".split(",");
    const r=Math.floor(Math.random()*chars.length)
    sesID=Math.floor(Math.random()*(36**8)).toString(36)+chars[r]
      botIDs.push(sesID)
    }
  }
  
  // if .000 ...
  if(now.includes("00:00:00.000")){
    sesID+="000000.000"
  }
  else if(now.includes("00:00:00.00")){
    sesID+="000000.00"
  }
  else if(now.includes("00:00.000")){
    sesID+="0000.000"
  }
  else if(now.includes("00.000")){
    sesID+="00.000"
  }
  else if(now.includes(".000")){
    sesID+=".000"
  }
  // if not .000 but 000000 ...
  else if(now.includes("00:00:00")){
    sesID+="000000"
  }
  
  if(posts>1000){
    if(!bot) alert("このスレッドは1000に達したので書き込めません。");
    return
  }
  
  //anchor
  content = content.replace(/>>(\d+)/g, (match, p1) => {
      return `<a href="#post${p1}">${match}</a>`;
  });
  content = content.replace(/http.?.+\.png\/?/g,(match,p1)=>{
    return `${match}<br/><img src=${match} width=120>`
  })
  const newElem = 
`<div class="post" id="post${posts}">${posts}&nbsp;
<span class="name">${name}</span>&nbsp;
<span class="time">${now}</span>&nbsp;
<span class="id">ID:${sesID}</span><br>
<div class="content">${content}</div>
</div>`;
  comBox.innerHTML += newElem;
  document.getElementById("post"+posts).scrollIntoView({ behavior: 'smooth', block: 'start' });
  posts++;
}
async function send(btn) {
  btn.disabled = true;
  const name = document.getElementById("name").value || "名無しさん";
  const content = contentBox.value;
  if(content.length==0){
    btn.disabled=false;
    return
  }
  await newPost(name, content);
  bot(name, content);
  contentBox.value = "";
  btn.disabled = false;
}
contentBox.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    document.getElementById("sendbtn").click();
    contentBox.focus()
  }
});

// bot
function newBot(name,content,rd){
  setTimeout(()=>{newPost(name,content,true)},rd);
}
const botName = "Bot";
function bot(name, content) {
  if(content.length>400 || posts>1000){
    return
  }
  const rd=Math.floor(Math.random()*1000+250);
  if (content.includes("だった")) {
    newBot(botName,"だったって何？どういうこと？",rd);
  }
  else if(content.includes("思う")){
    newBot(botName,"ぼく、わたしもそう思います！どう？これで欲求満たされた？",rd)
  }
  else if(content=="はい"){
    newBot(botName,"はいじゃないが",rd)
  }
  else if(content.includes("荒らし")){
    const set=content.split("荒らし")[1] || 10;
    for(let i=1; i<Number(set)+1;i++){
      newBot(botName,String(i),12*i);
    }
  }
  else if(100<=content.length){
    newBot(botName,"うるせえ！！！！！",rd)
  }
  else if(content.includes("AUTO")){
    newBot(botName,"AUTOってなんだよwwwwwOUTだろwwww Do you anderstand？？wwwwww",rd)
  }
  else{
    const mainResponses=[
      "ワロタ",
      "？",
      "キター！",
      "そんなことないが",
      "ちょっと何言ってるかわからない",
      "えっショック",
      "つまんね",
    ];
    const idx=Math.floor(Math.random()*mainResponses.length)
    newBot(botName,mainResponses[idx],rd)
  }
}
function autoBot(){
  function resBase(){
    let anc = ">>" + Number(Math.floor(Math.random()*posts)+1);
    let autoRes=[
      "過疎すぎワロタ",
      "てす",
      "今北産業",
      "なにこれ",
      "https://i.imgur.com/vippers.png",
      "(´・ω・｀)",
      "重くね？",
      "ID真っ赤で草",
      anc+" ちょっとワロタ",
      "VIPからきますた",
      "なんJから来たンゴーwwww",
      "2get",
      theme+"って何？",
      "まさか"+theme+"知らない奴とか居ないよな？",
      anc + " うわあ……",
      anc + "が見えない",
      "あーあ",
      "解散",
      "PC蛾物故割れた",
      "ねんまつ",
      anc+" idすごいな",
      "うんち",
      "まさかな",
      "おさかな",
      "ｷﾀ━━━━(ﾟ∀ﾟ)━━━━!!",
      "(´・ω・｀)わかる",
      "これはAUTO",
      "通報しました",
      "今更かよｗ",
      theme+"とかもう時代遅れだろ",
      theme+"とか懐かしすぎワロタ",
      "流石にワロタ",
      "これはだめだろ",
      "VIP終わったな",
      "もう終わりだ猫の国",
      "もう終わりだ横の国",
      "また負けたのか",
      "㌧クス",
      "なるほどサンクス",
      "とりあえずうp",
      "早すぎだろ",
      "(*´ω｀*)よいよね",
      "祭りだー！！",
      anc+"<br/>わかる",
      "必死だなw"
    ]
    return autoRes
    }
  let autoRes=resBase()
    const idx=Math.floor(Math.random()*autoRes.length)
    let response=autoRes[idx]
    if(Math.random()*100>75){
      let autoRes=resBase()
      const secondIndex=Math.floor(Math.random()*autoRes.length)
      const secondRes=autoRes[secondIndex]
      response+="<br/>"+secondRes
    }
    newBot("名無しさん",response,10)
  if(posts<1000){setTimeout(autoBot,Math.random()*freq+1000)}
}

autoBot()
