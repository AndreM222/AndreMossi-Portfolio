self.addEventListener('push', event => {
    const data = event.data.json()

    event.waitUntil(
        (async () => {
            await self.registration.showNotification(data.title, {
                body: data.body,
                icon: '/apple-touch-icon.png',
                badge: '/apple-touch-icon.png',
                tag: 'portfolio-news',
                data: { url: data.url }
            })

            const allClients = await clients.matchAll({
                type: 'window',
                includeUncontrolled: true
            })

            for (const client of allClients) {
                client.postMessage({
                    type: 'UNREAD_NOTIFICATION',
                    count: 1
                })
            }
        })()
    )
})

self.addEventListener('notificationclick', event => {
    event.notification.close()

    event.waitUntil(clients.openWindow(event.notification.data.url))
})

self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim())
})
