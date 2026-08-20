const WEBHOOK_URL="https://discord.com/api/webhooks/1539823681365082134/OtT6mpu-xt6e06w7ZAiHcpQF10YAMI1YIL9hC8Y9qNrBoIi6nj-Tt6YPe5hW0YLPUPR4";

document.getElementById("whitelistForm").addEventListener("submit",async e=>{
e.preventDefault();

if(localStorage.getItem("sent")){
status.textContent="قبلا ارسال کرده اید";
return;
}

await fetch(WEBHOOK_URL,{
method:"POST",
mode:"no-cors",
body:JSON.stringify({
content:"درخواست جدید White-List"
})
});

localStorage.setItem("sent","true");
status.textContent="مشخصات با موفقیت ارسال شد و بزودی لینک گپ به آیدی تلگرامتون ارسال میشه";
});
