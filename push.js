var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BDcf48TgSh8-C1vX0iK2t0nLnS-NjIzVIYWh6mjnWqdHWma3g6a4Tpcsgp2V81QZmIPFl81As41jtRo0GcPQO1Y",
   "privateKey": "IJVygM0RTKxNj7nXlLNS5yIjsf8lXpvsqeh1r6lE6EY"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/foLi-tOG-WQ:APA91bFHsFC68CMMNgdYrAJyK8YTWTLqhWt-LJo5LAyDZrl7ygfLf08YQfUWVGW-0JKALrXNoWhSL2XRYXPREXsI8qs8EhcfdVjrsoIUHv9VlNyLa0jENKkkloUqjuSErbNSlfDm0iWZ",
   "keys": {
       "p256dh": "BFmq2GRSmbTMfubaLA3dovQwXYelwH9XX+Fndi+fy6Pec/QyolOcsDZTxgrbEheGVnGLh0D+HeFQMra2SShYe3c=",
       "auth": "QxHDwX8PuxVmoSsY4AiwdQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '564582556080',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);