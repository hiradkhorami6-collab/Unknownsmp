// UNKNOWN SMP White-List
const WEBHOOK_URL = "https://discord.com/api/webhooks/1539867105225089094/O-bmIK2MSzeOiMzxx7u3JzB4rH9YQeP_Tjbta49fWrQqyQyzqhzQ0VyLfPsxr6fPtf4B";

const form = document.getElementById("whitelistForm");
const btn = document.getElementById("sendBtn");
const statusBox = document.getElementById("status");

function status(text, type) {
  statusBox.textContent = text;
  statusBox.className = "status show " + type;
}

form.addEventListener("submit", async function(event) {
  event.preventDefault(); // خیلی مهم: جلوگیری از رفتن اطلاعات به URL
  event.stopPropagation();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const minecraft = document.getElementById("minecraft").value.trim();
  const age = document.getElementById("age").value.trim();
  const telegram = document.getElementById("telegramUser").value.trim();
  const reason = document.getElementById("reason").value.trim();

  btn.disabled = true;
  btn.innerHTML = "در حال ارسال...";

  const data = {
    username: "UNKNOWN SMP",
    embeds: [{
      title: "📩 درخواست جدید White-List",
      color: 10181046,
      fields: [
        { name: "🎮 نام کاربری Minecraft", value: minecraft || "-", inline: true },
        { name: "🎂 سن", value: age || "-", inline: true },
        { name: "✈️ تلگرام", value: telegram || "-", inline: false },
        { name: "📝 دلیل ورود", value: reason.substring(0, 1024) || "-", inline: false }
      ],
      footer: { text: "UNKNOWN SMP • White-List" },
      timestamp: new Date().toISOString()
    }]
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("HTTP " + response.status);

    status("✓ درخواست با موفقیت به Discord ارسال شد.", "ok");
    form.reset();
  } catch (err) {
    console.error("Discord webhook error:", err);
    status("ارسال انجام نشد. خطا: " + err.message, "error");
  } finally {
    btn.disabled = false;
    btn.innerHTML = 'ارسال درخواست <span>←</span>';
  }
});

// تایمر واقعی ۷ روزه
const key = "unknownSmpWhitelistEnd";
let end = Number(localStorage.getItem(key));
if (!end || end <= Date.now()) {
  end = Date.now() + 7 * 24 * 60 * 60 * 1000;
  localStorage.setItem(key, end);
}
function timer() {
  let left = Math.max(0, end - Date.now());
  const d = Math.floor(left / 86400000);
  left %= 86400000;
  const h = Math.floor(left / 3600000);
  left %= 3600000;
  const m = Math.floor(left / 60000);
  left %= 60000;
  const s = Math.floor(left / 1000);
  document.getElementById("timerText").textContent = `${d} روز و ${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")} تا بسته شدن White-List`;
  document.getElementById("navTimer").textContent = d > 0 ? `${d} روز` : `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
}
timer(); setInterval(timer, 1000);
