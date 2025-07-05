function dontpush(elem){
  alert("押すな！");
  elem.textContent="押しちゃいましたね。。。"
  elem.disabled=true;
  const dangerLink='<a href="danger/check.html" style="font-size:3px">？？？</a>'
  document.getElementById("danger").innerHTML+=dangerLink;
}
function today(){
  const dayBox=document.getElementById("now");
  const date= new Date();
  const week = date.getDay();
  const weeks="日曜日、月曜日、火曜日、水曜日、木曜日、金曜日、土曜日".split("、");
  const todayWeek = weeks[week];
  const result="今日は "+"<b>"+date.getFullYear() + "年 " + 
        Number(date.getMonth()+1) + "月" + date.getDate() + "日 " + 
        todayWeek + "</b> です";
  dayBox.innerHTML=result;
}
today();
document.getElementById("visitors").textContent=Math.floor(Math.random()*100)+1;

if(location.search=="?q=k8"){
  setTimeout(()=>{alert("お帰りなさい。");location.search="";},100);
}
