const WEBHOOK_URL = "https://discord.com/api/webhooks/1539823681365082134/OtT6mpu-xt6e06w7ZAiHcpQF10YAMI1YIL9hC8Y9qNrBoIi6nj-Tt3YPe5hW0YLPUPR4";

const sevenDays = 7 * 24 * 60 * 60 * 1000;
const storageKey = "unknownSmpWhitelistDeadline";
let deadline = Number(localStorage.getItem(storageKey));
if (!deadline || deadline < Date.now() - 24 * 60 * 60 * 1000) {
  deadline = Date.now() + sevenDays;
  localStorage.setItem(storageKey, String(deadline));
}

function pad(n) { return String(Math.max(0, n)).padStart(2, "0"); }
function updateTimer() {
  const diff = Math.max(0, deadline - Date.now());
  const total = Math.floor(diff / 1000);
  const d = Math.floor(total / 86400);
  const h = Math.floor(total % 86400 / 3600);
  const m = Math.floor(total % 3600 / 60);
  const s = total % 60;
  document.getElementById("days").textContent = pad(d);
  document.getElementById("hours").textContent = pad(h);
  document.getElementById("minutes").textContent = pad(m);
  document.getElementById("seconds").textContent = pad(s);
  document.getElementById("miniTimer").textContent = d > 0 ? `${d} روز` : `${pad(h)}:${pad(m)}:${pad(s)}`;
}
updateTimer(); setInterval(updateTimer, 1000);

const form = document.getElementById("whitelistForm");
const btn = document.getElementById("submitBtn");
const statusBox = document.getElementById("status");

function showStatus(text, type) {
  statusBox.textContent = text;
  statusBox.className = "status show " + type;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const minecraft = document.getElementById("minecraft").value.trim();
  const age = document.getElementById("age").value.trim();
  const telegram = document.getElementById("telegram").value.trim();
  const reason = document.getElementById("reason").value.trim();

  if (!minecraft || !age || !telegram || !reason) {
    showStatus("لطفاً همه فیلدها را کامل کن.", "err");
    return;
  }

  btn.disabled = true;
  btn.textContent = "در حال ارسال...";

  const payload = {
    username: "UNKNOWN SMP • White-List",
    embeds: [{
      title: "📩 درخواست جدید White-List",
      color: 0x9B59FF,
      fields: [
        { name: "🎮 نام Minecraft", value: minecraft, inline: true },
        { name: "🎂 سن", value: age, inline: true },
        { name: "📱 تلگرام", value: telegram, inline: false },
        { name: "📝 دلیل ورود", value: reason.slice(0, 1024), inline: false }
      ],
      footer: { text: "UNKNOWN SMP • Whitelist Application" },
      timestamp: new Date().toISOString()
    }]
  };

  try {
    const response = await fetch(WEBHOOK_URL + "?wait=true", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error("Discord error " + response.status + " " + errorText);
    }

    showStatus("درخواست با موفقیت ارسال شد و داخل Discord ثبت شد ✓", "ok");
    form.reset();
  } catch (error) {
    console.error(error);
    showStatus("ارسال به Discord انجام نشد. اگر سایت روی GitHub Pages است، Webhook مستقیم ممکن است توسط CORS یا تنظیمات Discord مسدود شود؛ خطا در Console ثبت شده است.", "err");
  } finally {
    btn.disabled = false;
    btn.innerHTML = 'ارسال درخواست <span>←</span>';
  }
});
