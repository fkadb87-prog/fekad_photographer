<script>
    // 1. קוד ה-Lightbox (שודרג):
    const allImages = Array.from(document.querySelectorAll('.gallery-item img'));
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxImage = document.getElementById('lightboxImage');
    let currentIndex = -1;

    function openLightbox(index) {
        currentIndex = index;
        lightboxImage.src = allImages[currentIndex].src.replace('/800/600', '/1600/1200'); // גודל מקסימלי
        lightboxOverlay.style.display = 'flex';
        setTimeout(() => lightboxOverlay.style.opacity = '1', 50); // אנימציית פתיחה
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxOverlay.style.opacity = '0';
        setTimeout(() => lightboxOverlay.style.display = 'none', 300); // סגירה חלקה
        document.body.style.overflow = 'auto';
    }

    function changeImage(direction) {
        // ... קוד הניווט זהה לקוד הקודם ...
        currentIndex += direction;
        if (currentIndex < 0) {
            currentIndex = allImages.length - 1;
        } else if (currentIndex >= allImages.length) {
            currentIndex = 0;
        }
        lightboxImage.src = allImages[currentIndex].src.replace('/800/600', '/1600/1200');
    }

    // אירועים לסגירה (Esc + לחיצה על רקע) נשארים זהים.
    
    
    // 2. אנימציית טעינה לתמונות הגלריה (Shine Effect):
    const galleryItems = document.querySelectorAll('.gallery-item');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded'); // הוספת הקלאס 'loaded' שמופעל ב-CSS
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    galleryItems.forEach(item => {
        item.style.transform = 'translateY(20px)'; // הגדרת מצב התחלתי
        observer.observe(item);
    });

    // 3. החלפת תמונות אוטומטית ב-Hero (משופר):
    const bgImages = document.querySelectorAll('.hero-background img');
    let currentImage = 0;

    function changeHeroImage() {
        bgImages.forEach(img => img.classList.remove('active'));
        currentImage = (currentImage + 1) % bgImages.length;
        bgImages[currentImage].classList.add('active');
    }

    if (bgImages.length > 1) {
        setInterval(changeHeroImage, 6000); // מעבר איטי יותר (6 שניות) - יוקרתי יותר
    }
    
    // 4. שינוי רקע ניווט בעת גלילה (Sticky Header Effect):
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 1)'; // לבן אטום לאחר גלילה קצרה
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)'; // שקוף עדין כשיש למעלה
            header.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.05)';
        }
    });

</script>