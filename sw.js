// Service Worker لمختبرات الشمس الطبية
// يوفر إمكانيات PWA والعمل بدون إنترنت

const CACHE_NAME = 'sunlabs-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/services.html',
    '/contact.html',
    '/faq.html',
    '/css/style.css',
    '/js/main.js',
    '/images/logo.png',
    '/images/favicon.ico',
    '/manifest.json',
    // Bootstrap و Font Awesome من CDN
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap'
];

// تثبيت Service Worker
self.addEventListener('install', function(event) {
    console.log('🌞 Service Worker: تم تثبيت Service Worker');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('🌞 Service Worker: تم فتح الكاش');
                return cache.addAll(urlsToCache);
            })
            .catch(function(error) {
                console.error('🌞 Service Worker: خطأ في تخزين الملفات:', error);
            })
    );
    
    // فرض تفعيل Service Worker الجديد فوراً
    self.skipWaiting();
});

// تفعيل Service Worker
self.addEventListener('activate', function(event) {
    console.log('🌞 Service Worker: تم تفعيل Service Worker');
    
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    // حذف الكاش القديم
                    if (cacheName !== CACHE_NAME) {
                        console.log('🌞 Service Worker: حذف الكاش القديم:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    
    // السيطرة على جميع العملاء فوراً
    return self.clients.claim();
});

// اعتراض طلبات الشبكة
self.addEventListener('fetch', function(event) {
    // تجاهل الطلبات غير HTTP/HTTPS
    if (!event.request.url.startsWith('http')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // إرجاع الملف من الكاش إذا وُجد
                if (response) {
                    console.log('🌞 Service Worker: تم العثور على الملف في الكاش:', event.request.url);
                    return response;
                }
                
                // إذا لم يوجد في الكاش، جلبه من الشبكة
                return fetch(event.request)
                    .then(function(response) {
                        // التحقق من صحة الاستجابة
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // نسخ الاستجابة لحفظها في الكاش
                        const responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(function(error) {
                        console.error('🌞 Service Worker: خطأ في جلب الملف:', error);
                        
                        // إرجاع صفحة بديلة للصفحات HTML عند عدم توفر الإنترنت
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                        
                        // إرجاع صورة بديلة للصور
                        if (event.request.destination === 'image') {
                            return new Response(
                                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f8f9fa"/><text x="100" y="100" text-anchor="middle" dy=".3em" fill="#6c757d">صورة غير متاحة</text></svg>',
                                { headers: { 'Content-Type': 'image/svg+xml' } }
                            );
                        }
                    });
            })
    );
});

// التعامل مع الرسائل من الصفحة الرئيسية
self.addEventListener('message', function(event) {
    console.log('🌞 Service Worker: تم استلام رسالة:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
});

// إشعارات Push (للمستقبل)
self.addEventListener('push', function(event) {
    console.log('🌞 Service Worker: تم استلام إشعار Push');
    
    const options = {
        body: event.data ? event.data.text() : 'إشعار جديد من مختبرات الشمس الطبية',
        icon: '/images/icon-192x192.png',
        badge: '/images/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'عرض التفاصيل',
                icon: '/images/checkmark.png'
            },
            {
                action: 'close',
                title: 'إغلاق',
                icon: '/images/xmark.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('مختبرات الشمس الطبية', options)
    );
});

// التعامل مع النقر على الإشعارات
self.addEventListener('notificationclick', function(event) {
    console.log('🌞 Service Worker: تم النقر على الإشعار');
    
    event.notification.close();
    
    if (event.action === 'explore') {
        // فتح الموقع
        event.waitUntil(
            clients.openWindow('/')
        );
    } else if (event.action === 'close') {
        // إغلاق الإشعار فقط
        console.log('🌞 Service Worker: تم إغلاق الإشعار');
    } else {
        // النقر على الإشعار نفسه
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// تحديث الكاش في الخلفية
self.addEventListener('sync', function(event) {
    console.log('🌞 Service Worker: مزامنة في الخلفية');
    
    if (event.tag === 'background-sync') {
        event.waitUntil(
            // تحديث البيانات المهمة
            updateCriticalData()
        );
    }
});

// وظيفة تحديث البيانات المهمة
function updateCriticalData() {
    return fetch('/api/critical-data')
        .then(response => response.json())
        .then(data => {
            // حفظ البيانات المحدثة
            return caches.open(CACHE_NAME)
                .then(cache => {
                    return cache.put('/api/critical-data', new Response(JSON.stringify(data)));
                });
        })
        .catch(error => {
            console.error('🌞 Service Worker: خطأ في تحديث البيانات:', error);
        });
}

// تنظيف الكاش القديم
function cleanupOldCaches() {
    return caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => cacheName.startsWith('sunlabs-') && cacheName !== CACHE_NAME)
                    .map(cacheName => caches.delete(cacheName))
            );
        });
}

// تشغيل تنظيف الكاش عند التفعيل
self.addEventListener('activate', function(event) {
    event.waitUntil(
        Promise.all([
            cleanupOldCaches(),
            self.clients.claim()
        ])
    );
});

console.log('🌞 Service Worker: تم تحميل Service Worker بنجاح');
