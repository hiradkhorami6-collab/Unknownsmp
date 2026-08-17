# Unknown SMP — Website

یک سایت استاتیک، فارسی و ریسپانسیو برای Unknown SMP؛ بدون فریم‌ورک و بدون نیاز به build.

## ساختار

```text
unknown-smp/
├── index.html
├── style.css
├── script.js
├── api/
│   └── whitelist.js
├── README.md
└── assets/
    └── logo.png
```

## اجرا

فایل `index.html` را باز کنید یا کل پوشه را روی GitHub Pages / هر هاست استاتیک قرار دهید.

## قبل از انتشار

- IP واقعی سرور را در `index.html` داخل `data-ip` و متن‌های مربوط به IP جایگزین کنید.
- لینک واقعی Discord را در بخش Coming Soon قرار دهید.
- اطلاعات تاپ پلیرز را با داده‌های واقعی سرور جایگزین کنید.
- برای اینکه فرم درخواست واقعاً ارسال شود، `submit` فرم را به Formspree، Netlify Forms یا API اختصاصی وصل کنید. در وضعیت فعلی فرم سمت مرورگر را مدیریت می‌کند و چیزی را به سرور نمی‌فرستد.
- لوگوی نهایی را دقیقاً با نام `assets/logo.png` قرار دهید.

## طراحی

تم اصلی عمداً تاریک، مینیمال و شیشه‌ای نگه داشته شده و انیمیشن‌ها سبک هستند تا روی موبایل هم روان بمانند. ساختار سایت با HTML/CSS/JS خام نوشته شده و به framework یا build step نیاز ندارد.

## نکته

این قالب هیچ اتصال واقعی به دیتابیس، Discord یا Minecraft Server Status API ندارد؛ این بخش‌ها عمداً برای اتصال بعدی آماده و جدا نگه داشته شده‌اند.


## اتصال فرم وایت‌لیست به Discord

فرم وایت‌لیست برای ارسال امن به Discord آماده شده است. **Webhook دیسکورد را داخل `script.js` یا `index.html` نگذارید** چون سایت عمومی است و هر کسی می‌تواند آن را ببیند و اسپم کند.

### راه‌اندازی پیشنهادی با Vercel

1. پروژه را روی GitHub قرار دهید.
2. همان repository را به Vercel وصل کنید.
3. در Vercel یک Environment Variable با نام زیر بسازید:
   `DISCORD_WEBHOOK_URL`
4. مقدار آن را Webhook URL کانال خصوصی درخواست‌های وایت‌لیست قرار دهید.
5. Deploy کنید.

بعد از Deploy، فرم سایت به `/api/whitelist` درخواست می‌فرستد و API آن را به Discord منتقل می‌کند.

### ساخت Webhook در Discord

در کانالی که می‌خواهید درخواست‌ها داخلش بیاید:
`Edit Channel → Integrations → Webhooks → New Webhook`

Webhook URL را فقط در Environment Variables سرویس هاست قرار دهید و داخل فایل‌های عمومی سایت قرار ندهید.

### نکته مهم درباره GitHub Pages

GitHub Pages فقط فایل‌های استاتیک را اجرا می‌کند و این API را اجرا نمی‌کند. بنابراین برای فعال‌شدن ارسال Discord باید API را روی سرویسی مثل Vercel اجرا کنید یا یک backend/serverless دیگر داشته باشید. خود سایت همچنان می‌تواند از همان GitHub repository منتشر شود.


## نسخه 2 — اتصال Discord

این نسخه علاوه بر فرم، validation سمت کلاینت و API دارد و یک honeypot ساده برای کاهش اسپم اضافه شده است.

### مهم
Webhook URL را در هیچ فایل عمومی GitHub قرار ندهید. فایل `.env.example` فقط نمونه است؛ مقدار واقعی را در Vercel Environment Variables قرار دهید.

### مراحل
1. Discord → سرور Unknown SMP → کانال خصوصی مثل `#whitelist-requests`.
2. Server Settings → Integrations → Webhooks → Create Webhook.
3. نام Webhook را مثلاً `Unknown SMP Whitelist` بگذارید و کانال `#whitelist-requests` را انتخاب کنید.
4. `Copy Webhook URL` را بزنید.
5. در Vercel → Project → Settings → Environment Variables، متغیر `DISCORD_WEBHOOK_URL` را بسازید و URL را به عنوان مقدار وارد کنید.
6. Deploy/Redeploy کنید.
7. از سایت یک درخواست تستی بفرستید.
8. اگر همه‌چیز درست باشد، Embed درخواست در کانال Discord ظاهر می‌شود.

### امنیت
Webhook URL مثل یک secret است. اگر URL را جایی عمومی منتشر کردید، همان Webhook را در Discord حذف/تعویض کنید و URL جدید را در Vercel قرار دهید.
