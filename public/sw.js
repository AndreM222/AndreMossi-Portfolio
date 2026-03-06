self.addEventListener('push', event => {
    const data = event.data.json()

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: '/apple-touch-icon.png',
            badge: '/apple-touch-icon.png',
            vibrate: [100, 50, 100],
            tag: 'portfolio-news',
            data: {
                url: data.url
            }
        }),

        self.clients.matchAll().then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'UNREAD_NOTIFICATION',
                    count: 1
                })
            })
        })
    )
})

self.addEventListener('notificationclick', event => {
    event.notification.close()

    event.waitUntil(clients.openWindow(event.notification.data.url))
})
