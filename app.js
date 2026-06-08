/* app/app.js */

// ==========================================
// 1. DATA STRUCTURES & CONFIGURATION
// ==========================================

const MONOPHTHONGS = [
    { symbol: "iː", name: "ee (see)" },
    { symbol: "ɪ", name: "i (sit)" },
    { symbol: "e", name: "e (ten)" },
    { symbol: "æ", name: "a (cat)" },
    { symbol: "ɑː", name: "ah (father)" },
    { symbol: "ɒ", name: "o (hot)" },
    { symbol: "ɔː", name: "aw (saw)" },
    { symbol: "ʊ", name: "u (put)" },
    { symbol: "uː", name: "oo (too)" },
    { symbol: "ʌ", name: "uh (cup)" },
    { symbol: "ɜː", name: "er (fur)" },
    { symbol: "ə", name: "schwa (about)" }
];

const DIPHTHONGS = [
    { symbol: "eɪ", name: "ey (say)" },
    { symbol: "aɪ", name: "ay (my)" },
    { symbol: "ɔɪ", name: "oy (boy)" },
    { symbol: "aʊ", name: "ow (now)" },
    { symbol: "oʊ", name: "oh (go)" }, // Maps both oʊ and əʊ
    { symbol: "ɪə", name: "ear (near)" },
    { symbol: "eə", name: "air (hair)" },
    { symbol: "ʊə", name: "ure (pure)" }
];

const CONSONANTS = [
    { symbol: "p", name: "p (pen)" },
    { symbol: "b", name: "b (bad)" },
    { symbol: "t", name: "t (tea)" },
    { symbol: "d", name: "d (did)" },
    { symbol: "k", name: "k (cat)" },
    { symbol: "g", name: "g (got)" },
    { symbol: "f", name: "f (fall)" },
    { symbol: "v", name: "v (voice)" },
    { symbol: "θ", name: "th (thin)" },
    { symbol: "ð", name: "th (this)" },
    { symbol: "s", name: "s (see)" },
    { symbol: "z", name: "z (zoo)" },
    { symbol: "ʃ", name: "sh (she)" },
    { symbol: "ʒ", name: "zh (vision)" },
    { symbol: "h", name: "h (how)" },
    { symbol: "tʃ", name: "ch (chin)" },
    { symbol: "dʒ", name: "j (jam)" },
    { symbol: "m", name: "m (man)" },
    { symbol: "n", name: "n (no)" },
    { symbol: "ŋ", name: "ng (sing)" },
    { symbol: "l", name: "l (leg)" },
    { symbol: "r", name: "r (red)" },
    { symbol: "w", name: "w (wet)" },
    { symbol: "j", name: "y (yes)" }
];

// Map stressed vowels in data to their UI symbols
const VOWEL_MAPPINGS = {
    "iː": "iː", "i:": "iː", "i": "iː",
    "ɪ": "ɪ",
    "e": "e", "ɛ": "e",
    "æ": "æ",
    "ɑː": "ɑː", "ɑ:": "ɑː", "ɑ": "ɑː",
    "ɒ": "ɒ",
    "ɔː": "ɔː", "ɔ:": "ɔː", "ɔ": "ɔː",
    "ʊ": "ʊ",
    "uː": "uː", "u:": "uː",
    "ʌ": "ʌ",
    "ɜː": "ɜː", "ɜ:": "ɜː", "ɝ": "ɜː",
    "ə": "ə",
    "eɪ": "eɪ",
    "aɪ": "aɪ",
    "ɔɪ": "ɔɪ",
    "aʊ": "aʊ",
    "oʊ": "oʊ", "əʊ": "oʊ",
    "ɪə": "ɪə", "ɪr": "ɪə",
    "eə": "eə", "ɛr": "eə", "er": "eə",
    "ʊə": "ʊə", "ʊr": "ʊə"
};

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================

let state = {
    currentSound: "iː",       // Active IPA symbol
    isVowelMode: true,        // Active sound is a vowel
    searchQuery: "",          // Search string
    selectedCefr: "all",      // active CEFR filter (all, A1, A2...)
    selectedPos: "all",       // active POS filter
    activeMode: "study",      // study, flashcard, bookmark, learned
    renderedCount: 0,         // For infinite scroll
    flashcardIndex: 0,        // Current flashcard
    bookmarks: new Set(),     // Bookmarked words list
    learned: new Set(),       // Learned words list
    expandedCards: new Set()  // Tracking expanded cards in grid view
};

// Load storage settings
function loadLocalStorage() {
    try {
        const savedBookmarks = localStorage.getItem("ipa_bookmarks");
        if (savedBookmarks) {
            state.bookmarks = new Set(JSON.parse(savedBookmarks));
        }
        const savedLearned = localStorage.getItem("ipa_learned");
        if (savedLearned) {
            state.learned = new Set(JSON.parse(savedLearned));
        }
    } catch (e) {
        console.error("Failed to load local storage data:", e);
    }
}

