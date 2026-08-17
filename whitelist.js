export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { minecraft, age, telegram, reason, website } = req.body || {};
  if (website) return res.status(400).json({ error: "Spam detected" });

  const username = String(minecraft || "").trim();
  const playerAge = Number(age);
  const tg = String(telegram || "").trim();
  const why = String(reason || "").trim();

  if (!username || !why || !Number.isInteger(playerAge)) {
    return res.status(400).json({ error: "اطلاعات ناقص است" });
  }
  if (username.length > 32 || playerAge < 10 || playerAge > 99 || why.length < 8 || why.length > 1500 || tg.length > 100) {
    return res.status(400).json({ error: "اطلاعات واردشده معتبر نیست" });
  }

  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) return res.status(500).json({ error: "Discord webhook is not configured" });

  const payload = {
    username: "Unknown SMP",
    embeds: [{
      title: "درخواست جدید وایت‌لیست",
      description: "یک بازیکن جدید برای ورود به Unknown SMP درخواست داده.",
      color: 10125055,
      fields: [
        { name: "🎮 نام ماینکرفت", value: username, inline: true },
        { name: "🎂 سن", value: String(playerAge), inline: true },
        { name: "💬 تلگرام", value: tg || "وارد نشده", inline: true },
        { name: "📝 دلیل درخواست", value: why, inline: false }
      ],
      footer: { text: "Unknown SMP • Whitelist System" },
      timestamp: new Date().toISOString()
    }]
  };

  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) return res.status(502).json({ error: "Discord rejected the request" });
  return res.status(200).json({ ok: true });
}
