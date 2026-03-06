self.addEventListener('push', event => {
    const data = event.data.json()

    event.waitUntil(
        (async () => {
            await self.registration.showNotification(data.title, {
                body: data.body,
                icon: '/apple-touch-icon.png',
                badge: '/apple-touch-icon.png',
                tag: 'portfolio-news',
                data: {
                    url: data.url
                }
            })

            const clients = await self.clients.matchAll({
                type: 'window',
                includeUncontrolled: true
            })
            clients.forEach(c => c.postMessage({ type: 'news-unread' }))
        })()
    )
})

self.addEventListener('notificationclick', event => {
    event.notification.close()

    event.waitUntil(clients.openWindow(event.notification.data.url))
})