function saveBookmarks() {
    localStorage.setItem("ipa_bookmarks", JSON.stringify([...state.bookmarks]));
    document.getElementById("bookmarkCount").textContent = state.bookmarks.size;
}

function saveLearned() {
    localStorage.setItem("ipa_learned", JSON.stringify([...state.learned]));
    document.getElementById("learnedCount").textContent = state.learned.size;
}

// ==========================================
// 3. SOUND FILTER LOGIC
// ==========================================

// Get clean name for sound symbol
function getSoundName(symbol) {
    const list = [...MONOPHTHONGS, ...DIPHTHONGS, ...CONSONANTS];
    const match = list.find(s => s.symbol === symbol);
    return match ? match.name : "";
}

// Check if a word matches the current sound filter
function wordMatchesSound(word, sound) {
    // If we're in bookmark or learned mode, we ignore the active sound tab
    if (state.activeMode === "bookmark" || state.activeMode === "learned") {
        return true;
    }
    
    const isVowel = [...MONOPHTHONGS, ...DIPHTHONGS].some(v => v.symbol === sound);
    if (isVowel) {
        // Map stressed vowel of word to UI vowel symbol
        const mappedVowel = VOWEL_MAPPINGS[word.stressed_vowel];
        return mappedVowel === sound;
    } else {
        // Consonant matching
        return word.consonants.includes(sound);
    }
}

// Get count of words matching a sound symbol
function getWordCountForSound(symbol) {
    const isVowel = [...MONOPHTHONGS, ...DIPHTHONGS].some(v => v.symbol === symbol);
    return VOCABULARY_DATA.filter(w => {
        if (isVowel) {
            return VOWEL_MAPPINGS[w.stressed_vowel] === symbol;
        } else {
            return w.consonants.includes(symbol);
        }
    }).length;
}

// Filter dataset according to active filters
function getFilteredData() {
    return VOCABULARY_DATA.filter(w => {
        // Mode filter
        if (state.activeMode === "bookmark" && !state.bookmarks.has(w.word)) return false;
        if (state.activeMode === "learned" && !state.learned.has(w.word)) return false;
        
        // Sound filter (only if not viewing bookmarks or learned lists)
        if (state.activeMode !== "bookmark" && state.activeMode !== "learned") {
            if (!wordMatchesSound(w, state.currentSound)) return false;
        }
        
        // CEFR filter
        if (state.selectedCefr !== "all" && w.cefr.toLowerCase() !== state.selectedCefr.toLowerCase()) return false;
        
        // POS filter
        if (state.selectedPos !== "all" && w.pos.toLowerCase() !== state.selectedPos.toLowerCase()) return false;
        
        // Search filter
        if (state.searchQuery !== "") {
            const q = state.searchQuery.toLowerCase();
            const wordMatch = w.word.toLowerCase().includes(q);
            const defViMatch = w.def_vi.toLowerCase().includes(q);
            const defEnMatch = w.def_en.toLowerCase().includes(q);
            const ipaMatch = w.ipa.toLowerCase().includes(q);
            if (!wordMatch && !defViMatch && !defEnMatch && !ipaMatch) return false;
        }
        
        return true;
    });
}

