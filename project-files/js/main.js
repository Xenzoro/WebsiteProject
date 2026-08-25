document.addEventListener("DOMContentLoaded", () => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // Filter buttons (visual toggle only — wire up data-filter logic when cards have real content)
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
        });
    });
});

const SUPABASE_URL = 'https://slapzjzdpjdjjnqtqeiy.supabase.co';
const ANON_KEY = 'sb_publishable_yR4ZWH5CvNlmNlZBXuEAjA_VF8M_ZbF';

    fetch (`${SUPABASE_URL}/rest/v1/project-cards?select=*`,{
        headers: {
            'apikey': ANON_KEY,
            'Authorization': `bearer ${ANON_KEY}`
        }
    })

.then(res => res.json())
.then(data => renderCards(data))
.catch(err => console.log('ya fucked up: ', err));

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
                        <div class="${cardClass}">
                            <div class="card-img blue">PREVIEW</div>
                            <div class="card-body-custom">
                                <div class="card-tags">${tagsHTML}</div>
                                <h3 class="card-title-text">${card.title}</h3>
                                <p class="card-desc">${card.blurb}</p>
                                <button class="read-more-btn">Read More</button>
                            </div>                    
                        </div>  
                    </div>  
                `;
            }).join('')}
        </div>
    `;
}

document.getElementById('card-container').addEventListener('click', (e) => {
    if(e.target.classList.contains('read-more-btn')){
        const description = e.target.previousElementSibling;
        description.classList.toggle('expanded');
        e.target.textContent = description.classList.contains('expanded')? 'Read Less': 'Read More';
    }
    });