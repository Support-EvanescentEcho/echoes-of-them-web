// Theme Switcher Logic
function applyTheme(themeChoice) {
    const htmlElement = document.documentElement;
    if (themeChoice === 'system') {
        localStorage.removeItem('theme');
        const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        htmlElement.setAttribute('data-theme', systemIsDark ? 'dark' : 'light');
    } else {
        localStorage.setItem('theme', themeChoice);
        htmlElement.setAttribute('data-theme', themeChoice);
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const selectElement = document.getElementById('theme-select');
    
    if (savedTheme) {
        applyTheme(savedTheme);
        if (selectElement) selectElement.value = savedTheme;
    } else {
        applyTheme('system');
        if (selectElement) selectElement.value = 'system';
    }
}

// Language and Translation Logic
let currentLanguage = 'en';
let currentChangelogChannel = 'release';

async function loadTranslations(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        return await response.json();
    } catch (error) {
        console.warn(`Could not load locales/${lang}.json, falling back to English:`, error);
        if (lang !== 'en') {
            return await loadTranslations('en');
        }
        return null;
    }
}

async function loadChangelogData(lang) {
    try {
        const response = await fetch(`locales/changelog_${lang}.json`);
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        return await response.json();
    } catch (error) {
        console.warn(`Could not load locales/changelog_${lang}.json, falling back to English:`, error);
        if (lang !== 'en') {
            return await loadChangelogData('en');
        }
        return null;
    }
}

function safeSetText(id, text) {
    const el = document.getElementById(id);
    if (el && text !== undefined && text !== null) {
        el.innerText = text;
    }
}

