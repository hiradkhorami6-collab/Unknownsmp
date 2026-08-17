export default async function handler(req) {
  if (req.method !== "POST") return new Response(JSON.stringify({error:"Method not allowed"}), {status:405,headers:{"content-type":"application/json"}});
  try {
    const {minecraft, age, telegram, reason, website} = await req.json();
    if (website) return new Response(JSON.stringify({error:"Spam detected"}), {status:400});
    const username=String(minecraft||"").trim(), playerAge=Number(age), tg=String(telegram||"").trim(), why=String(reason||"").trim();
    if (!username || !why || !Number.isInteger(playerAge) || username.length>32 || playerAge<10 || playerAge>99 || why.length<8 || why.length>1500 || tg.length>100)
      return new Response(JSON.stringify({error:"Invalid form data"}), {status:400,headers:{"content-type":"application/json"}});
    const webhook=Netlify.env.get("DISCORD_WEBHOOK_URL");
    if (!webhook) return new Response(JSON.stringify({error:"Discord webhook is not configured"}), {status:500,headers:{"content-type":"application/json"}});
    const payload={username:"Unknown SMP",embeds:[{title:"Whitelist Request",description:"New Unknown SMP whitelist request.",color:10125055,fields:[
      {name:"Minecraft",value:username,inline:true},{name:"Age",value:String(playerAge),inline:true},{name:"Telegram",value:tg||"Not provided",inline:true},{name:"Reason",value:why,inline:false}
    ],footer:{text:"Unknown SMP • Whitelist System"},timestamp:new Date().toISOString()}]};
    const r=await fetch(webhook,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
    if(!r.ok) return new Response(JSON.stringify({error:"Discord rejected the request"}),{status:502,headers:{"content-type":"application/json"}});
    return new Response(JSON.stringify({ok:true}),{status:200,headers:{"content-type":"application/json"}});
  } catch { return new Response(JSON.stringify({error:"Invalid request"}),{status:400,headers:{"content-type":"application/json"}}); }
}