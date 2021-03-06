if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      preloading();
     navigator.serviceWorker.register("/service-worker.js")
     .then((registration) => {
       console.log('ServiceWorker Registered');
       return registration;
     }) 
     .then(state => {
       let serviceWorker;
       if (state.installing) {
         serviceWorker = state.installing;
       } else if (state.waiting) {
         serviceWorker = state.waiting;
       } else if (state.active) {
         serviceWorker = state.active;
       }

       if(serviceWorker) {
         console.log("ServiceWorker status", serviceWorker.state);
         if(serviceWorker.state == "activated"){
           requestPermission()
         }
         serviceWorker.addEventListener("statechange", event => {
           if(event.target.state == "activated") {
             console.log("ServiceWorker Status", event.target.state);
             requestPermission()
           }
         });
       }
     })
     .catch(() => {
       console.log("ServiceWorker Register Failed")
     });

    });
  } else {
    console.log("Service worker tidak didukung browser ini.");
  }
  function preloading() {
      document.getElementById('home-content').innerHTML += 
      `
      <div class="preloader-wrapper big active" style="margin-left:40%;">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
      `;
    }

    function requestPermission() {
    if ('Notification' in window) {
      Notification.requestPermission().then(function (result) {
        if (result === "denied") {
          console.log("Fitur notifikasi tidak diijinkan.");
          return;
        } else if (result === "default") {
          console.error("Pengguna menutup kotak dialog permintaan ijin.");
          return;
        }
    
    if (('PushManager' in window)) {
            navigator.serviceWorker.getRegistration().then(function(registration) {
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array("BDcf48TgSh8-C1vX0iK2t0nLnS-NjIzVIYWh6mjnWqdHWma3g6a4Tpcsgp2V81QZmIPFl81As41jtRo0GcPQO1Y")
                }).then(function(subscribe) {
                    console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                    console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('p256dh')))));
                    console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('auth')))));
                }).catch(function(e) {
                    console.error('Tidak dapat melakukan subscribe ', e.message);
                });
            });
        }
  });
}
}


    function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// REQUEST API UNTUK PERTAMA KALI
document.addEventListener("DOMContentLoaded", function() {
getArticles();
});