async function applyLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('lang', lang);
    document.body.className = '';
    document.body.classList.add('lang-active-' + lang);

    const langSelect = document.getElementById('lang-select');
    if (langSelect) langSelect.value = lang;

    const dict = await loadTranslations(lang);
    if (!dict) return;

    // Head & Logo
    document.title = dict.title || "Echoes of Them — Support, Terms & Privacy";
    safeSetText('logo-sub', dict.logoSub);
    safeSetText('theme-lbl', dict.themeLbl);
    safeSetText('lang-lbl', dict.langLbl);
    safeSetText('theme-opt-light', dict.themeLight);
    safeSetText('theme-opt-dark', dict.themeDark);
    safeSetText('theme-opt-system', dict.themeSystem);

    // Hero
    safeSetText('hero-title', dict.heroTitle);
    safeSetText('hero-desc', dict.heroDesc);
    safeSetText('downloadPlayStore', dict.downloadPlayStore);
    safeSetText('downloadWindows', dict.downloadWindows);
    safeSetText('downloadLinux', dict.downloadLinux);
    safeSetText('downloadApk', dict.downloadApk);

    // Tabs
    safeSetText('tab-home', dict.tabHome);
    safeSetText('tab-changelog', dict.tabChangelog);
    safeSetText('tab-roadmap', dict.tabRoadmap);
    safeSetText('tab-project', dict.tabProject);
    safeSetText('tab-legal', dict.tabLegal);

    // Features
    safeSetText('featuresTitle', dict.featuresTitle);
    safeSetText('featTableTitle', dict.featTableTitle);
    safeSetText('featTableDesc', dict.featTableDesc);
    safeSetText('featNoAiTitle', dict.featNoAiTitle);
    safeSetText('featNoAiDesc', dict.featNoAiDesc);
    safeSetText('featCapsuleTitle', dict.featCapsuleTitle);
    safeSetText('featCapsuleDesc', dict.featCapsuleDesc);
    safeSetText('featHtmlPlayerTitle', dict.featHtmlPlayerTitle);
    safeSetText('featHtmlPlayerDesc', dict.featHtmlPlayerDesc);
    safeSetText('featNoGameTitle', dict.featNoGameTitle);
    safeSetText('featNoGameDesc', dict.featNoGameDesc);
    safeSetText('featDesktopTitle', dict.featDesktopTitle);
    safeSetText('featDesktopDesc', dict.featDesktopDesc);

    // Privacy & Microphone
    safeSetText('privacyTitle', dict.privacyTitle);
    safeSetText('privMicTitle', dict.privMicTitle);
    safeSetText('privMicDesc', dict.privMicDesc);
    safeSetText('privStorageTitle', dict.privStorageTitle);
    safeSetText('privStorageDesc', dict.privStorageDesc);
    safeSetText('privControlTitle', dict.privControlTitle);
    safeSetText('privControlDesc', dict.privControlDesc);

    // Tiers & Support
    safeSetText('tiersTitle', dict.tiersTitle);
    safeSetText('tierOneTimeBadge', dict.tierOneTimeBadge);
    safeSetText('tierOneTimeTitle', dict.tierOneTimeTitle);
    safeSetText('tierOneTimeDesc', dict.tierOneTimeDesc);
    safeSetText('tierMonthlyBadge', dict.tierMonthlyBadge);
    safeSetText('tierMonthlyTitle', dict.tierMonthlyTitle);
    safeSetText('tierMonthlyDesc', dict.tierMonthlyDesc);
    safeSetText('disclaimer_title', dict.disclaimer_title);
    safeSetText('disclaimer_desc', dict.disclaimer_desc);
    safeSetText('support_title', dict.support_title);
    safeSetText('support_desc', dict.support_desc);
    safeSetText('kofi-btn', dict.kofiBtn);
    safeSetText('contact-lbl', dict.contactLbl);
    safeSetText('copy-email-btn', dict.copyBtnText || '[Copy]');

    // Footprint / Mark
    safeSetText('footprintTitle', dict.footprintTitle);
    safeSetText('footprintDesc', dict.footprintDesc);
    safeSetText('footprintCategoriesTitle', dict.footprintCategoriesTitle);
    safeSetText('footprintCat1Title', dict.footprintCat1Title);
    safeSetText('footprintCat1Desc', dict.footprintCat1Desc);
    safeSetText('footprintCat2Title', dict.footprintCat2Title);
    safeSetText('footprintCat2Desc', dict.footprintCat2Desc);
    safeSetText('footprintCat3Title', dict.footprintCat3Title);
    safeSetText('footprintCat3Desc', dict.footprintCat3Desc);
    safeSetText('footprintCat4Title', dict.footprintCat4Title);
    safeSetText('footprintCat4Desc', dict.footprintCat4Desc);

    // Changelog tab labels
    safeSetText('changelogTitle', dict.changelogTitle);
    safeSetText('changelogDesc', dict.changelogDesc);
    safeSetText('subtab-release-lbl', dict.changelogRelease);
    safeSetText('subtab-beta-lbl', dict.changelogBeta);
    safeSetText('subtab-alpha-lbl', dict.changelogAlpha);
    safeSetText('changelogAlphaNotice', dict.changelogAlphaNotice);

    // Roadmap
    safeSetText('roadmapMainTitle', dict.roadmapMainTitle);
    safeSetText('roadmapDesc', dict.roadmapDesc);
    safeSetText('roadmapPlanned', dict.roadmapPlanned);
    safeSetText('roadmapInProgress', dict.roadmapInProgress);
    safeSetText('roadmapCompleted', dict.roadmapCompleted);
    safeSetText('roadmapItemP2P', dict.roadmapItemP2P);
    safeSetText('roadmapItemBook', dict.roadmapItemBook);
    safeSetText('roadmapItemWaveform', dict.roadmapItemWaveform);
    safeSetText('roadmapItemDesktop', dict.roadmapItemDesktop);
    safeSetText('roadmapItem10Langs', dict.roadmapItem10Langs);
    safeSetText('roadmapItemColorblind', dict.roadmapItemColorblind);
    safeSetText('roadmapItemEchoesCipher', dict.roadmapItemEchoesCipher);
    safeSetText('roadmapItemTableMode', dict.roadmapItemTableMode);
    safeSetText('roadmapItemHtmlExport', dict.roadmapItemHtmlExport);
    safeSetText('roadmapItemZeroBiometric', dict.roadmapItemZeroBiometric);

    // The Project
    safeSetText('projectTitle', dict.projectTitle);
    safeSetText('projectDesc1', dict.projectDesc1);
    safeSetText('projectInspirationTitle', dict.projectInspirationTitle);
    safeSetText('projectInspirationDesc', dict.projectInspirationDesc);
    safeSetText('quote-text', dict.quoteText);
    safeSetText('quote-author', dict.quoteAuthor);
    safeSetText('projectSoundtrackDesc', dict.projectSoundtrackDesc);
    safeSetText('projectInspirationListTitle', dict.projectInspirationListTitle);
    safeSetText('projectTechTitle', dict.projectTechTitle);
    safeSetText('projectTechDesc1', dict.projectTechDesc1);
    safeSetText('projectTechDesc2', dict.projectTechDesc2);

    // Legal & FAQ
    safeSetText('faq-main-title', dict.faqMainTitle);
    safeSetText('faq-capsule-title', dict.faqCapsuleTitle);
    safeSetText('faq-capsule-desc', dict.faqCapsuleDesc);
    safeSetText('faq-html-title', dict.faqHtmlTitle);
    safeSetText('faq-html-desc', dict.faqHtmlDesc);
    safeSetText('faq-table-title', dict.faqTableTitle);
    safeSetText('faq-table-desc', dict.faqTableDesc);
    safeSetText('faq-voice-title', dict.faqVoiceTitle);
    safeSetText('faq-voice-desc', dict.faqVoiceDesc);
    safeSetText('faq-desktop-title', dict.faqDesktopTitle);
    safeSetText('faq-desktop-desc', dict.faqDesktopDesc);

    safeSetText('priv-updated', dict.privUpdated);
    safeSetText('priv-main-title', dict.privMainTitle);
    safeSetText('priv-sec1-title', dict.privSec1Title);
    safeSetText('priv-sec1-body', dict.privSec1Body);
    safeSetText('priv-sec2-title', dict.privSec2Title);
    safeSetText('priv-sec2-body', dict.privSec2Body);
    safeSetText('priv-sec3-title', dict.privSec3Title);
    safeSetText('priv-sec3-body', dict.privSec3Body);
    safeSetText('priv-sec4-title', dict.privSec4Title);
    safeSetText('priv-sec4-body', dict.privSec4Body);

    safeSetText('terms-updated', dict.termsUpdated);
    safeSetText('terms-main-title', dict.termsMainTitle);
    safeSetText('terms-sec1-title', dict.termsSec1Title);
    safeSetText('terms-sec1-body', dict.termsSec1Body);
    safeSetText('terms-sec2-title', dict.termsSec2Title);
    safeSetText('terms-sec2-body', dict.termsSec2Body);
    safeSetText('terms-sec3-title', dict.termsSec3Title);
    safeSetText('terms-sec3-body', dict.termsSec3Body);
    safeSetText('terms-sec4-title', dict.termsSec4Title);
    safeSetText('terms-sec4-body', dict.termsSec4Body);

    // Footer
    safeSetText('footer-text', dict.footerText);
    safeSetText('footerPrivacyLink', dict.footerPrivacyLink);
    safeSetText('footer-version', dict.footerVersion);

    // Reload changelog in current language
    renderChangelog();
}

