const WEBHOOK_URL = "https://discord.com/api/webhooks/1538726440751865936/aqEnqnsTjOiCNq38KJMUTKG8RK6Kg0kfsFcBHzMRg6bvPPlvJHPdLeJ-ThpSX3CO_89k";

document.getElementById("joinForm").addEventListener("submit", async (e)=>{
e.preventDefault();

const msg = `New Join Request
Minecraft: ${name.value}
Age: ${age.value}
Telegram: ${telegram.value}
Reason: ${reason.value}`;

await fetch(WEBHOOK_URL,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({content:msg})
});

alert("Request Sent");
});
