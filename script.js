const WEBHOOK_URL = "https://discord.com/api/webhooks/1538726440751865936/aqEnqnsTjOiCNq38KJMUTKG8RK6Kg0kfsFcBHzMRg6bvPPlvJHPdLeJ-ThpSX3CO_89k";

async function send(){
 await fetch(WEBHOOK_URL,{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({
   content:"New join request: "+name.value+" | Telegram: "+tg.value
  })
 });
 alert("Sent");
}