// ==========================================
// 4. SPELLING PATTERN DETECTOR (JS VERSION)
// ==========================================
function detectSpellingPattern(word, sound) {
    const w = word.toLowerCase();
    
    switch(sound) {
        case "iː":
            if (w.includes("ee")) return "ee";
            if (w.includes("ea")) return "ea";
            if (w.includes("ie")) return "ie";
            if (w.includes("ei")) return "ei";
            if (w.includes("ey")) return "ey";
            if (w.includes("eo")) return "eo";
            if (w.endsWith("e") || w.replace(/[^aeiouy]/g, "") === "e") return "e";
            if (w.endsWith("y")) return "y";
            if (w.includes("i")) return "i";
            return "e";
        case "ɪ":
            if (w.includes("y")) return "y";
            if (w.includes("ui")) return "ui";
            if (w.includes("i")) return "i";
            if (w.includes("e")) return "e";
            return "i";
        case "e":
            if (w.includes("ea")) return "ea";
            if (w.includes("ai")) return "ai";
            if (w.includes("ay")) return "ay";
            if (w.includes("ie")) return "ie";
            if (w.includes("e")) return "e";
            return "e";
        case "æ":
            return "a";
        case "ɑː":
            if (w.includes("ar")) return "ar";
            if (w.includes("al")) return "al";
            if (w.includes("au")) return "au";
            if (w.includes("a")) return "a";
            return "a";
        case "ɒ":
            if (w.includes("ou")) return "ou";
            if (w.includes("ow")) return "ow";
            if (w.includes("a")) return "a";
            if (w.includes("o")) return "o";
            return "o";
        case "ɔː":
            if (w.includes("aw")) return "aw";
            if (w.includes("au")) return "au";
            if (w.includes("al")) return "al";
            if (w.includes("or")) return "or";
            if (w.includes("ore")) return "ore";
            if (w.includes("oar")) return "oar";
            if (w.includes("oor")) return "oor";
            if (w.includes("our")) return "our";
            if (w.includes("ough")) return "ough";
            if (w.includes("augh")) return "augh";
            if (w.includes("a")) return "a";
            return "or";
        case "ʊ":
            if (w.includes("oo")) return "oo";
            if (w.includes("ou")) return "ou";
            if (w.includes("u")) return "u";
            if (w.includes("o")) return "o";
            return "u";
        case "uː":
            if (w.includes("oo")) return "oo";
            if (w.includes("ue")) return "ue";
            if (w.includes("ui")) return "ui";
            if (w.includes("ew")) return "ew";
            if (w.includes("oe")) return "oe";
            if (w.includes("ou")) return "ou";
            if (w.includes("ough")) return "ough";
            if (w.includes("u")) return "u";
            if (w.includes("o")) return "o";
            return "oo";
        case "ʌ":
            if (w.includes("ou")) return "ou";
            if (w.includes("oo")) return "oo";
            if (w.includes("oe")) return "oe";
            if (w.includes("o")) return "o";
            if (w.includes("u")) return "u";
            return "u";
        case "ɜː":
            if (w.includes("ear")) return "ear";
            if (w.includes("er")) return "er";
            if (w.includes("ir")) return "ir";
            if (w.includes("ur")) return "ur";
            if (w.includes("or")) return "or";
            if (w.includes("yr")) return "yr";
            return "er";
        case "ə":
            if (w.includes("a")) return "a";
            if (w.includes("e")) return "e";
            if (w.includes("o")) return "o";
            if (w.includes("u")) return "u";
            if (w.includes("i")) return "i";
            return "ə";
        case "eɪ":
            if (w.includes("ai")) return "ai";
            if (w.includes("ay")) return "ay";
            if (w.includes("ei")) return "ei";
            if (w.includes("ey")) return "ey";
            if (w.includes("ea")) return "ea";
            if (w.includes("eigh")) return "eigh";
            if (/a[b-df-hj-np-tv-z]e/.test(w)) return "a_e";
            if (w.includes("a")) return "a";
            return "a";
        case "aɪ":
            if (w.includes("ie")) return "ie";
            if (w.includes("igh")) return "igh";
            if (w.includes("uy")) return "uy";
            if (w.includes("ey")) return "ey";
            if (w.includes("y")) return "y";
            if (/i[b-df-hj-np-tv-z]e/.test(w)) return "i_e";
            if (w.includes("i")) return "i";
            return "i";
        case "ɔɪ":
            if (w.includes("oi")) return "oi";
            if (w.includes("oy")) return "oy";
            return "oi";
        case "aʊ":
            if (w.includes("ou")) return "ou";
            if (w.includes("ow")) return "ow";
            return "ou";
        case "oʊ":
            if (w.includes("oa")) return "oa";
            if (w.includes("ow")) return "ow";
            if (w.includes("oe")) return "oe";
            if (w.includes("ou")) return "ou";
            if (w.includes("ough")) return "ough";
            if (/o[b-df-hj-np-tv-z]e/.test(w)) return "o_e";
            if (w.includes("o")) return "o";
            return "o";
        case "ɪə":
            if (w.includes("eer")) return "eer";
            if (w.includes("ear")) return "ear";
            if (w.includes("ere")) return "ere";
            if (w.includes("ier")) return "ier";
            return "ear";
        case "eə":
            if (w.includes("air")) return "air";
            if (w.includes("are")) return "are";
            if (w.includes("ear")) return "ear";
            if (w.includes("ere")) return "ere";
            if (w.includes("eir")) return "eir";
            return "air";
        case "ʊə":
            if (w.includes("ure")) return "ure";
            if (w.includes("our")) return "our";
            if (w.includes("oor")) return "oor";
            return "ure";
        case "p":
            return w.includes("pp") ? "pp" : "p";
        case "b":
            return w.includes("bb") ? "bb" : "b";
        case "t":
            if (w.includes("tt")) return "tt";
            if (w.endsWith("ed")) return "ed";
            return "t";
        case "d":
            if (w.includes("dd")) return "dd";
            if (w.endsWith("ed")) return "ed";
            return "d";
        case "k":
            if (w.includes("ck")) return "ck";
            if (w.includes("ch")) return "ch";
            if (w.includes("qu")) return "qu";
            if (w.includes("x")) return "x";
            if (w.includes("k")) return "k";
            return "c";
        case "g":
            if (w.includes("gg")) return "gg";
            if (w.includes("gh")) return "gh";
            return "g";
        case "f":
            if (w.includes("ff")) return "ff";
            if (w.includes("ph")) return "ph";
            if (w.includes("gh")) return "gh";
            return "f";
        case "v":
            if (w.includes("vv")) return "vv";
            if (w === "of") return "f";
            return "v";
        case "θ":
        case "ð":
            return "th";
        case "s":
            if (w.includes("ss")) return "ss";
            if (w.includes("sc")) return "sc";
            if (w.includes("ps")) return "ps";
            if (w.includes("c")) return "c";
            return "s";
        case "z":
            if (w.includes("zz")) return "zz";
            if (w.includes("s")) return "s";
            return "z";
        case "ʃ":
            if (w.includes("sh")) return "sh";
            if (w.includes("ch")) return "ch";
            if (w.includes("ti")) return "ti";
            if (w.includes("ci")) return "ci";
            if (w.includes("si")) return "si";
            return "sh";
        case "ʒ":
            if (w.includes("si")) return "si";
            if (w.includes("s")) return "s";
            return "s";
        case "h":
            return w.includes("wh") ? "wh" : "h";
        case "tʃ":
            if (w.includes("tch")) return "tch";
            if (w.includes("ti")) return "ti";
            if (w.includes("t")) return "t";
            return "ch";
        case "dʒ":
            if (w.includes("dg")) return "dg";
            if (w.includes("g")) return "g";
            if (w.includes("j")) return "j";
            return "j";
        case "m":
            if (w.includes("mm")) return "mm";
            if (w.includes("mb")) return "mb";
            return "m";
        case "n":
            if (w.includes("nn")) return "nn";
            if (w.includes("kn")) return "kn";
            if (w.includes("gn")) return "gn";
            return "n";
        case "ŋ":
            if (w.includes("ng")) return "ng";
            if (w.includes("n")) return "n";
            return "ng";
        case "l":
            return w.includes("ll") ? "ll" : "l";
        case "r":
            if (w.includes("rr")) return "rr";
            if (w.includes("wr")) return "wr";
            if (w.includes("rh")) return "rh";
            return "r";
        case "w":
            if (w.includes("wh")) return "wh";
            if (w.includes("u")) return "u";
            return "w";
        case "j":
            if (w.includes("u")) return "u";
            if (w.includes("y")) return "y";
            return "y";
        default:
            return sound;
    }
}

