function openDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open('portfolio-db', 2)

        req.onupgradeneeded = e => {
            const db = e.target.result

            if (!db.objectStoreNames.contains('kv')) {
                db.createObjectStore('kv')
            }
        }

        req.onsuccess = () => resolve(req.result)
        req.onerror = reject
    })
}

async function incrementUnread() {
    const db = await openDB()

    return new Promise((resolve, reject) => {
        const tx = db.transaction('kv', 'readwrite')
        const store = tx.objectStore('kv')

        const req = store.get('news_unread')

        req.onsuccess = () => {
            const current = req.result || 0
            store.put(current + 1, 'news_unread')
        }

        req.onerror = reject
        tx.oncomplete = resolve
        tx.onerror = reject
    })
}

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

            await incrementUnread()

            const allClients = await clients.matchAll({
                type: 'window',
                includeUncontrolled: true
            })

            for (const client of allClients) {
                client.postMessage({
                    type: 'UNREAD_NOTIFICATION'
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
