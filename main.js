// مختبرات الشمس الطبية - JavaScript المخصص

document.addEventListener('DOMContentLoaded', function() {

    // تسجيل Service Worker للدعم PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('./sw.js')
                .then(function(registration) {
                    console.log('🌞 Service Worker مسجل بنجاح:', registration.scope);

                    // التحقق من وجود تحديثات
                    registration.addEventListener('updatefound', function() {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', function() {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // إظهار رسالة تحديث للمستخدم
                                showUpdateNotification();
                            }
                        });
                    });
                })
                .catch(function(error) {
                    console.log('🌞 فشل تسجيل Service Worker:', error);
                });
        });
    }

    // إظهار رسالة التحديث
    function showUpdateNotification() {
        const updateBanner = document.createElement('div');
        updateBanner.className = 'update-banner';
        updateBanner.innerHTML = `
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-8">
                        <i class="fas fa-sync-alt me-2"></i>
                        يتوفر تحديث جديد للموقع
                    </div>
                    <div class="col-md-4 text-end">
                        <button class="btn btn-sm btn-light me-2" onclick="refreshPage()">تحديث</button>
                        <button class="btn btn-sm btn-outline-light" onclick="dismissUpdate()">لاحقاً</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertBefore(updateBanner, document.body.firstChild);
    }

    // تحديث الصفحة
    window.refreshPage = function() {
        window.location.reload();
    };

    // إخفاء رسالة التحديث
    window.dismissUpdate = function() {
        const banner = document.querySelector('.update-banner');
        if (banner) {
            banner.remove();
        }
    };
    
    // تأثير شريط التنقل عند التمرير
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // تأثير التمرير السلس للروابط الداخلية
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // تأثير ظهور العناصر عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // تطبيق التأثير على العناصر
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .feature-box');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // تحسين أداء الصور
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // تأثير النقر على أزرار الخدمات
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // إضافة تأثير النقر
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // تحسين تجربة النماذج
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>جاري الإرسال...';
                submitBtn.disabled = true;
            }
        });
    });

    // تحسين تجربة الروابط الخارجية
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // تأثير الكتابة المتحركة للعنوان الرئيسي
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // تحسين أداء التمرير
    let ticking = false;
    
    function updateScrollEffects() {
        // تحديث تأثيرات التمرير هنا
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate);

    // إضافة تأثيرات الماوس للبطاقات
    const cards = document.querySelectorAll('.service-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // تحسين إمكانية الوصول للوحة المفاتيح
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // إضافة تأثير التحميل
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }
        
        // إظهار المحتوى بعد التحميل
        document.body.style.opacity = '1';
    });

    // تحسين أداء الرسوم المتحركة
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // تقليل الرسوم المتحركة للمستخدمين الذين يفضلون ذلك
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }

    // إضافة وظائف إضافية للموقع
    
    // تأثير العد التصاعدي للأرقام المحسن
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // مدة العد بالميلي ثانية
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        let startTime = null;

        const easeOutQuart = (t) => 1 - (--t) * t * t * t;

        const updateCounter = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            current = target * easeOutQuart(progress);

            // تنسيق الرقم مع فواصل الآلاف
            const formattedNumber = Math.floor(current).toLocaleString('ar-SA');
            counter.textContent = formattedNumber;

            // إضافة تأثير النبض أثناء العد
            counter.classList.add('counting');

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString('ar-SA');
                counter.classList.remove('counting');
                counter.classList.add('completed');

                // تأثير الانتهاء
                setTimeout(() => {
                    counter.classList.add('animate');
                }, 100);
            }
        };

        // بدء العد عند ظهور العنصر
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // تأخير بسيط لتأثير أفضل
                    setTimeout(() => {
                        requestAnimationFrame(updateCounter);
                    }, Math.random() * 500); // تأخير عشوائي لتأثير متدرج
                    counterObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5 // بدء العد عندما يكون 50% من العنصر مرئي
        });

        counterObserver.observe(counter);
    });

    // تحسين تجربة البحث
    const searchInputs = document.querySelectorAll('input[type="search"]');
    
    searchInputs.forEach(input => {
        let searchTimeout;
        
        input.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                // تنفيذ البحث هنا
                console.log('البحث عن:', this.value);
            }, 300);
        });
    });

    // إضافة تأثيرات صوتية (اختيارية)
    const playSound = (soundName) => {
        const audio = new Audio(`sounds/${soundName}.mp3`);
        audio.volume = 0.3;
        audio.play().catch(() => {
            // تجاهل الأخطاء إذا لم يتمكن من تشغيل الصوت
        });
    };

    // تأثير النقر على الأزرار
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // playSound('click'); // إلغاء التعليق لتفعيل الصوت
            
            // إضافة تأثير بصري
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // تحسين الأداء العام
    
    // تأجيل تحميل المحتوى غير الضروري
    const deferredContent = document.querySelectorAll('[data-defer]');
    
    const deferredObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const content = element.getAttribute('data-defer');
                element.innerHTML = content;
                deferredObserver.unobserve(element);
            }
        });
    });

    deferredContent.forEach(element => {
        deferredObserver.observe(element);
    });

    // إضافة معلومات الأداء للمطورين
    if (window.performance && console.time) {
        console.time('Page Load Time');
        window.addEventListener('load', function() {
            console.timeEnd('Page Load Time');
            console.log('Navigation Timing:', window.performance.timing);
        });
    }

    console.log('🌞 مختبرات الشمس الطبية - تم تحميل الموقع بنجاح!');
});

// وظائف مساعدة
const utils = {
    // تنسيق الأرقام
    formatNumber: (num) => {
        return new Intl.NumberFormat('ar-SA').format(num);
    },
    
    // تنسيق التاريخ
    formatDate: (date) => {
        return new Intl.DateTimeFormat('ar-SA').format(new Date(date));
    },
    
    // التحقق من صحة البريد الإلكتروني
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // التحقق من صحة رقم الهاتف السعودي
    validateSaudiPhone: (phone) => {
        const re = /^(\+966|966|0)?5[0-9]{8}$/;
        return re.test(phone.replace(/\s/g, ''));
    }
};

// تصدير الوظائف للاستخدام في ملفات أخرى
window.SunLabsUtils = utils;
