const SUPABASE_URL = 'https://slapzjzdpjdjjnqtqeiy.supabase.co';
const ANON_KEY = 'sb_publishable_yR4ZWH5CvNlmNlZBXuEAjA_VF8M_ZbF';

document.addEventListener('DOMContentLoaded', () => {
    const feed = document.getElementById('projects-feed');

    fetch(`${SUPABASE_URL}/rest/v1/project-cards?select=*&order=sort_order.asc`, {
        headers: {
            'apikey': ANON_KEY,
            'Authorization': `bearer ${ANON_KEY}`
        }
    })
        .then(res => res.json())
        .then(projects => {
            if (!Array.isArray(projects) || !projects.length) {
                feed.innerHTML = `<p class="detail-error">No projects found.</p>`;
                return;
            }
            renderFeed(projects);
        })
        .catch(err => {
            console.log('ya fucked up: ', err);
            feed.innerHTML = `<p class="detail-error">Something went wrong loading projects.</p>`;
        });
});

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
}

function renderFeed(projects) {
    const feed = document.getElementById('projects-feed');

    feed.innerHTML = projects.map((project, index) => renderProjectSection(project, index)).join('');

    if (window.Prism) {
        Prism.highlightAllUnder(feed);
    }

    projects.forEach(project => {
        const terminalSession = Array.isArray(project.terminal_session) ? project.terminal_session : [];
        if (terminalSession.length) {
            initTerminal(project.id, terminalSession);
        }
    });
}

function renderProjectSection(project, index) {
    const tagsHTML = (project.tools_used || [])
        .map(tag => `<span class="tag">${escapeHTML(tag)}</span>`)
        .join('');

    const demoBtnHTML = project.demo_url
        ? `<a href="${escapeHTML(project.demo_url)}" target="_blank" rel="noopener noreferrer" class="demo-btn">View Live Demo</a>`
        : '';

    const snippets = Array.isArray(project.code_snippets) ? project.code_snippets : [];
    const snippetsHTML = snippets.map((snip, i) => {
        const lang = snip.language || 'clike';
        const label = snip.label || snip.title || `Snippet ${i + 1}`;
        return `
            <div class="code-snippet">
                <div class="code-snippet-label">${escapeHTML(label)}</div>
                <pre><code class="language-${escapeHTML(lang)}">${escapeHTML(snip.code)}</code></pre>
            </div>
        `;
    }).join('');

    const terminalSession = Array.isArray(project.terminal_session) ? project.terminal_session : [];

    const searchText = escapeHTML(
        [project.title, (project.tools_used || []).join(' '), project.blurb, project.long_description]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()
    );

    return `
        <section class="project-full-section" id="project-${project.id}" data-search="${searchText}">
            <div class="container">
                <div class="project-full-header">
                    <span class="project-full-index">${String(index + 1).padStart(2, '0')}</span>
                    <h2 class="project-full-title">${escapeHTML(project.title)}</h2>
                </div>
                <div class="detail-tags">${tagsHTML}</div>
                ${project.long_description ? `<p class="detail-long-desc">${escapeHTML(project.long_description)}</p>` : ''}
                ${demoBtnHTML}
                ${snippetsHTML ? `<h3 class="detail-subheading">Code</h3><div class="code-snippets">${snippetsHTML}</div>` : ''}
                ${terminalSession.length ? renderTerminalHTML(project.id) : ''}
            </div>
        </section>
    `;
}

function renderTerminalHTML(id) {
    return `
        <h3 class="detail-subheading">Terminal</h3>
        <p class="terminal-disclaimer"><span class="terminal-disclaimer-icon" aria-hidden="true">&#9432;</span> This is not a live terminal. It is real captured output from running my code, replayed here for demonstration.</p>
        <div class="terminal-window">
            <div class="terminal-header">
                <span class="terminal-dot red"></span>
                <span class="terminal-dot yellow"></span>
                <span class="terminal-dot green"></span>
                <span class="terminal-title">session</span>
            </div>
            <div class="terminal-body" id="terminal-body-${id}"></div>
            <div class="terminal-input-line">
                <span class="terminal-prompt">$</span>
                <input type="text" id="terminal-input-${id}" class="terminal-input" autocomplete="off" spellcheck="false" placeholder="Type a command and press Enter...">
            </div>
            <div class="terminal-hints" id="terminal-hints-${id}"></div>
        </div>
    `;
}

function initTerminal(id, session) {
    const body = document.getElementById(`terminal-body-${id}`);
    const input = document.getElementById(`terminal-input-${id}`);
    const hints = document.getElementById(`terminal-hints-${id}`);
    if (!body || !input || !hints) return;

    hints.innerHTML = session
        .map(pair => `<button type="button" class="terminal-hint-chip">${escapeHTML(pair.input)}</button>`)
        .join('');

    function appendLine(text, cls) {
        const line = document.createElement('div');
        line.className = cls;
        line.textContent = text;
        body.appendChild(line);
        body.scrollTop = body.scrollHeight;
    }

    function runCommand(value) {
        const trimmed = value.trim();
        if (!trimmed) return;
        appendLine(`$ ${trimmed}`, 'terminal-line-cmd');
        const match = session.find(pair => pair.input === trimmed);
        appendLine(match ? match.output : `command not found: ${trimmed}`, match ? 'terminal-line-output' : 'terminal-line-error');
        input.value = '';
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            runCommand(input.value);
        }
    });

    hints.addEventListener('click', (e) => {
        if (e.target.classList.contains('terminal-hint-chip')) {
            input.value = e.target.textContent;
            input.focus();
        }
    });
}

function initProjectSearch() {
    const input = document.getElementById('project-search-input');
    const feed = document.getElementById('projects-feed');
    if (!input || !feed) return;

    input.addEventListener('input', () => {
        const query = input.value.trim().toLowerCase();
        const sections = feed.querySelectorAll('.project-full-section');
        let visibleCount = 0;

        sections.forEach(section => {
            const matches = !query || (section.dataset.search || '').includes(query);
            section.hidden = !matches;
            if (matches) visibleCount++;
        });

        let emptyMsg = feed.querySelector('.project-search-empty');
        if (visibleCount === 0) {
            if (!emptyMsg) {
                emptyMsg = document.createElement('p');
                emptyMsg.className = 'project-search-empty';
                emptyMsg.textContent = 'No projects match your search.';
                feed.appendChild(emptyMsg);
            }
        } else if (emptyMsg) {
            emptyMsg.remove();
        }
    });
}

initProjectSearch();
