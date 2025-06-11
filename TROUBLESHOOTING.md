# دليل حل مشاكل GitHub Pages

## 🚨 المشكلة: عدم ظهور التنسيقات على GitHub Pages

إذا كان الموقع لا يظهر التنسيقات بشكل صحيح على GitHub Pages، اتبع هذا الدليل:

## 🔍 خطوات التشخيص

### 1. تحقق من صفحة التشخيص
افتح الرابط: `https://[username].github.io/[repository]/debug.html`

مثال: `https://mohmmadmustaf2025.github.io/SunMedicalLaboratories/debug.html`

### 2. تحقق من صفحة الاختبار
افتح الرابط: `https://[username].github.io/[repository]/test.html`

مثال: `https://mohmmadmustaf2025.github.io/SunMedicalLaboratories/test.html`

### 3. تحقق من وحدة تحكم المتصفح
1. اضغط F12 لفتح أدوات المطور
2. انتقل إلى تبويب "Console"
3. ابحث عن أخطاء تحميل الملفات

## 🛠️ الحلول الشائعة

### الحل 1: مسح ذاكرة التخزين المؤقت
```
Ctrl + F5 (Windows)
Cmd + Shift + R (Mac)
```

### الحل 2: التحقق من إعدادات GitHub Pages
1. اذهب إلى إعدادات المستودع
2. انتقل إلى قسم "Pages"
3. تأكد من أن المصدر هو "Deploy from a branch"
4. تأكد من اختيار "main" branch و "/ (root)"

### الحل 3: انتظار انتشار التحديثات
GitHub Pages قد يحتاج إلى 5-10 دقائق لتحديث الموقع بعد رفع التغييرات.

### الحل 4: التحقق من ملف .nojekyll
تأكد من وجود ملف `.nojekyll` في جذر المشروع.

## 🔧 إصلاحات متقدمة

### إصلاح 1: استخدام HTTPS بدلاً من HTTP
تأكد من أن جميع روابط CDN تستخدم `https://`

### إصلاح 2: إضافة crossorigin
```html
<link href="https://cdn.jsdelivr.net/..." rel="stylesheet" crossorigin="anonymous">
```

### إصلاح 3: استخدام مسارات نسبية
```html
<!-- بدلاً من -->
<link href="css/style.css" rel="stylesheet">

<!-- استخدم -->
<link href="./css/style.css" rel="stylesheet">
```

### إصلاح 4: إضافة CSS احتياطي
```html
<link href="./css/style.css" rel="stylesheet">
<link href="./css/fallback.css" rel="stylesheet">
```

## 📋 قائمة التحقق

- [ ] الموقع يعمل محلياً
- [ ] تم رفع جميع الملفات إلى GitHub
- [ ] GitHub Pages مفعل في إعدادات المستودع
- [ ] ملف .nojekyll موجود
- [ ] جميع روابط CDN تستخدم HTTPS
- [ ] المسارات المحلية تستخدم ./
- [ ] تم مسح ذاكرة التخزين المؤقت
- [ ] انتظار 5-10 دقائق بعد آخر تحديث

## 🌐 اختبار الروابط

### روابط CDN المستخدمة:
- Bootstrap: https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css
- Font Awesome: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css
- Google Fonts: https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap

### اختبار الروابط:
يمكنك فتح هذه الروابط مباشرة في المتصفح للتأكد من عملها.

## 🆘 إذا لم تنجح الحلول

### خيار 1: استخدام ملف CSS محلي
1. حمل ملفات Bootstrap و Font Awesome محلياً
2. ضعها في مجلد `assets/`
3. غير الروابط لتشير إلى الملفات المحلية

### خيار 2: استخدام CDN بديل
```html
<!-- Bootstrap من unpkg -->
<link href="https://unpkg.com/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css" rel="stylesheet">

<!-- Font Awesome من jsDelivr -->
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
```

### خيار 3: التحقق من حالة CDN
- تحقق من حالة jsDelivr: https://status.jsdelivr.com/
- تحقق من حالة Cloudflare: https://www.cloudflarestatus.com/

## 📞 الحصول على المساعدة

إذا استمرت المشكلة:
1. افتح صفحة التشخيص وخذ لقطة شاشة
2. افتح وحدة تحكم المتصفح وانسخ الأخطاء
3. تحقق من إعدادات GitHub Pages
4. تواصل مع الدعم التقني

## 🔄 آخر تحديث
تاريخ آخر تحديث: 2024-12-19
الإصدار: 1.2.0
