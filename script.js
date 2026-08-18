const menuToggle=document.querySelector(".menu-toggle");const nav=document.querySelector(".nav-links");
menuToggle?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",open)});
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const copyBtn=document.getElementById("copyIp");
copyBtn?.addEventListener("click",async()=>{const ip=copyBtn.dataset.ip;try{await navigator.clipboard.writeText(ip);copyBtn.innerHTML="IP کپی شد ✓";setTimeout(()=>copyBtn.innerHTML=`${ip} <span>کپی</span>`,1800)}catch{copyBtn.innerHTML="کپی نشد"}});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.getElementById("joinForm")?.addEventListener("submit",async e=>{
  e.preventDefault();
  const form=e.currentTarget, msg=document.getElementById("formMessage"), btn=form.querySelector("button[type=submit]");
  const data=Object.fromEntries(new FormData(form).entries());
  if(!/^[A-Za-z0-9_\.\-]{3,32}$/.test(data.minecraft)){msg.textContent="نام کاربری ماینکرفت معتبر نیست.";return}
  if(Number(data.age)<10||Number(data.age)>99){msg.textContent="سن واردشده معتبر نیست.";return}
  if(String(data.reason).trim().length<8){msg.textContent="لطفاً دلیل درخواست را کمی کامل‌تر بنویس.";return}
  msg.textContent="در حال ارسال درخواست...";
  btn.disabled=true;
  try{
    const DISCORD_WEBHOOK = "YOUR_WEBHOOK_HERE";
    if (DISCORD_WEBHOOK === "YOUR_WEBHOOK_HERE") throw new Error("webhook missing");
    const res=await fetch(DISCORD_WEBHOOK,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({embeds:[{title:"Unknown SMP Whitelist",color:10181046,fields:[{name:"Minecraft",value:String(data.minecraft),inline:true},{name:"Age",value:String(data.age),inline:true},{name:"Telegram",value:String(data.telegram||"ندارد"),inline:true},{name:"Reason",value:String(data.reason)}]}]})});
    if(!res.ok) throw new Error("send failed");
    msg.textContent="درخواستت با موفقیت برای تیم Unknown SMP ارسال شد.";
    form.reset();
  }catch(err){
    msg.textContent="ارسال انجام نشد؛ اتصال Discord هنوز روی هاست تنظیم نشده.";
  }finally{btn.disabled=false;}
});
