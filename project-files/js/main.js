document.addEventListener("DOMContentLoaded", () => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // Intro entrance animation — photo fades/slides in just before the text box + resume button
    gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } })
        .from('.profile-pic', { opacity: 0, y: 30 })
        .from('.intro-content', { opacity: 0, y: 30 }, '-=0.5');
});

const SUPABASE_URL = 'https://slapzjzdpjdjjnqtqeiy.supabase.co';
const ANON_KEY = 'sb_publishable_yR4ZWH5CvNlmNlZBXuEAjA_VF8M_ZbF';

let allCards = [];
let allTags = [];
const activeTags = new Set();

    fetch (`${SUPABASE_URL}/rest/v1/project-cards?select=*&order=sort_order.asc`,{
        headers: {
            'apikey': ANON_KEY,
            'Authorization': `bearer ${ANON_KEY}`
        }
    })

.then(res => res.json())
.then(data => {
    allCards = data;
    const tagSet = new Set();
    allCards.forEach(card => (card.tools_used || []).forEach(tag => tagSet.add(tag)));
    allTags = [...tagSet].sort((a, b) => a.localeCompare(b));
    applyFilterAndRender();
})
.catch(err => console.log('ya fucked up: ', err));

function applyFilterAndRender() {
    const visibleCards = activeTags.size === 0
        ? allCards
        : allCards.filter(card => (card.tools_used || []).some(tag => activeTags.has(tag)));
    renderCards(visibleCards);
}

function renderActiveChips() {
    const container = document.getElementById('active-tag-chips');
    if (!container) return;
    container.innerHTML = [...activeTags].map(tag => `
        <span class="tag-chip" data-tag="${tag}">
            ${tag}
            <button type="button" class="tag-chip-remove" data-tag="${tag}" aria-label="Remove ${tag} filter">&times;</button>
        </span>
    `).join('');
}

function renderTagSuggestions(query) {
    const suggestionsEl = document.getElementById('tag-suggestions');
    if (!suggestionsEl) return;

    if (!query) {
        suggestionsEl.innerHTML = '';
        suggestionsEl.classList.remove('open');
        return;
    }

    const lowerQuery = query.toLowerCase();
    const matches = allTags.filter(tag => !activeTags.has(tag) && tag.toLowerCase().includes(lowerQuery));

    if (!matches.length) {
        suggestionsEl.innerHTML = '';
        suggestionsEl.classList.remove('open');
        return;
    }

    suggestionsEl.innerHTML = matches.map(tag => `<button type="button" class="tag-suggestion" data-tag="${tag}">${tag}</button>`).join('');
    suggestionsEl.classList.add('open');
}

function initTagFilter() {
    const input = document.getElementById('tag-search-input');
    const suggestionsEl = document.getElementById('tag-suggestions');
    const chipsEl = document.getElementById('active-tag-chips');
    if (!input || !suggestionsEl || !chipsEl) return;

    input.addEventListener('input', () => {
        renderTagSuggestions(input.value.trim());
    });

    suggestionsEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.tag-suggestion');
        if (!btn) return;
        activeTags.add(btn.dataset.tag);
        input.value = '';
        renderTagSuggestions('');
        renderActiveChips();
        applyFilterAndRender();
        input.focus();
    });

    chipsEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.tag-chip-remove');
        if (!btn) return;
        activeTags.delete(btn.dataset.tag);
        renderActiveChips();
        applyFilterAndRender();
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.tag-search-wrapper')) {
            suggestionsEl.classList.remove('open');
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            suggestionsEl.classList.remove('open');
            input.blur();
        }
    });
}

initTagFilter();

function renderCards(cards) {
    const container = document.getElementById('card-container');

    container.innerHTML = `
        <div class="row g-4">
            ${cards.map((card, index)=>{
                const isFeatured = index === 0;
                const colClass = isFeatured ? `col-md-8` : `col-md-4`;
                const cardClass = isFeatured ? `project-card featured` : `project-card`;
                
                const tagsHTML = card.tools_used.map(tag => `<span class="tag">${tag}</span>`).join('');
                
                
                return`
                    <div class="${colClass}">
                        <a href="detail.html?id=${card.id}" class="card-link-wrapper">
                            <div class="${cardClass}">
                                <div class="card-img blue"> <img alt="projects cover image" src="${card.image_url}"></div>
                                <div class="card-body-custom">
                                    <div class="card-tags">${tagsHTML}</div>
                                    <h3 class="card-title-text">${card.title}</h3>
                                    <p class="card-desc">${card.blurb}</p>
                                    <button class="read-more-btn" type="button">Read More</button>
                                </div>
                            </div>
                        </a>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

document.getElementById('card-container').addEventListener('click', (e) => {
    if(e.target.classList.contains('read-more-btn')){
        e.preventDefault();
        const description = e.target.previousElementSibling;
        description.classList.toggle('expanded');
        e.target.textContent = description.classList.contains('expanded')? 'Read Less': 'Read More';
    }
    });