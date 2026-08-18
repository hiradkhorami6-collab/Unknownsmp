const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1538726440751865936/aqEnqnsTjOiCNq38KJMUTKG8RK6Kg0kfsFcBHzMRg6bvPPlvJHPdLeJ-ThpSX3CO_89k";

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

const updateActiveNav = () => {
    const scrollPosition = window.scrollY + 180;
    let current = "home";

    sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
            current = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        );
    });
};

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL.includes("PASTE_YOUR")) {
        showMessage(
            "Webhook is not configured yet. Put your Discord Webhook URL inside script.js.",
            "error"
        );
        return;
    }

    const data = new FormData(form);

    const username = String(data.get("username") || "").trim();
    const age = String(data.get("age") || "").trim();
    const telegram = String(data.get("telegram") || "").trim();
    const reason = String(data.get("reason") || "").trim();

    if (!username || !age || !telegram || !reason) {
        showMessage("Please complete all required fields.", "error");
        return;
    }

    const submitButton = form.querySelector(".submit-btn");
    const originalText = submitButton.querySelector("span").textContent;

    submitButton.disabled = true;
    submitButton.querySelector("span").textContent = "Sending...";

    const payload = {
        username: "UNKNOWN SMP • Join Request",
        embeds: [
            {
                title: "⚔ New Join Request",
                color: 0x9b4dff,
                fields: [
                    {
                        name: "Minecraft Username",
                        value: `\`${escapeDiscord(username)}\``,
                        inline: true
                    },
                    {
                        name: "Age",
                        value: `\`${escapeDiscord(age)}\``,
                        inline: true
                    },
                    {
                        name: "Telegram ID",
                        value: `\`${escapeDiscord(telegram)}\``,
                        inline: false
                    },
                    {
                        name: "Reason",
                        value: escapeDiscord(reason).slice(0, 1024),
                        inline: false
                    }
                ],
                footer: {
                    text: "UNKNOWN SMP • Website Application"
                },
                timestamp: new Date().toISOString()
            }
        ]
    };

    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Discord returned ${response.status}`);
        }

        form.reset();
        showMessage("Application sent successfully. Good luck!", "success");
    } catch (error) {
        console.error(error);
        showMessage(
            "Could not send the application. Check the webhook URL and Discord webhook settings.",
            "error"
        );
    } finally {
        submitButton.disabled = false;
        submitButton.querySelector("span").textContent = originalText;
    }
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
}

function escapeDiscord(value) {
    return value
        .replace(/\\/g, "\\\\")
        .replace(/\*/g, "\\*")
        .replace(/_/g, "\\_")
        .replace(/~/g, "\\~")
        .replace(/`/g, "\\`");
}