// Tab Switching
function switchTab(evt, tabId) {
    const panels = document.querySelectorAll('.tab-panel');
    panels.forEach(p => p.classList.remove('active'));

    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(b => b.classList.remove('active'));

    const targetPanel = document.getElementById('panel-' + tabId);
    if (targetPanel) targetPanel.classList.add('active');

    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    }
}

// Changelog Channel Switch
function switchChangelogChannel(channel) {
    currentChangelogChannel = channel;
    const subtabs = document.querySelectorAll('.changelog-subtabs .subtab-btn');
    subtabs.forEach(btn => btn.classList.remove('active'));

    const targetBtn = document.getElementById('subtab-' + channel + '-lbl');
    if (targetBtn) targetBtn.classList.add('active');

    const noticeBox = document.getElementById('changelog-alpha-notice-box');
    if (noticeBox) {
        noticeBox.style.display = (channel === 'alpha') ? 'block' : 'none';
    }

    renderChangelog();
}

async function renderChangelog() {
    const timeline = document.getElementById('changelog-timeline');
    if (!timeline) return;

    const data = await loadChangelogData(currentLanguage);
    if (!data || !data[currentChangelogChannel] || data[currentChangelogChannel].length === 0) {
        timeline.innerHTML = `<p style="color: var(--text-secondary); font-style: italic; text-align: center; padding: 2rem;">No entries in this log history.</p>`;
        return;
    }

    const items = data[currentChangelogChannel];
    timeline.innerHTML = items.map(entry => `
        <div class="changelog-item">
            <div class="changelog-meta">
                <span class="changelog-version">${entry.version}</span>
                <span class="changelog-date">${entry.date}</span>
            </div>
            <h3 class="changelog-title">${entry.title}</h3>
            <ul class="changelog-list">
                ${entry.changes.map(ch => `<li>${ch}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// Copy support email
function copySupportEmail() {
    const email = "support.evanescentecho@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const btn = document.getElementById('copy-email-btn');
        if (btn) {
            const original = btn.innerText;
            btn.innerText = "[Copied!]";
            setTimeout(() => { btn.innerText = original; }, 2000);
        }
    }).catch(err => {
        console.error("Failed to copy email:", err);
    });
}

// Initialization on load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    // Listen for OS theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (!localStorage.getItem('theme')) {
            applyTheme('system');
        }
    });

    // Detect browser/saved language
    const savedLang = localStorage.getItem('lang');
    let targetLang = 'en';
    if (savedLang) {
        targetLang = savedLang;
    } else {
        const browserLang = (navigator.language || 'en').slice(0, 2).toLowerCase();
        const supported = ['en', 'es', 'de', 'fr', 'it', 'ja', 'ko', 'pt', 'ru', 'zh'];
        if (supported.includes(browserLang)) {
            targetLang = browserLang;
        }
    }

    applyLanguage(targetLang);
});
