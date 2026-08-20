
const WEBHOOK_URL = "YOUR_WEBHOOK_HERE";

const form = document.getElementById("whitelistForm");
const statusBox = document.getElementById("status");

form?.addEventListener("submit", async (e)=>{
  e.preventDefault();

  if(localStorage.getItem("unknown_whitelist_sent")){
    statusBox.className="status error show";
    statusBox.textContent="شما قبلاً درخواست خود را ارسال کرده‌اید ✅";
    return;
  }

  const name=document.getElementById("minecraft").value.trim();
  const age=document.getElementById("age").value.trim();
  const telegram=document.getElementById("telegramUser").value.trim();
  const reason=document.getElementById("reason").value.trim();

  const embed={
    username:"UNKNOWN SMP",
    embeds:[{
      title:"📩 درخواست جدید White-List",
      fields:[
        {name:"Minecraft",value:name,inline:true},
        {name:"سن",value:age,inline:true},
        {name:"تلگرام",value:telegram},
        {name:"دلیل ورود",value:reason}
      ]
    }]
  };

  try{
    await fetch(WEBHOOK_URL,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(embed)
    });

    localStorage.setItem("unknown_whitelist_sent","true");
    statusBox.className="status ok show";
    statusBox.textContent="مشخصات با موفقیت ارسال شد ✅ بزودی لینک گپ به ایدی تلگرامتون ارسال میشه";
  }catch(err){
    statusBox.className="status error show";
    statusBox.textContent="خطا در ارسال درخواست";
  }
});

// Minecraft skin API example
function loadSkin(username){
  const img=document.getElementById("skin");
  if(img) img.src="https://mc-heads.net/avatar/"+username;
}
