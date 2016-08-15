if ('serviceWorker' in navigator) {
    console.log('CLIENT: service worker registration in progress.');
    navigator.serviceWorker.register('/service-worker.js').then(function() {
        console.log('CLIENT: service worker registration complete.');
        if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
            console.warn('Notifications aren\'t supported.');
            return;
        }

        // Check the current Notification permission.
        // If its denied, it's a permanent block until the
        // user changes the permission
        if (Notification.permission === 'denied') {
            console.warn('The user has blocked notifications.');
            return;
        }

        // Check if push messaging is supported
        if (!('PushManager' in window)) {
            console.warn('Push messaging isn\'t supported.');
            return;
        }

		if (Notification.permission === 'default') {
			Notification.requestPermission().then((a) => {
	            if (Notification.permission === 'granted') {
					new Notification("Thank You", {body: "Thanks for enabling notifications, now you can keep up with all your music live."});
	            } else {
					return;
				}
	        });
		} else {
			// new Notification("Title 2", {body: "Body 2");
		}
    }, function() {
        console.log('CLIENT: service worker registration failure.');
    });
} else {
    console.log('CLIENT: service worker is not supported.');
}
