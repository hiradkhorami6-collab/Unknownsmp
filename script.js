(() => {
const cfg = window.UNKNOWN_SMP_CONFIG || {};
const form = document.getElementById('whitelistForm');
const status = document.getElementById('status');

if(!form) return;

form.addEventListener('submit', async (e)=>{
 e.preventDefault();
 const payload = {
  username:'UNKNOWN SMP White-List',
  embeds:[{
   title:'📩 درخواست جدید White-List',
   color:10181046,
   fields:[
    {name:'Minecraft', value:document.getElementById('minecraft')?.value || '-'},
    {name:'سن', value:document.getElementById('age')?.value || '-'},
    {name:'تلگرام', value:document.getElementById('telegramUser')?.value || '-'},
    {name:'دلیل ورود', value:document.getElementById('reason')?.value || '-'}
   ]
  }]
 };
 try {
  await fetch(cfg.webhook, {
   method:'POST',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify(payload)
  });
  if(status){
   status.className='status ok show';
   status.textContent='مشخصات با موفقیت ارسال شد و بزودی لینک گپ به آیدی تلگرامتون ارسال میشه';
  }
 } catch(err){
  console.error(err);
  if(status){
   status.className='status error show';
   status.textContent='ارسال درخواست انجام نشد';
  }
 }
});
})();
