const WEBHOOK_URL="YOUR_WEBHOOK_HERE";
join.onsubmit=async(e)=>{
e.preventDefault();
await fetch(WEBHOOK_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:`Join: ${mc.value} | TG: ${tg.value} | ${reason.value}`})});
alert("Sent");
}
