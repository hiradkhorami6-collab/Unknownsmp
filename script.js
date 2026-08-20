const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1538726440751865936/aqEnqnsTjOiCNq38KJMUTKG8RK6Kg0kfsFcBHzMRg6bvPPlvJHPdLeJ-ThpSX3CO_89k";
const REQUEST_KEY_PREFIX = "unknown_smp_join_request:";

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");
const form = document.getElementById("joinForm");
const formMessage = document.getElementById("formMessage");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(open));
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle?.setAttribute("aria-expanded", "false");
    });
});

const sections = document.querySelectorAll("main section[id]");

function updateActiveNav() {
    const scrollPosition = window.scrollY + 180;
    let current = "home";

    sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) current = section.id;
    });

    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

function normalizeTelegram(value) {
    return value.trim().toLowerCase().replace(/^https?:\/\/t\.me\//, "").replace(/^@/, "");
}

function requestStorageKey(telegram) {
    return REQUEST_KEY_PREFIX + normalizeTelegram(telegram);
}

function hasSubmitted(telegram) {
    try {
        return localStorage.getItem(requestStorageKey(telegram)) === "submitted";
    } catch (_) {
        return false;
    }
}

function markSubmitted(telegram) {
    try {
        localStorage.setItem(requestStorageKey(telegram), "submitted");
    } catch (_) {}
}

function escapeDiscord(value) {
    return String(value)
        .replace(/\\/g, "\\\\")
        .replace(/\*/g, "\\*")
        .replace(/_/g, "\\_")
        .replace(/~/g, "\\~")
        .replace(/`/g, "\\`");
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const webhook = DISCORD_WEBHOOK_URL.trim();
    if (!webhook) {
        showMessage("وبهوک دیسکورد تنظیم نشده است.", "error");
        return;
    }

    const data = new FormData(form);
    const username = String(data.get("username") || "").trim();
    const age = String(data.get("age") || "").trim();
    const telegram = String(data.get("telegram") || "").trim();
    const reason = String(data.get("reason") || "").trim();

    if (!username || !age || !telegram || !reason) {
        showMessage("لطفاً همه فیلدها را کامل کنید.", "error");
        return;
    }

    if (hasSubmitted(telegram)) {
        showMessage("این آیدی تلگرام قبلاً درخواست جوین ارسال کرده است.", "error");
        return;
    }

    const submitButton = form.querySelector(".submit-btn");
    const buttonText = submitButton.querySelector("span");
    const originalText = buttonText.textContent;
    submitButton.disabled = true;
    buttonText.textContent = "در حال ارسال...";

    const payload = {
        username: "UNKNOWN SMP",
        content: "⚔ **درخواست جدید جوین UNKNOWN SMP**",
        embeds: [{
            title: "📥 درخواست جوین جدید",
            color: 0x9b4dff,
            fields: [
                { name: "Minecraft Username", value: `\`${escapeDiscord(username)}\``, inline: true },
                { name: "سن", value: `\`${escapeDiscord(age)}\``, inline: true },
                { name: "Telegram ID", value: `\`${escapeDiscord(telegram)}\``, inline: false },
                { name: "دلیل ورود", value: escapeDiscord(reason).slice(0, 1024), inline: false }
            ],
            description: "بعد از تایید یوزر توسط ادمین، گپ تلگرام برای کاربر ارسال می‌شود.",
            footer: { text: "UNKNOWN SMP • Join Request" },
            timestamp: new Date().toISOString()
        }]
    };

    try {
        const response = await fetch(webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Discord HTTP ${response.status}`);
        }

        markSubmitted(telegram);
        form.reset();
        showMessage("درخواست شما با موفقیت به دیسکورد ارسال شد ✓", "success");
    } catch (error) {
        console.error("UNKNOWN SMP webhook error:", error);
        showMessage("ارسال درخواست انجام نشد. اگر Webhook حذف یا تغییر داده شده، باید Webhook جدید Discord را در script.js قرار دهید.", "error");
    } finally {
        submitButton.disabled = false;
        buttonText.textContent = originalText;
    }
});
