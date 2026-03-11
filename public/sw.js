function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('portfolio-db', 1)

        request.onupgradeneeded = () => {
            const db = request.result
            db.createObjectStore('kv')
        }

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}

async function incrementUnread() {
    const db = await openDB()

    return new Promise((resolve, reject) => {
        const tx = db.transaction('kv', 'readwrite')
        const store = tx.objectStore('kv')

        const getReq = store.get('news_unread')

        getReq.onsuccess = () => {
            const current = getReq.result || 0
            store.put(current + 1, 'news_unread')
            resolve()
        }

        getReq.onerror = reject
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
