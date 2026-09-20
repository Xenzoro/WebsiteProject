const SUPABASE_URL = 'https://slapzjzdpjdjjnqtqeiy.supabase.co';
const ANON_KEY = 'sb_publishable_yR4ZWH5CvNlmNlZBXuEAjA_VF8M_ZbF';

const PLACEHOLDER_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>`;

document.addEventListener('DOMContentLoaded', () => {
    fetch(`${SUPABASE_URL}/rest/v1/about-me?id=eq.1&select=*`, {
        headers: {
            'apikey': ANON_KEY,
            'Authorization': `bearer ${ANON_KEY}`
        }
    })
        .then(res => res.json())
        .then(rows => {
            const data = Array.isArray(rows) && rows.length ? rows[0] : {};
            renderProfilePhoto(data.profile_photo_url);
            renderGallery(Array.isArray(data.gallery) ? data.gallery : []);
        })
        .catch(err => {
            console.log('ya fucked up: ', err);
            renderProfilePhoto(null);
            renderGallery([]);
        });
});

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
}

function renderProfilePhoto(url) {
    const img = document.getElementById('about-photo');
    const placeholder = document.getElementById('about-photo-placeholder');
    if (!img || !placeholder) return;

    if (url) {
        img.src = url;
        img.hidden = false;
        placeholder.hidden = true;
    } else {
        img.hidden = true;
        placeholder.hidden = false;
    }
}

function renderGallery(items) {
    const grid = document.getElementById('about-gallery-grid');
    if (!grid) return;

    // Fall back to the three known captions (no images yet) if the table
    // has no rows yet, so the gallery still reads correctly pre-launch.
    const fallback = [
        { images: [], caption: "My desk, RTX 5090 build and all" },
        { images: [], caption: "GMMK Pro build, lubed Baby Kangaroos" },
        { images: [], caption: "A TMR stick swap in progress" }
    ];
    const gallery = items.length ? items : fallback;

    grid.innerHTML = gallery.map(item => renderGalleryCard(item)).join('');

    // Set each card's image list as a real DOM property rather than an HTML
    // attribute string — image URLs contain quotes/special characters that
    // break attribute parsing when serialized into markup directly.
    const cards = grid.querySelectorAll('.about-gallery-card');
    gallery.forEach((item, i) => {
        const images = Array.isArray(item.images) ? item.images.filter(Boolean) : [];
        if (cards[i]) cards[i].dataset.images = JSON.stringify(images);
    });
}

function renderGalleryCard(item) {
    const images = Array.isArray(item.images) ? item.images.filter(Boolean) : [];
    const caption = item.caption || '';
    const hasMultiple = images.length > 1;

    const imageAreaHTML = images.length
        ? `<img class="about-gallery-img" src="${escapeHTML(images[0])}" alt="${escapeHTML(caption)}">`
        : `<div class="about-gallery-img-placeholder">${PLACEHOLDER_ICON}</div>`;

    const arrowsHTML = hasMultiple
        ? `
            <button type="button" class="about-gallery-arrow about-gallery-arrow-left" aria-label="Previous image">&#10094;</button>
            <button type="button" class="about-gallery-arrow about-gallery-arrow-right" aria-label="Next image">&#10095;</button>
        `
        : '';

    const dotsHTML = hasMultiple
        ? `<div class="about-gallery-dots">${images.map((_, i) =>
            `<button type="button" class="about-gallery-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Image ${i + 1}"></button>`
        ).join('')}</div>`
        : '';

    return `
        <div class="about-gallery-card" data-index="0">
            <div class="about-gallery-image-area">
                ${imageAreaHTML}
                ${arrowsHTML}
            </div>
            ${dotsHTML}
            <p class="about-gallery-caption">${escapeHTML(caption)}</p>
        </div>
    `;
}

function getCardImages(card) {
    try {
        return JSON.parse(card.dataset.images || '[]');
    } catch (err) {
        return [];
    }
}

function setCardImageIndex(card, images, index) {
    card.dataset.index = index;

    const img = card.querySelector('.about-gallery-img');
    if (img) img.src = images[index];

    card.querySelectorAll('.about-gallery-dot').forEach((d, i) => {
        d.classList.toggle('active', i === index);
    });
}

function initGalleryCarousel() {
    const grid = document.getElementById('about-gallery-grid');
    if (!grid) return;

    grid.addEventListener('click', (e) => {
        const arrow = e.target.closest('.about-gallery-arrow');
        const dot = e.target.closest('.about-gallery-dot');
        if (!arrow && !dot) return;

        const card = e.target.closest('.about-gallery-card');
        if (!card) return;

        const images = getCardImages(card);
        if (!images.length) return;

        let index = parseInt(card.dataset.index, 10) || 0;

        if (arrow) {
            const direction = arrow.classList.contains('about-gallery-arrow-left') ? -1 : 1;
            index = (index + direction + images.length) % images.length;
        } else if (dot) {
            index = parseInt(dot.dataset.index, 10) || 0;
        }

        setCardImageIndex(card, images, index);
    });
}

initGalleryCarousel();

function initLightbox() {
    const grid = document.getElementById('about-gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const leftArrow = document.getElementById('lightbox-arrow-left');
    const rightArrow = document.getElementById('lightbox-arrow-right');
    const dotsContainer = document.getElementById('lightbox-dots');
    if (!grid || !lightbox || !lightboxImg || !closeBtn || !leftArrow || !rightArrow || !dotsContainer) return;

    let activeCard = null;
    let activeImages = [];

    function renderDots(index) {
        if (activeImages.length > 1) {
            dotsContainer.innerHTML = activeImages.map((_, i) =>
                `<button type="button" class="lightbox-dot${i === index ? ' active' : ''}" data-index="${i}" aria-label="Image ${i + 1}"></button>`
            ).join('');
            dotsContainer.hidden = false;
        } else {
            dotsContainer.innerHTML = '';
            dotsContainer.hidden = true;
        }
    }

    function showImage(index) {
        lightboxImg.src = activeImages[index];
        renderDots(index);
        if (activeCard) setCardImageIndex(activeCard, activeImages, index);
    }

    function step(direction) {
        if (!activeImages.length) return;
        const current = parseInt(activeCard.dataset.index, 10) || 0;
        showImage((current + direction + activeImages.length) % activeImages.length);
    }

    function openLightbox(card) {
        const images = getCardImages(card);
        if (!images.length) return;

        activeCard = card;
        activeImages = images;

        const hasMultiple = images.length > 1;
        leftArrow.hidden = !hasMultiple;
        rightArrow.hidden = !hasMultiple;

        const startIndex = parseInt(card.dataset.index, 10) || 0;
        const cardImg = card.querySelector('.about-gallery-img');
        lightboxImg.alt = cardImg ? cardImg.alt : '';
        showImage(startIndex);

        lightbox.classList.add('active');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    // Separate delegated listener from the carousel's — only matches actual
    // <img> elements, so arrow/dot clicks on the small card (different
    // elements entirely) never reach here and can't trigger the lightbox.
    grid.addEventListener('click', (e) => {
        const img = e.target.closest('.about-gallery-img');
        if (!img) return;
        const card = e.target.closest('.about-gallery-card');
        if (!card) return;
        openLightbox(card);
    });

    leftArrow.addEventListener('click', () => step(-1));
    rightArrow.addEventListener('click', () => step(1));

    dotsContainer.addEventListener('click', (e) => {
        const dot = e.target.closest('.lightbox-dot');
        if (!dot) return;
        showImage(parseInt(dot.dataset.index, 10) || 0);
    });

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowLeft') step(-1);
        else if (e.key === 'ArrowRight') step(1);
    });
}

initLightbox();
