// Discord webhook handler
// webhook should be configured here by owner
const WEBHOOK_URL = "YOUR_WEBHOOK_HERE";

function sendDiscord(message){
 fetch(WEBHOOK_URL,{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({content:message})
 });
}