(() => {
  "use strict";

  const cfg = window.UNKNOWN_SMP_CONFIG || {};
  const form = document.getElementById("whitelistForm");
  const statusBox = document.getElementById("status");
  const sendBtn = document.getElementById("sendBtn");
  const timerText = document.getElementById("timerText");
  const STORAGE_KEY = "unknownSmpWhitelistSubmitted";

  // Shared countdown: the build contains one fixed deadline for every visitor.
  const deadline = new Date(cfg.deadline).getTime();

  const faNumber = (n) => Number(n).toLocaleString("fa-IR");

  function renderTimer() {
    const remaining = deadline - Date.now();

    if (remaining <= 0) {
      const closed = "White-List بسته شده";
      timerText.textContent = closed;
      sendBtn.disabled = true;
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const longText = `${faNumber(days)} روز و ${String(hours).padStart(2,"0")} ساعت و ${String(minutes).padStart(2,"0")} دقیقه و ${String(seconds).padStart(2,"0")} ثانیه تا بسته شدن White-List`;
    timerText.textContent = longText;
  }

  renderTimer();
  setInterval(renderTimer, 1000);

  function showStatus(type, message) {
    statusBox.className = `status show ${type}`;
    statusBox.textContent = message;
  }

  // One submission per browser. A static GitHub Pages site cannot securely enforce
  // one submission per IP; that requires a server-side endpoint.
  if (localStorage.getItem(STORAGE_KEY)) {
    sendBtn.disabled = true;
    showStatus("error", "شما قبلاً درخواست خود را ارسال کرده‌اید.");
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (localStorage.getItem(STORAGE_KEY)) {
      showStatus("error", "شما قبلاً درخواست خود را ارسال کرده‌اید.");
      sendBtn.disabled = true;
      return;
    }

    if (Date.now() >= deadline) {
      showStatus("error", "White-List بسته شده است.");
      sendBtn.disabled = true;
      return;
    }

    const minecraft = document.getElementById("minecraft").value.trim();
    const age = document.getElementById("age").value.trim();
    const telegram = document.getElementById("telegramUser").value.trim();
    const reason = document.getElementById("reason").value.trim();

    if (!minecraft || !age || !telegram || !reason) {
      showStatus("error", "لطفاً همه بخش‌های فرم را کامل کنید.");
      return;
    }

    if (!/^[A-Za-z0-9_]{1,32}$/.test(minecraft)) {
      showStatus("error", "نام کاربری Minecraft معتبر نیست.");
      return;
    }

    const ageNumber = Number(age);
    if (!Number.isInteger(ageNumber) || ageNumber < 1 || ageNumber > 99) {
      showStatus("error", "سن باید بین ۱ تا ۹۹ باشد.");
      return;
    }

    if (!cfg.webhook) {
      showStatus("error", "تنظیمات ارسال Discord پیدا نشد.");
      return;
    }

    sendBtn.disabled = true;
    const oldLabel = sendBtn.innerHTML;
    sendBtn.textContent = "در حال ارسال…";
    statusBox.className = "status";

    const payload = {
      username: "UNKNOWN SMP • White-List",
      embeds: [{
        title: "درخواست جدید White-List",
        color: 0x9d5ef0,
        thumbnail: {
          url: `https://mc-heads.net/avatar/${encodeURIComponent(minecraft)}/128`
        },
        fields: [
          { name: "👤 نام Minecraft", value: minecraft, inline: true },
          { name: "🎂 سن", value: String(ageNumber), inline: true },
          { name: "✈️ آیدی تلگرام", value: telegram, inline: false },
          { name: "📝 دلیل ورود", value: reason.slice(0, 1024), inline: false }
        ],
        footer: { text: "UNKNOWN SMP • White-List" },
        timestamp: new Date().toISOString()
      }]
    };

    try {
      let delivered = false;

      try {
        const response = await fetch(cfg.webhook + "?wait=true", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (response.ok) delivered = true;
      } catch (normalRequestError) {
        console.warn("Normal webhook request was blocked; trying fallback.", normalRequestError);
      }

      if (!delivered) {
        await fetch(cfg.webhook, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: JSON.stringify(payload)
        });
        delivered = true;
      }

      if (!delivered) throw new Error("Webhook delivery failed");

      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        submittedAt: new Date().toISOString(),
        minecraft
      }));

      showStatus("ok", "✅ مشخصات با موفقیت ارسال شد و بزودی لینک گپ به آیدی تلگرامتون ارسال میشه");
      form.reset();
      sendBtn.textContent = "ارسال شد ✓";
      sendBtn.disabled = true;
    } catch (error) {
      console.error("Discord webhook error:", error);
      showStatus("error", "ارسال درخواست انجام نشد. لطفاً دوباره تلاش کنید.");
      sendBtn.disabled = false;
      sendBtn.innerHTML = oldLabel;
    }
  });

  // Fallback if the manager skin service is temporarily unavailable.
  const skin = document.getElementById("managerSkin");
  if (skin) {
    skin.addEventListener("error", () => {
      skin.src = "https://mc-heads.net/avatar/Matinsenator/120";
    }, { once: true });
  }
})();