// ==========================================
// 5. AUDIO PLAYBACK
// ==========================================

function playAudio(word, accentType) {
    // accentType: 2 = US, 1 = UK
    const url = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(word)}&type=${accentType}`;
    const audio = new Audio(url);
    audio.play().catch(err => {
        console.error("Audio playback failed:", err);
    });
}

// ==========================================
// 6. MICROPHONE PRONUNCIATION GRADER
// ==========================================

let recognition = null;
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
}

function startSpeechCheck(word) {
    if (!recognition) {
        alert("Trình duyệt của bạn không hỗ trợ Web Speech API nhận diện giọng nói (Khuyên dùng Google Chrome hoặc Safari mới nhất).");
        return;
    }

    const overlay = document.getElementById("speechOverlay");
    const wordToSayText = document.getElementById("speechWordToSay");
    const transcriptText = document.getElementById("speechTranscript");
    const resultText = document.getElementById("speechResult");

    wordToSayText.textContent = word;
    transcriptText.textContent = '"..."';
    resultText.style.display = "none";
    resultText.className = "speech-result";
    
    overlay.classList.add("active");

    recognition.onstart = () => {
        console.log("Speech recognition started");
    };

    recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        transcriptText.textContent = `"${result}"`;

        // Clean both strings for comparison
        const cleanOriginal = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").trim();
        const cleanSpoken = result.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").trim();

        if (cleanOriginal === cleanSpoken) {
            resultText.textContent = "✓ Phát âm rất chuẩn! Xuất sắc!";
            resultText.classList.add("success");
            resultText.style.display = "block";
            // Set word as learned automatically on success!
            state.learned.add(word);
            saveLearned();
            updateStatsBanner();
        } else {
            resultText.textContent = "✗ Phát âm chưa chuẩn. Hãy thử lại!";
            resultText.classList.add("error");
            resultText.style.display = "block";
        }
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        transcriptText.textContent = `Lỗi nhận diện: ${event.error}`;
    };

    recognition.onend = () => {
        console.log("Speech recognition ended");
    };

    try {
        recognition.start();
    } catch(e) {
        console.error(e);
    }
}

// ==========================================
// 7. RENDER LOGIC
// ==========================================

// Build Sidebar sound grid
function renderSidebar() {
    const renderSection = (containerId, soundList) => {
        const container = document.getElementById(containerId);
        container.innerHTML = "";
        
        soundList.forEach(s => {
            const count = getWordCountForSound(s.symbol);
            
            const pill = document.createElement("button");
            pill.className = `sound-pill ${state.currentSound === s.symbol && (state.activeMode === "study" || state.activeMode === "flashcard") ? "active" : ""}`;
            pill.setAttribute("data-sound", s.symbol);
            pill.setAttribute("aria-label", `Âm ${s.symbol}, có ${count} từ`);
            
            pill.innerHTML = `
                <span class="sound-pill-symbol">/${s.symbol}/</span>
                <span class="sound-pill-count">${count} từ</span>
            `;
            
            pill.addEventListener("click", () => {
                // Remove active class from all pills
                document.querySelectorAll(".sound-pill").forEach(p => p.classList.remove("active"));
                pill.classList.add("active");
                
                // If currently viewing bookmarks or learned list, switch back to study mode automatically
                if (state.activeMode === "bookmark" || state.activeMode === "learned") {
                    state.activeMode = "study";
                    document.querySelectorAll(".nav-tab-btn").forEach(t => t.classList.remove("active"));
                    document.getElementById("tabStudy").classList.add("active");
                }
                
                state.currentSound = s.symbol;
                
                // Track if vowel or consonant
                state.isVowelMode = [...MONOPHTHONGS, ...DIPHTHONGS].some(v => v.symbol === s.symbol);
                
                state.renderedCount = 0; // Reset pagination
                state.expandedCards.clear();
                state.flashcardIndex = 0; // Reset flashcard index
                
                // Close sidebar on mobile
                document.getElementById("appSidebar").classList.remove("open");
                
                updateView();
            });
            
            container.appendChild(pill);
        });
    };

    renderSection("monophthongsGrid", MONOPHTHONGS);
    renderSection("diphthongsGrid", DIPHTHONGS);
    renderSection("consonantsGrid", CONSONANTS);
}

// Stats & Banner
function updateStatsBanner() {
    const banner = document.getElementById("currentSoundBanner");
    const countSpan = document.getElementById("bannerSoundCount");
    
    // Total count for current sound
    const filteredTotal = getFilteredData();
    
    if (state.activeMode === "bookmark") {
        document.getElementById("bannerSoundSymbol").innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
        document.getElementById("bannerSoundName").textContent = "Từ vựng đã lưu";
        countSpan.textContent = `${filteredTotal.length} từ đã lưu trữ`;
    } else if (state.activeMode === "learned") {
        document.getElementById("bannerSoundSymbol").innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
        document.getElementById("bannerSoundName").textContent = "Từ vựng đã thuộc";
        countSpan.textContent = `${filteredTotal.length} từ đã học thuộc lòng`;
    } else {
        // Normal sound view
        document.getElementById("bannerSoundSymbol").textContent = `/${state.currentSound}/`;
        document.getElementById("bannerSoundName").textContent = getSoundName(state.currentSound);
        countSpan.textContent = `${filteredTotal.length} từ vựng phù hợp bộ lọc`;
    }
    
    // Update stats pill inside banner
    const currentSoundWords = getFilteredData();
    const learnedInCurrent = currentSoundWords.filter(w => state.learned.has(w.word)).length;
    
    document.getElementById("soundStatLearned").textContent = learnedInCurrent;
    document.getElementById("soundStatTotal").textContent = currentSoundWords.length;
}

// Main View Router
function updateView() {
    updateStatsBanner();
    
    const studyView = document.getElementById("studyView");
    const flashcardView = document.getElementById("flashcardView");
    const emptyStateView = document.getElementById("emptyStateView");
    
    const filtered = getFilteredData();
    
    if (filtered.length === 0) {
        studyView.classList.remove("active");
        flashcardView.classList.remove("active");
        emptyStateView.classList.add("active");
        return;
    }
    
    emptyStateView.classList.remove("active");
    
    if (state.activeMode === "study" || state.activeMode === "bookmark" || state.activeMode === "learned") {
        studyView.classList.add("active");
        flashcardView.classList.remove("active");
        renderVocabularyGrid(filtered);
    } else if (state.activeMode === "flashcard") {
        studyView.classList.remove("active");
        flashcardView.classList.add("active");
        renderFlashcard(filtered);
    }
}

// Render Grid cards
function renderVocabularyGrid(filteredWords) {
    const grid = document.getElementById("vocabularyGrid");
    
    // Infinite Scroll logic: Render initial 30 items
    if (state.renderedCount === 0) {
        grid.innerHTML = "";
    }
    
    const startIdx = state.renderedCount;
    const endIdx = Math.min(startIdx + 30, filteredWords.length);
    
    if (startIdx >= filteredWords.length) {
        document.getElementById("loadingTrigger").style.display = "none";
        return;
    }
    
    // Show spinner if there are more words to load
    if (endIdx < filteredWords.length) {
        document.getElementById("loadingTrigger").style.display = "flex";
    } else {
        document.getElementById("loadingTrigger").style.display = "none";
    }
    
    for (let i = startIdx; i < endIdx; i++) {
        const w = filteredWords[i];
        const isBookmarked = state.bookmarks.has(w.word);
        const isLearned = state.learned.has(w.word);
        const isExpanded = state.expandedCards.has(w.word);
        const spellingPattern = detectSpellingPattern(w.word, state.currentSound);
        
        const card = document.createElement("article");
        card.className = "vocab-card";
        card.setAttribute("id", `card-${w.word}`);
        
        card.innerHTML = `
            <div>
                <div class="card-header">
                    <h4 class="card-word-title">${w.word}</h4>
                    <div class="badge-row">
                        <span class="pos-badge">${w.pos}</span>
                        <span class="cefr-badge cefr-${w.cefr.toLowerCase()}">${w.cefr}</span>
                    </div>
                </div>
                
                <div class="card-ipa-row">
                    <span class="card-ipa">${w.ipa}</span>
                    <div class="card-audio-btns">
                        <button class="audio-mini-btn play-us-btn" title="Nghe giọng Mỹ"><i class="fa-solid fa-volume-high"></i> US</button>
                        <button class="audio-mini-btn play-uk-btn" title="Nghe giọng Anh"><i class="fa-solid fa-volume-high"></i> UK</button>
                    </div>
                </div>
                
                <div class="card-meanings">
                    <p class="card-vi">${w.def_vi}</p>
                    <p class="card-en">${w.def_en}</p>
                </div>
                
                <div class="card-spelling">
                    Dấu hiệu âm: <strong>${spelling_pattern}</strong>
                </div>

                <div class="card-expandable ${isExpanded ? "show" : ""}">
                    <div class="expand-group">
                        <span class="expand-group-title">Hoàn cảnh giao tiếp:</span>
                        <p class="expand-group-desc">${w.context}</p>
                    </div>
                    <div class="expand-group">
                        <span class="expand-group-title">Cấu trúc & Ví dụ:</span>
                        <pre class="expand-examples">${w.grammar}</pre>
                    </div>
                </div>
            </div>
            
            <div class="card-footer-actions">
                <div class="card-interactive-actions">
                    <button class="card-action-icon-btn bookmark-btn ${isBookmarked ? "active" : ""}" title="Lưu từ"><i class="fa-solid fa-bookmark"></i></button>
                    <button class="card-action-icon-btn learned-btn ${isLearned ? "active" : ""}" title="Đánh dấu đã thuộc"><i class="fa-solid fa-circle-check"></i></button>
                    <button class="card-action-icon-btn mic-mini-btn" title="Luyện nói"><i class="fa-solid fa-microphone"></i></button>
                </div>
                
                <button class="expand-toggle-btn ${isExpanded ? "active" : ""}">
                    <span>${isExpanded ? "Thu gọn" : "Xem ví dụ"}</span> <i class="fa-solid fa-chevron-down"></i>
                </button>
            </div>
        `;
        
        // --- Bind Card Clicks ---
        
        // Audio US
        card.querySelector(".play-us-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            playAudio(w.word, 2);
        });
        
        // Audio UK
        card.querySelector(".play-uk-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            playAudio(w.word, 1);
        });

        // Expand chevron
        card.querySelector(".expand-toggle-btn").addEventListener("click", () => {
            const expandable = card.querySelector(".card-expandable");
            const btn = card.querySelector(".expand-toggle-btn");
            const isShown = expandable.classList.toggle("show");
            btn.classList.toggle("active");
            btn.querySelector("span").textContent = isShown ? "Thu gọn" : "Xem ví dụ";
            
            if (isShown) {
                state.expandedCards.add(w.word);
            } else {
                state.expandedCards.delete(w.word);
            }
        });

        // Bookmark Toggle
        const bookmarkBtn = card.querySelector(".bookmark-btn");
        bookmarkBtn.addEventListener("click", () => {
            if (state.bookmarks.has(w.word)) {
                state.bookmarks.delete(w.word);
                bookmarkBtn.classList.remove("active");
            } else {
                state.bookmarks.add(w.word);
                bookmarkBtn.classList.add("active");
            }
            saveBookmarks();
            // If in Bookmark list tab, trigger re-filter
            if (state.activeMode === "bookmark") {
                updateView();
            }
        });

        // Learned Toggle
        const learnedBtn = card.querySelector(".learned-btn");
        learnedBtn.addEventListener("click", () => {
            if (state.learned.has(w.word)) {
                state.learned.delete(w.word);
                learnedBtn.classList.remove("active");
            } else {
                state.learned.add(w.word);
                learnedBtn.classList.add("active");
            }
            saveLearned();
            updateStatsBanner();
            // If in Learned list tab, trigger re-filter
            if (state.activeMode === "learned") {
                updateView();
            }
        });

        // Mic Speech Practice
        card.querySelector(".mic-mini-btn").addEventListener("click", () => {
            startSpeechCheck(w.word);
        });
        
        grid.appendChild(card);
    }
    
    state.renderedCount = endIdx;
}

// Render Flashcard
function renderFlashcard(filteredWords) {
    // Check range bounds
    if (state.flashcardIndex >= filteredWords.length) {
        state.flashcardIndex = 0;
    }
    if (state.flashcardIndex < 0) {
        state.flashcardIndex = filteredWords.length - 1;
    }
    
    const w = filteredWords[state.flashcardIndex];
    
    // Front elements
    document.getElementById("fcWord").textContent = w.word;
    document.getElementById("fcPos").textContent = w.pos;
    document.getElementById("fcIpa").textContent = w.ipa;
    
    const spellingPattern = detectSpellingPattern(w.word, state.currentSound);
    document.getElementById("fcSpelling").textContent = spellingPattern;
    
    const cefrBadge = document.getElementById("fcCefr");
    cefrBadge.className = `cefr-badge cefr-${w.cefr.toLowerCase()}`;
    cefrBadge.textContent = w.cefr;
    
    // Back elements
    document.getElementById("fcDefVi").textContent = w.def_vi;
    document.getElementById("fcDefEn").textContent = w.def_en;
    document.getElementById("fcContext").textContent = w.context;
    document.getElementById("fcGrammar").textContent = w.grammar;
    
    // Progress
    document.getElementById("fcProgress").textContent = `${state.flashcardIndex + 1} / ${filteredWords.length}`;
    
    // Actions style reset
    const card = document.getElementById("flipCard");
    card.classList.remove("flipped"); // Ensure front shows
    
    const bookmarkBtn = document.getElementById("fcBookmarkBtn");
    if (state.bookmarks.has(w.word)) {
        bookmarkBtn.className = "fc-action-btn action-bookmark active";
        bookmarkBtn.innerHTML = `<i class="fa-solid fa-bookmark"></i> Đã lưu từ`;
    } else {
        bookmarkBtn.className = "fc-action-btn action-bookmark";
        bookmarkBtn.innerHTML = `<i class="fa-solid fa-bookmark"></i> Lưu từ`;
    }
    
    const learnedBtn = document.getElementById("fcLearnedBtn");
    if (state.learned.has(w.word)) {
        learnedBtn.className = "fc-action-btn action-learned active";
        learnedBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Đã thuộc`;
    } else {
        learnedBtn.className = "fc-action-btn action-learned";
        learnedBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Đã thuộc`;
    }
}

// Setup Next / Prev for Flashcards
function setupFlashcardActions() {
    const card = document.getElementById("flipCard");
    
    // Flip on click (unless clicking on interactive buttons)
    card.addEventListener("click", (e) => {
        if (e.target.closest('.fc-audio-btn') || e.target.closest('.fc-mic-btn') || e.target.closest('.fc-action-btn')) {
            return; // Don't flip when trigger actions
        }
        card.classList.toggle("flipped");
    });
    
    // US Voice
    document.getElementById("fcAudioUsBtn").addEventListener("click", (e) => {
        e.stopPropagation();
        const word = document.getElementById("fcWord").textContent;
        playAudio(word, 2);
    });
    
    // UK Voice
    document.getElementById("fcAudioUkBtn").addEventListener("click", (e) => {
        e.stopPropagation();
        const word = document.getElementById("fcWord").textContent;
        playAudio(word, 1);
    });

    // Mic
    document.getElementById("fcMicBtn").addEventListener("click", (e) => {
        e.stopPropagation();
        const word = document.getElementById("fcWord").textContent;
        startSpeechCheck(word);
    });

    // Bookmark Action inside flashcard
    document.getElementById("fcBookmarkBtn").addEventListener("click", (e) => {
        e.stopPropagation();
        const filtered = getFilteredData();
        const w = filtered[state.flashcardIndex];
        const btn = document.getElementById("fcBookmarkBtn");
        
        if (state.bookmarks.has(w.word)) {
            state.bookmarks.delete(w.word);
            btn.className = "fc-action-btn action-bookmark";
            btn.innerHTML = `<i class="fa-solid fa-bookmark"></i> Lưu từ`;
        } else {
            state.bookmarks.add(w.word);
            btn.className = "fc-action-btn action-bookmark active";
            btn.innerHTML = `<i class="fa-solid fa-bookmark"></i> Đã lưu từ`;
        }
        saveBookmarks();
    });

    // Learned Action inside flashcard
    document.getElementById("fcLearnedBtn").addEventListener("click", (e) => {
        e.stopPropagation();
        const filtered = getFilteredData();
        const w = filtered[state.flashcardIndex];
        const btn = document.getElementById("fcLearnedBtn");
        
        if (state.learned.has(w.word)) {
            state.learned.delete(w.word);
            btn.className = "fc-action-btn action-learned";
            btn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Đã thuộc`;
        } else {
            state.learned.add(w.word);
            btn.className = "fc-action-btn action-learned active";
            btn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Đã thuộc`;
        }
        saveLearned();
        updateStatsBanner();
    });

    // Next button
    document.getElementById("fcNextBtn").addEventListener("click", () => {
        const filtered = getFilteredData();
        state.flashcardIndex++;
        if (state.flashcardIndex >= filtered.length) {
            state.flashcardIndex = 0;
        }
        renderFlashcard(filtered);
    });

    // Prev button
    document.getElementById("fcPrevBtn").addEventListener("click", () => {
        const filtered = getFilteredData();
        state.flashcardIndex--;
        if (state.flashcardIndex < 0) {
            state.flashcardIndex = filtered.length - 1;
        }
        renderFlashcard(filtered);
    });
}

// ==========================================
// 8. EVENT BINDINGS & INIT
// ==========================================

function setupEventListeners() {
    // Theme toggle
    document.getElementById("themeToggleBtn").addEventListener("click", () => {
        const body = document.body;
        const icon = document.querySelector("#themeToggleBtn i");
        if (body.classList.contains("dark-theme")) {
            body.classList.replace("dark-theme", "light-theme");
            icon.className = "fa-solid fa-moon";
        } else {
            body.classList.replace("light-theme", "dark-theme");
            icon.className = "fa-solid fa-sun";
        }
    });

    // Hamburger Mobile Menu
    document.getElementById("menuToggleBtn").addEventListener("click", () => {
        document.getElementById("appSidebar").classList.add("open");
    });
    
    document.getElementById("closeSidebarBtn").addEventListener("click", () => {
        document.getElementById("appSidebar").classList.remove("open");
    });

    // Search input
    document.getElementById("searchInput").addEventListener("input", (e) => {
        state.searchQuery = e.target.value.trim();
        state.renderedCount = 0;
        state.expandedCards.clear();
        state.flashcardIndex = 0;
        updateView();
    });

    // CEFR filter buttons
    document.getElementById("cefrFilterContainer").addEventListener("click", (e) => {
        const btn = e.target.closest(".cefr-btn");
        if (!btn) return;
        
        document.querySelectorAll(".cefr-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        state.selectedCefr = btn.getAttribute("data-cefr");
        state.renderedCount = 0;
        state.expandedCards.clear();
        state.flashcardIndex = 0;
        updateView();
    });

    // POS Select dropdown
    document.getElementById("posSelectInput").addEventListener("change", (e) => {
        state.selectedPos = e.target.value;
        state.renderedCount = 0;
        state.expandedCards.clear();
        state.flashcardIndex = 0;
        updateView();
    });

    // Tabs navigation click
    document.querySelectorAll(".nav-tab-btn").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".nav-tab-btn").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            
            state.activeMode = tab.getAttribute("data-mode");
            state.renderedCount = 0;
            state.expandedCards.clear();
            state.flashcardIndex = 0;
            updateView();
        });
    });

    // Speech Modal close
    document.getElementById("closeSpeechBtn").addEventListener("click", () => {
        document.getElementById("speechOverlay").classList.remove("active");
        if (recognition) {
            recognition.stop();
        }
    });

    // Infinite Scroll trigger via window scroll
    window.addEventListener("scroll", () => {
        if (state.activeMode === "flashcard") return;
        
        // Scroll check
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            const filtered = getFilteredData();
            if (state.renderedCount < filtered.length) {
                renderVocabularyGrid(filtered);
            }
        }
    });
}

// Global initialization on page load
window.addEventListener("DOMContentLoaded", () => {
    loadLocalStorage();
    saveBookmarks();
    saveLearned();
    
    renderSidebar();
    setupEventListeners();
    setupFlashcardActions();
    
    // Initial run
    updateView();
});
