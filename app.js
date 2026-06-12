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

const GRAMMAR_TOPICS = [
    {
        id: "pos",
        title: "Parts of Speech (Các Từ Loại)",
        icon: "fa-solid fa-font",
        subtitle: "How to identify Nouns, Verbs, Adjectives, Adverbs... / Phân loại và cách sử dụng Danh từ, Động từ, Tính từ, Trạng từ...",
        contentHtml: `
            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-list-check"></i> Major Parts of Speech <small class="title-vi">/ Phân loại từ loại chính</small></h4>
                <p class="grammar-text">In conversational and academic English, words are categorized into content word classes and auxiliary function classes:<span class="grammar-text-vi">Trong tiếng Anh giao tiếp và học thuật, từ vựng được chia làm các nhóm từ loại thực từ chính và các nhóm hư từ bổ trợ:</span></p>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Part of Speech <small>Từ loại</small></th>
                                <th>Symbol <small>Ký hiệu</small></th>
                                <th>Function <small>Chức năng</small></th>
                                <th>Examples <small>Ví dụ mẫu</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Noun (Danh từ)</strong></td>
                                <td><code>noun</code></td>
                                <td>Refers to people, things, places, concepts. Acts as S or O.<small>Chỉ người, vật, địa điểm, khái niệm. Làm S hoặc O.</small></td>
                                <td>ability, child, government</td>
                            </tr>
                            <tr>
                                <td><strong>Verb (Động từ)</strong></td>
                                <td><code>verb</code></td>
                                <td>Represents actions or states. The core of a sentence.<small>Chỉ hành động, trạng thái. Là trung tâm của câu.</small></td>
                                <td>abandon, build, achieve</td>
                            </tr>
                            <tr>
                                <td><strong>Adjective (Tính từ)</strong></td>
                                <td><code>adj</code></td>
                                <td>Describes noun properties. Placed before N or after Be.<small>Mô tả tính chất của danh từ. Đứng trước N hoặc sau Be.</small></td>
                                <td>beautiful, able, dynamic</td>
                            </tr>
                            <tr>
                                <td><strong>Adverb (Trạng từ)</strong></td>
                                <td><code>adverb</code></td>
                                <td>Modifies V, Adj, or a sentence. Indicates manner, frequency.<small>Bổ nghĩa cho V, Adj hoặc cả câu. Chỉ cách thức, tần suất.</small></td>
                                <td>absolutely, quickly, carefully</td>
                            </tr>
                            <tr>
                                <td><strong>Preposition (Giới từ)</strong></td>
                                <td><code>prep</code></td>
                                <td>Indicates spatial/temporal relationship between phrases.<small>Chỉ mối quan hệ không gian, thời gian giữa các cụm từ.</small></td>
                                <td>above, about, behind</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-circle-question"></i> Suffix Identification Guide <small class="title-vi">/ Nhận biết hậu tố nhanh</small></h4>
                <ul class="grammar-list">
                    <li><strong>Noun:</strong> Often ends in <code>-tion</code>, <code>-ment</code>, <code>-ty</code>, <code>-ness</code>, <code>-er/or</code>, <code>-ship</code> (e.g. action, development, ability).<small>Thường tận cùng bằng -tion, -ment, -ty, -ness, -er/or, -ship.</small></li>
                    <li><strong>Adjective:</strong> Often ends in <code>-ful</code>, <code>-less</code>, <code>-ive</code>, <code>-ous</code>, <code>-able/ible</code>, <code>-al</code> (e.g. careful, hopeless, creative).<small>Thường tận cùng bằng -ful, -less, -ive, -ous, -able/ible, -al.</small></li>
                    <li><strong>Adverb:</strong> Usually <code>Adjective + -ly</code> (e.g. slowly, absolutely).<small>Thường là Tính từ + -ly.</small></li>
                    <li><strong>Verb:</strong> Often ends in <code>-ate</code>, <code>-ify</code>, <code>-ize/ise</code>, <code>-en</code> (e.g. accelerate, clarify, realize).<small>Thường tận cùng bằng -ate, -ify, -ize/ise, -en.</small></li>
                </ul>
            </div>

            <div class="grammar-box-tip">
                <i class="fa-solid fa-lightbulb"></i>
                <div>
                    <strong>Vocabulary Tip / Mẹo học từ vựng:</strong> When learning a new word, always look up its related word family. For example: <em>able (adj) -> ability (noun) -> enable (verb) -> ably (adv)</em>. This quadruples your vocabulary acquisition speed!<br><span class="grammar-box-desc-vi">Khi học 1 từ mới, hãy luôn tra cứu các từ loại liên quan của nó (Word Family). Ví dụ: able (adj) -> ability (noun) -> enable (verb) -> ably (adv). Việc này giúp bạn nhân 4 lần tốc độ học từ vựng!</span>
                </div>
            </div>
        `
    },
    {
        id: "tenses",
        title: "12 English Tenses (12 Thì Tiếng Anh)",
        icon: "fa-solid fa-clock",
        subtitle: "Formula system and identifying signals of 12 basic tenses / Hệ thống công thức và dấu hiệu nhận biết của 12 thì căn bản",
        contentHtml: `
            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-clock"></i> 1. Present Simple <small class="title-vi">/ Thì Hiện tại Đơn</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Form <small>Thể</small></th>
                                <th>Formula (Verb & Be) <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>(+) Affirmative</strong></td>
                                <td><code>S + V(s/es)</code> / <code>S + am/is/are + N/Adj</code></td>
                                <td>She works in London. / He is a doctor.</td>
                            </tr>
                            <tr>
                                <td><strong>(-) Negative</strong></td>
                                <td><code>S + do/does + not + V-inf</code> / <code>S + am/is/are + not</code></td>
                                <td>She doesn't work in London. / He is not a doctor.</td>
                            </tr>
                            <tr>
                                <td><strong>(?) Interrogative</strong></td>
                                <td><code>Do/Does + S + V-inf?</code> / <code>Am/Is/Are + S + ...?</code></td>
                                <td>Does she work in London? / Is he a doctor?</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Habits, repeated actions, and permanent truths.<small>Thói quen, hành động lặp đi lặp lại hoặc chân lý, sự thật hiển nhiên.</small></li>
                    <li><strong>Signals / Dấu hiệu:</strong> always, usually, often, sometimes, rarely, every day/week/month...<small>Các trạng từ chỉ tần suất hoặc cụm từ chỉ chu kỳ thời gian.</small></li>
                </ul>
            </div>

            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-clock"></i> 2. Present Continuous <small class="title-vi">/ Thì Hiện tại Tiếp diễn</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Form <small>Thể</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>(+) Affirmative</strong></td>
                                <td><code>S + am/is/are + V-ing</code></td>
                                <td>They are playing football now.</td>
                            </tr>
                            <tr>
                                <td><strong>(-) Negative</strong></td>
                                <td><code>S + am/is/are + not + V-ing</code></td>
                                <td>They are not playing football now.</td>
                            </tr>
                            <tr>
                                <td><strong>(?) Interrogative</strong></td>
                                <td><code>Am/Is/Are + S + V-ing?</code></td>
                                <td>Are they playing football now?</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Actions happening right now, or temporary situations.<small>Hành động đang xảy ra tại thời điểm nói hoặc các tình huống mang tính tạm thời.</small></li>
                    <li><strong>Signals / Dấu hiệu:</strong> now, right now, at the moment, at present, Look!, Listen!...<small>Các trạng từ chỉ hiện tại tức thời hoặc các từ gây chú ý.</small></li>
                </ul>
            </div>

            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-clock"></i> 3. Present Perfect <small class="title-vi">/ Thì Hiện tại Hoàn thành</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Form <small>Thể</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>(+) Affirmative</strong></td>
                                <td><code>S + have/has + V3/ed</code></td>
                                <td>I have visited New York twice.</td>
                            </tr>
                            <tr>
                                <td><strong>(-) Negative</strong></td>
                                <td><code>S + have/has + not + V3/ed</code></td>
                                <td>I have not visited New York.</td>
                            </tr>
                            <tr>
                                <td><strong>(?) Interrogative</strong></td>
                                <td><code>Have/Has + S + V3/ed?</code></td>
                                <td>Have you ever visited New York?</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Actions that happened at an unspecified time, or started in the past and continue to present.<small>Hành động xảy ra tại thời điểm không xác định, hoặc bắt đầu ở quá khứ kéo dài đến hiện tại.</small></li>
                    <li><strong>Signals / Dấu hiệu:</strong> already, yet, just, ever, never, since + point in time, for + duration...<small>Các từ chỉ trải nghiệm, thời gian kéo dài, hoặc vừa mới xảy ra.</small></li>
                </ul>
            </div>

            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-clock"></i> 4. Present Perfect Continuous <small class="title-vi">/ Thì Hiện tại Hoàn thành Tiếp diễn</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Form <small>Thể</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>(+) Affirmative</strong></td>
                                <td><code>S + have/has + been + V-ing</code></td>
                                <td>She has been waiting for two hours.</td>
                            </tr>
                            <tr>
                                <td><strong>(-) Negative</strong></td>
                                <td><code>S + have/has + not + been + V-ing</code></td>
                                <td>She hasn't been waiting for long.</td>
                            </tr>
                            <tr>
                                <td><strong>(?) Interrogative</strong></td>
                                <td><code>Have/Has + S + been + V-ing?</code></td>
                                <td>How long has she been waiting?</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Actions that started in past and are still continuing, emphasizing duration.<small>Hành động bắt đầu trong quá khứ và vẫn tiếp tục ở hiện tại, nhấn mạnh vào tính liên tục và thời lượng.</small></li>
                    <li><strong>Signals / Dấu hiệu:</strong> all day/week, since, for, recently, lately...<small>Nhấn mạnh khoảng thời gian kéo dài liên tục từ quá khứ đến nay.</small></li>
                </ul>
            </div>

            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-clock"></i> 5. Past Simple <small class="title-vi">/ Thì Quá khứ Đơn</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Form <small>Thể</small></th>
                                <th>Formula (Verb & Be) <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>(+) Affirmative</strong></td>
                                <td><code>S + V2/ed</code> / <code>S + was/were + N/Adj</code></td>
                                <td>He bought a new car yesterday. / They were happy.</td>
                            </tr>
                            <tr>
                                <td><strong>(-) Negative</strong></td>
                                <td><code>S + did + not + V-inf</code> / <code>S + was/were + not</code></td>
                                <td>He didn't buy a new car. / They were not happy.</td>
                            </tr>
                            <tr>
                                <td><strong>(?) Interrogative</strong></td>
                                <td><code>Did + S + V-inf?</code> / <code>Was/Were + S + ...?</code></td>
                                <td>Did he buy a new car? / Were they happy?</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Actions completed at a specific time in the past.<small>Hành động đã xảy ra và chấm dứt hoàn toàn tại một thời điểm xác định trong quá khứ.</small></li>
                    <li><strong>Signals / Dấu hiệu:</strong> yesterday, ago, last week/year, in 1999, when I was young...<small>Các mốc thời gian đã qua trong quá khứ.</small></li>
                </ul>
            </div>

            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-clock"></i> 6. Past Continuous <small class="title-vi">/ Thì Quá khứ Tiếp diễn</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Form <small>Thể</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>(+) Affirmative</strong></td>
                                <td><code>S + was/were + V-ing</code></td>
                                <td>I was sleeping at 10 PM last night.</td>
                            </tr>
                            <tr>
                                <td><strong>(-) Negative</strong></td>
                                <td><code>S + was/were + not + V-ing</code></td>
                                <td>I wasn't sleeping at 10 PM last night.</td>
                            </tr>
                            <tr>
                                <td><strong>(?) Interrogative</strong></td>
                                <td><code>Was/Were + S + V-ing?</code></td>
                                <td>Were you sleeping at 10 PM last night?</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Actions happening at a specific past moment, or interrupted actions.<small>Hành động đang xảy ra tại một thời điểm cụ thể trong quá khứ, hoặc đang xảy ra thì bị hành động khác xen vào.</small></li>
                    <li><strong>Signals / Dấu hiệu:</strong> at + specific past time, while, as, when...<small>Tại thời điểm cụ thể trong quá khứ, hoặc trong mối quan hệ xen kẽ hành động.</small></li>
                </ul>
            </div>

            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-clock"></i> 7. Past Perfect <small class="title-vi">/ Thì Quá khứ Hoàn thành</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Form <small>Thể</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>(+) Affirmative</strong></td>
                                <td><code>S + had + V3/ed</code></td>
                                <td>The train had left before we arrived.</td>
                            </tr>
                            <tr>
                                <td><strong>(-) Negative</strong></td>
                                <td><code>S + had + not + V3/ed</code></td>
                                <td>The train hadn't left when we arrived.</td>
                            </tr>
                            <tr>
                                <td><strong>(?) Interrogative</strong></td>
                                <td><code>Had + S + V3/ed?</code></td>
                                <td>Had the train left before you arrived?</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Actions completed before another action in the past.<small>Hành động xảy ra và hoàn thành trước một hành động khác trong quá khứ (Hành động trước chia QKHT, hành động sau chia QKĐ).</small></li>
                    <li><strong>Signals / Dấu hiệu:</strong> before, after, by the time, as soon as, when...<small>Các liên từ chỉ thứ tự trước sau của các hành động trong quá khứ.</small></li>
                </ul>
            </div>

            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-clock"></i> 8. Past Perfect Continuous <small class="title-vi">/ Thì Quá khứ Hoàn thành Tiếp diễn</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Form <small>Thể</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>(+) Affirmative</strong></td>
                                <td><code>S + had + been + V-ing</code></td>
                                <td>He had been playing games for 3 hours before dinner.</td>
                            </tr>
                            <tr>
                                <td><strong>(-) Negative</strong></td>
                                <td><code>S + had + not + been + V-ing</code></td>
                                <td>He hadn't been playing games for long.</td>
                            </tr>
                            <tr>
                                <td><strong>(?) Interrogative</strong></td>
                                <td><code>Had + S + been + V-ing?</code></td>
                                <td>Had he been playing games before dinner?</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Past action that was ongoing until another past action occurred.<small>Hành động xảy ra liên tục trước một thời điểm hoặc một hành động khác trong quá khứ, nhấn mạnh khoảng thời gian kéo dài của hành động trước đó.</small></li>
                    <li><strong>Signals / Dấu hiệu:</strong> before, until, by the time, for, since...<small>Nhấn mạnh thời lượng kéo dài liên tục trước một mốc quá khứ khác.</small></li>
                </ul>
            </div>

            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-clock"></i> 9. Future Simple <small class="title-vi">/ Thì Tương lai Đơn</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Form <small>Thể</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>(+) Affirmative</strong></td>
                                <td><code>S + will + V-inf</code></td>
                                <td>I will call you tomorrow.</td>
                            </tr>
                            <tr>
                                <td><strong>(-) Negative</strong></td>
                                <td><code>S + will + not + V-inf</code></td>
                                <td>I will not call you tomorrow.</td>
                            </tr>
                            <tr>
                                <td><strong>(?) Interrogative</strong></td>
                                <td><code>Will + S + V-inf?</code></td>
                                <td>Will you call me tomorrow?</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Instant decisions, predictions without evidence, or promises.<small>Quyết định đưa ra ngay lúc nói, dự đoán không có căn cứ thực tế, hoặc lời hứa/lời mời.</small></li>
                    <li><strong>Signals / Dấu hiệu:</strong> tomorrow, next week/year, in the future, think, believe, hope...<small>Thời điểm tương lai hoặc đi sau các động từ chỉ quan điểm cá nhân.</small></li>
                </ul>
            </div>

            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-clock"></i> 10. Future Continuous <small class="title-vi">/ Thì Tương lai Tiếp diễn</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Form <small>Thể</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>(+) Affirmative</strong></td>
                                <td><code>S + will + be + V-ing</code></td>
                                <td>This time tomorrow, I will be flying to Paris.</td>
                            </tr>
                            <tr>
                                <td><strong>(-) Negative</strong></td>
                                <td><code>S + will + not + be + V-ing</code></td>
                                <td>This time tomorrow, I won't be flying to Paris.</td>
                            </tr>
                            <tr>
                                <td><strong>(?) Interrogative</strong></td>
                                <td><code>Will + S + be + V-ing?</code></td>
                                <td>Will you be flying to Paris this time tomorrow?</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Actions that will be in progress at a specific time in the future.<small>Hành động sẽ đang xảy ra tại một thời điểm cụ thể trong tương lai.</small></li>
                    <li><strong>Signals / Dấu hiệu:</strong> at this time tomorrow/next week, at + future time...<small>Tại mốc thời gian cụ thể ở tương lai.</small></li>
                </ul>
            </div>

            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-clock"></i> 11. Future Perfect <small class="title-vi">/ Thì Tương lai Hoàn thành</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Form <small>Thể</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>(+) Affirmative</strong></td>
                                <td><code>S + will + have + V3/ed</code></td>
                                <td>By next month, we will have finished the project.</td>
                            </tr>
                            <tr>
                                <td><strong>(-) Negative</strong></td>
                                <td><code>S + will + not + have + V3/ed</code></td>
                                <td>By next month, we won't have finished the project.</td>
                            </tr>
                            <tr>
                                <td><strong>(?) Interrogative</strong></td>
                                <td><code>Will + S + have + V3/ed?</code></td>
                                <td>Will we have finished the project by next month?</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Actions that will be completed before a specific point in the future.<small>Hành động sẽ hoàn thành trước một thời điểm hoặc một hành động khác trong tương lai.</small></li>
                    <li><strong>Signals / Dấu hiệu:</strong> by, by the time, by the end of + future time...<small>Trước một mốc thời gian xác định ở tương lai.</small></li>
                </ul>
            </div>

            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-clock"></i> 12. Future Perfect Continuous <small class="title-vi">/ Thì Tương lai Hoàn thành Tiếp diễn</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Form <small>Thể</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>(+) Affirmative</strong></td>
                                <td><code>S + will + have + been + V-ing</code></td>
                                <td>By 5 PM, he will have been working for 8 hours.</td>
                            </tr>
                            <tr>
                                <td><strong>(-) Negative</strong></td>
                                <td><code>S + will + not + have + been + V-ing</code></td>
                                <td>By 5 PM, he won't have been working for that long.</td>
                            </tr>
                            <tr>
                                <td><strong>(?) Interrogative</strong></td>
                                <td><code>Will + S + have + been + V-ing?</code></td>
                                <td>Will he have been working for 8 hours by 5 PM?</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Ongoing actions that will continue up to a specific future moment.<small>Hành động đã và đang xảy ra kéo dài liên tục đến một thời điểm xác định trong tương lai, nhấn mạnh vào thời lượng liên tục của hành động đó.</small></li>
                    <li><strong>Signals / Dấu hiệu:</strong> by then, by the time, for + duration...<small>Thời gian kéo dài liên tục trước một mốc tương lai.</small></li>
                </ul>
            </div>
        `
    },
    {
        id: "passive",
        title: "Passive Voice (Câu Bị Động)",
        icon: "fa-solid fa-arrows-spin",
        subtitle: "How to convert active sentences to passive / Cách chuyển đổi câu chủ động sang bị động và các cấu trúc đặc biệt",
        contentHtml: `
            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-repeat"></i> General Conversion Rules <small class="title-vi">/ Quy tắc chuyển đổi tổng quát</small></h4>
                <p class="grammar-text">The purpose of passive voice is to emphasize the <strong>action</strong> or the <strong>receiver</strong> of the action, rather than the doer.<span class="grammar-text-vi">Mục đích của câu bị động là nhấn mạnh vào hành động hoặc đối tượng chịu tác động, thay vì người thực hiện hành động.</span></p>
                <ul class="grammar-list">
                    <li>Step 1: Make the object (O) of the active sentence the subject (S) of the passive sentence.<small>Bước 1: Lấy tân ngữ (O) của câu chủ động làm chủ ngữ (S) câu bị động.</small></li>
                    <li>Step 2: Conjugate the verb <code>be</code> based on the tense of the active verb.<small>Bước 2: Chia động từ be theo đúng thì của động từ chính câu chủ động.</small></li>
                    <li>Step 3: Convert the main verb into the Past Participle form <code>V3/ed</code>.<small>Bước 3: Chuyển động từ chính về dạng Quá khứ Phân từ V3/ed.</small></li>
                    <li>Step 4: Turn the original subject (S) into a <code>by + Agent</code> phrase at the end of the sentence.<small>Bước 4: Chuyển chủ ngữ (S) của câu chủ động thành cụm by + Agent đặt cuối câu.</small></li>
                </ul>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Tense <small>Thì</small></th>
                                <th>Active <small>Chủ động</small></th>
                                <th>Passive <small>Bị động</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Present Simple<small>Hiện tại Đơn</small></td>
                                <td>S + V(s/es) + O</td>
                                <td><strong>S + am/is/are + V3/ed + (by O)</strong></td>
                            </tr>
                            <tr>
                                <td>Past Simple<small>Quá khứ Đơn</small></td>
                                <td>S + V2/ed + O</td>
                                <td><strong>S + was/were + V3/ed + (by O)</strong></td>
                            </tr>
                            <tr>
                                <td>Present Perfect<small>Hiện tại Hoàn thành</small></td>
                                <td>S + have/has + V3/ed + O</td>
                                <td><strong>S + have/has + been + V3/ed + (by O)</strong></td>
                            </tr>
                            <tr>
                                <td>Modal Verbs<small>Động từ khuyết thiếu</small></td>
                                <td>S + will/can/must + V-inf + O</td>
                                <td><strong>S + will/can/must + be + V3/ed + (by O)</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `
    },
    {
        id: "conditionals",
        title: "Conditional Sentences (Câu Điều Kiện)",
        icon: "fa-solid fa-code-fork",
        subtitle: "Types 0, 1, 2, 3 and mixed conditional formulas / Phân loại câu điều kiện loại 0, 1, 2, 3 và câu điều kiện hỗn hợp",
        contentHtml: `
            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-gears"></i> 1. Zero Conditional <small class="title-vi">/ Câu điều kiện loại 0</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Clause <small>Mệnh đề</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>If Clause (Condition)</strong></td>
                                <td><code>If + S + V(s/es)</code></td>
                                <td>If you heat ice,</td>
                            </tr>
                            <tr>
                                <td><strong>Main Clause (Result)</strong></td>
                                <td><code>S + V(s/es)</code></td>
                                <td>it melts.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Scientific facts, general truths, or automatic results.<small>Chân lý khoa học, sự thật hiển nhiên, thói quen hoặc kết quả tất yếu.</small></li>
                </ul>
            </div>

            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-gears"></i> 2. First Conditional <small class="title-vi">/ Câu điều kiện loại 1</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Clause <small>Mệnh đề</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>If Clause (Condition)</strong></td>
                                <td><code>If + S + V(s/es)</code></td>
                                <td>If it rains tomorrow,</td>
                            </tr>
                            <tr>
                                <td><strong>Main Clause (Result)</strong></td>
                                <td><code>S + will/can/may + V-inf</code></td>
                                <td>we will cancel the picnic.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Real or possible situations in the present or future.<small>Điều kiện có thật hoặc hoàn toàn có khả năng xảy ra ở hiện tại hoặc tương lai.</small></li>
                </ul>
            </div>

            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-gears"></i> 3. Second Conditional <small class="title-vi">/ Câu điều kiện loại 2</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Clause <small>Mệnh đề</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>If Clause (Condition)</strong></td>
                                <td><code>If + S + V2/ed</code> <em>(were for all subjects)</em></td>
                                <td>If I were you,</td>
                            </tr>
                            <tr>
                                <td><strong>Main Clause (Result)</strong></td>
                                <td><code>S + would/could/might + V-inf</code></td>
                                <td>I would buy that car.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Hypothetical or unreal situations in the present or future.<small>Giả thiết không có thật, trái với thực tế ở hiện tại hoặc tương lai.</small></li>
                </ul>
            </div>

            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-gears"></i> 4. Third Conditional <small class="title-vi">/ Câu điều kiện loại 3</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Clause <small>Mệnh đề</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>If Clause (Condition)</strong></td>
                                <td><code>If + S + had + V3/ed</code></td>
                                <td>If she had studied harder,</td>
                            </tr>
                            <tr>
                                <td><strong>Main Clause (Result)</strong></td>
                                <td><code>S + would/could/might + have + V3/ed</code></td>
                                <td>she would have passed the exam.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Unreal conditions in the past, expressing regret or criticism.<small>Giả thiết trái ngược hoàn toàn với thực tế đã xảy ra trong quá khứ.</small></li>
                </ul>
            </div>

            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-gears"></i> 5. Mixed Conditionals <small class="title-vi">/ Câu điều kiện hỗn hợp</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Clause <small>Mệnh đề</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>If Clause (Past Condition)</strong></td>
                                <td><code>If + S + had + V3/ed</code> <em>(Type 3 condition)</em></td>
                                <td>If I had won the lottery yesterday,</td>
                            </tr>
                            <tr>
                                <td><strong>Main Clause (Present Result)</strong></td>
                                <td><code>S + would/could + V-inf</code> <em>(Type 2 result)</em></td>
                                <td>I would be rich today.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Past actions/conditions that have a direct result in the present.<small>Giả thiết trái ngược quá khứ dẫn đến kết quả trái ngược thực tế hiện tại.</small></li>
                </ul>
            </div>
        `
    },
    {
        id: "relative",
        title: "Relative Clauses (Mệnh Đề Quan Hệ)",
        icon: "fa-solid fa-link",
        subtitle: "How to use Who, Whom, Which, That, Whose / Cách sử dụng Who, Whom, Which, That, Whose để nối câu",
        contentHtml: `
            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-network-wired"></i> 1. Who <small class="title-vi">/ Dùng cho người làm Chủ ngữ/Tân ngữ</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Role <small>Vai trò</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Subject (Chủ ngữ)</strong></td>
                                <td><code>... N (person) + WHO + V + O ...</code></td>
                                <td>The man <strong>who</strong> lives next door is a doctor.</td>
                            </tr>
                            <tr>
                                <td><strong>Object (Tân ngữ)</strong></td>
                                <td><code>... N (person) + WHO + S + V ...</code></td>
                                <td>The boy <strong>who</strong> you met yesterday is my classmate.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Replaces subject or object nouns referring to people.<small>Thay thế cho danh từ chỉ người đóng vai trò làm chủ ngữ hoặc tân ngữ trong mệnh đề quan hệ.</small></li>
                </ul>
            </div>

            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-network-wired"></i> 2. Whom <small class="title-vi">/ Dùng cho người làm Tân ngữ (Trang trọng)</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Role <small>Vai trò</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Object (Tân ngữ)</strong></td>
                                <td><code>... N (person) + WHOM + S + V ...</code></td>
                                <td>The teacher <strong>whom</strong> you met yesterday is very famous.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Replaces object nouns referring to people in formal English.<small>Thay thế cho danh từ chỉ người làm tân ngữ trong câu, thường dùng trong văn phong trang trọng.</small></li>
                </ul>
            </div>

            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-network-wired"></i> 3. Which <small class="title-vi">/ Dùng cho vật/sự việc làm Chủ ngữ/Tân ngữ</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Role <small>Vai trò</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Subject (Chủ ngữ)</strong></td>
                                <td><code>... N (thing) + WHICH + V + O ...</code></td>
                                <td>The book <strong>which</strong> is on the table is mine.</td>
                            </tr>
                            <tr>
                                <td><strong>Object (Tân ngữ)</strong></td>
                                <td><code>... N (thing) + WHICH + S + V ...</code></td>
                                <td>The shirt <strong>which</strong> you bought yesterday looks very nice.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Replaces subject or object nouns referring to things, animals, or ideas.<small>Thay thế cho danh từ chỉ con vật, đồ vật, sự việc đóng vai trò chủ ngữ hoặc tân ngữ.</small></li>
                </ul>
            </div>

            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-network-wired"></i> 4. That <small class="title-vi">/ Thay thế cho Who/Whom/Which</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Role <small>Vai trò</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Subject (Chủ ngữ)</strong></td>
                                <td><code>... N (person/thing) + THAT + V + O ...</code></td>
                                <td>I like movies <strong>that</strong> have a happy ending.</td>
                            </tr>
                            <tr>
                                <td><strong>Object (Tân ngữ)</strong></td>
                                <td><code>... N (person/thing) + THAT + S + V ...</code></td>
                                <td>The phone <strong>that</strong> I bought yesterday works perfectly.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Replaces who, whom, or which in defining relative clauses.<small>Thay thế cho Who, Whom, Which trong mệnh đề xác định (không dùng sau dấu phẩy hoặc giới từ).</small></li>
                </ul>
            </div>

            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-network-wired"></i> 5. Whose <small class="title-vi">/ Thay thế tính từ sở hữu</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Role <small>Vai trò</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Possessive (Sở hữu)</strong></td>
                                <td><code>... N1 (owner) + WHOSE + N2 (possession) + ...</code></td>
                                <td>The boy <strong>whose</strong> dog was lost was crying.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Replaces possessive adjectives (my, your, his, her, its, their) to show ownership.<small>Thay thế tính từ sở hữu chỉ quan hệ sở hữu của người hoặc vật đứng trước đó.</small></li>
                </ul>
            </div>
        `
    },
    {
        id: "comparison",
        title: "Comparisons (Cấu Trúc So Sánh)",
        icon: "fa-solid fa-chart-simple",
        subtitle: "Equal, comparative, and superlative forms / So sánh bằng, so sánh hơn và so sánh nhất của tính từ/trạng từ",
        contentHtml: `
            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-equals"></i> 1. Equal Comparison <small class="title-vi">/ So sánh bằng</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Form <small>Thể</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>(+) Affirmative</strong></td>
                                <td><code>S + V + as + adj/adv + as + N/Pronoun</code></td>
                                <td>She is <strong>as tall as</strong> her mother.</td>
                            </tr>
                            <tr>
                                <td><strong>(-) Negative</strong></td>
                                <td><code>S + V + not + as/so + adj/adv + as + N/Pronoun</code></td>
                                <td>He does not run <strong>so fast as</strong> his sister.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Used to state that two people or things are equal (or unequal) in a certain quality.<small>Dùng để so sánh tính chất/đặc điểm tương đồng hoặc khác biệt giữa hai thực thể.</small></li>
                </ul>
            </div>

            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-arrow-trend-up"></i> 2. Comparative <small class="title-vi">/ So sánh hơn</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Type <small>Loại tính từ</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Short Adj/Adv</strong></td>
                                <td><code>S + V + adj/adv-er + than + N/Pronoun</code></td>
                                <td>He is <strong>taller</strong> than his brother.</td>
                            </tr>
                            <tr>
                                <td><strong>Long Adj/Adv</strong></td>
                                <td><code>S + V + more + adj/adv + than + N/Pronoun</code></td>
                                <td>This book is <strong>more interesting</strong> than that one.</td>
                            </tr>
                            <tr>
                                <td><strong>Irregular</strong></td>
                                <td><em>Special comparative forms</em> (better, worse...)</td>
                                <td>Her English is <strong>better</strong> than mine.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Used to compare two people or things.<small>Dùng để so sánh hơn giữa hai thực thể.</small></li>
                    <li><strong>Irregular Forms / Tính từ bất quy tắc:</strong> <em>good -> better</em>, <em>bad -> worse</em>, <em>far -> farther/further</em>, <em>many/much -> more</em>, <em>little -> less</em>.</li>
                </ul>
            </div>

            <div class="grammar-section">
                <h4 class="grammar-section-title"><i class="fa-solid fa-trophy"></i> 3. Superlative <small class="title-vi">/ So sánh nhất</small></h4>
                <div class="grammar-table-wrapper">
                    <table class="grammar-table">
                        <thead>
                            <tr>
                                <th>Type <small>Loại tính từ</small></th>
                                <th>Formula <small>Công thức</small></th>
                                <th>Example <small>Ví dụ</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Short Adj/Adv</strong></td>
                                <td><code>S + V + the + adj/adv-est + N/Pronoun</code></td>
                                <td>He is <strong>the tallest</strong> student in class.</td>
                            </tr>
                            <tr>
                                <td><strong>Long Adj/Adv</strong></td>
                                <td><code>S + V + the + most + adj/adv + N/Pronoun</code></td>
                                <td>This is <strong>the most beautiful</strong> painting here.</td>
                            </tr>
                            <tr>
                                <td><strong>Irregular</strong></td>
                                <td><em>Special superlative forms</em> (the best, the worst...)</td>
                                <td>She is <strong>the best</strong> student in our team.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul class="grammar-list">
                    <li><strong>Usages / Cách dùng:</strong> Used to compare one person or thing with a whole group of three or more.<small>Dùng để so sánh nhất giữa một thực thể với tất cả những thực thể khác trong cùng một nhóm.</small></li>
                    <li><strong>Irregular Forms / Tính từ bất quy tắc:</strong> <em>good -> the best</em>, <em>bad -> the worst</em>, <em>far -> the farthest/furthest</em>, <em>many/much -> the most</em>, <em>little -> the least</em>.</li>
                </ul>
            </div>
        `
    }
];

// Representative words for each sound to play as sample audio
const REPRESENTATIVE_WORDS = {
    "iː": "see", "ɪ": "sit", "e": "ten", "æ": "cat", "ɑː": "father", "ɒ": "hot", 
    "ɔː": "saw", "ʊ": "put", "uː": "too", "ʌ": "cup", "ɜː": "fur", "ə": "about",
    "eɪ": "say", "aɪ": "my", "ɔɪ": "boy", "aʊ": "now", "oʊ": "go", "ɪə": "near", 
    "eə": "hair", "ʊə": "pure",
    "p": "pen", "b": "bad", "t": "tea", "d": "did", "k": "cat", "g": "got", 
    "f": "fall", "v": "voice", "θ": "thin", "ð": "this", "s": "see", "z": "zoo", 
    "ʃ": "she", "ʒ": "vision", "h": "how", "tʃ": "chin", "dʒ": "jam", "m": "man", 
    "n": "no", "ŋ": "sing", "l": "leg", "r": "red", "w": "wet", "j": "yes"
};

const RAW_PHONEME_AUDIO = {
    // Monophthongs
    "iː": "i-vowel-dots.mp3",
    "ɪ": "i-vowel.mp3",
    "e": "e-vowel.mp3",
    "æ": "a-vowel-inverted.mp3",
    "ɑː": "a-vowel-dots.mp3",
    "ɒ": "a-vowel.mp3",
    "ɔː": "c-vowel-dots.mp3",
    "ʊ": "u-vowel.mp3",
    "uː": "u-vowel-dots.mp3",
    "ʌ": "v-vowel-inverted.mp3",
    "ɜː": "e-vowel-inverted-dots.mp3",
    "ə": "e-vowel-inverted.mp3",
    // Diphthongs
    "eɪ": "ei-diphthong.mp3",
    "aɪ": "ai-diphthong.mp3",
    "ɔɪ": "ci-diphthong.mp3",
    "aʊ": "au-diphthong.mp3",
    "oʊ": "au-diphthong-inverted.mp3",
    "ɪə": "ie-diphthong.mp3",
    "eə": "ea-diphthong.mp3",
    "ʊə": "ua-diphthong.mp3",
    // Consonants
    "p": "p-consonant-unvoiced.mp3",
    "b": "b-consonant-voiced.mp3",
    "t": "t-consonant-unvoiced.mp3",
    "d": "d-consonant-voiced.mp3",
    "k": "k-consonant-unvoiced.mp3",
    "g": "g-consonant-voiced.mp3",
    "f": "f-consonant-unvoiced.mp3",
    "v": "v-consonant-voiced.mp3",
    "θ": "o-consonant-unvoiced.mp3",
    "ð": "d-consonant-voiced-rare.mp3",
    "s": "s-consonant-unvoiced.mp3",
    "z": "z-consonant-voiced.mp3",
    "ʃ": "shaa-consonant-unvoiced.mp3",
    "ʒ": "3-consonant-voiced.mp3",
    "h": "h-consonant-unvoiced.mp3",
    "tʃ": "tf-consonant-unvoiced.mp3",
    "dʒ": "d3-consonant-voiced.mp3",
    "m": "m-consonant-voiced.mp3",
    "n": "n-consonant-voiced.mp3",
    "ŋ": "n-consonant-voiced-rare.mp3",
    "l": "l-consonant-voiced.mp3",
    "r": "r-consonant-voiced.mp3",
    "w": "w-consonant-voiced.mp3",
    "j": "j-consonant-voiced.mp3"
};

function playRawPhoneme(symbol) {
    const filename = RAW_PHONEME_AUDIO[symbol];
    if (filename) {
        const url = `https://raw.githubusercontent.com/joselatines/phonemic-chart/master/sounds/${filename}`;
        
        // Try to boost volume using Web Audio API (GitHub raw allows CORS)
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            try {
                const audio = new Audio(url);
                audio.crossOrigin = "anonymous";
                const ctx = new AudioContext();
                const source = ctx.createMediaElementSource(audio);
                const gainNode = ctx.createGain();
                
                // Boost volume by 2.5x
                gainNode.gain.value = 2.5;
                
                source.connect(gainNode);
                gainNode.connect(ctx.destination);
                
                audio.addEventListener("play", () => {
                    if (ctx.state === "suspended") {
                        ctx.resume();
                    }
                });
                
                audio.play().catch(err => {
                    console.error("Raw phoneme gain play failed:", err);
                });
                return;
            } catch (e) {
                console.warn("Web Audio API failed, falling back to standard playback:", e);
            }
        }
        
        // Fallback to standard Audio playback
        const audio = new Audio(url);
        audio.volume = 1.0;
        audio.play().catch(err => {
            console.error("Phoneme audio playback failed:", err);
        });
    }
}

const PRONUNCIATION_GUIDES = {
    // Monophthongs (12)
    "iː": {
        eng: "Long vowel. Spread your lips wide like a smile. Place your tongue high and near the front of your mouth.",
        vi: "Nguyên âm dài. Mở rộng môi sang hai bên như đang cười. Đặt đầu lưỡi ở vị trí cao và sát phía trước khoang miệng."
    },
    "ɪ": {
        eng: "Short vowel. Relax your lips and mouth. Tongue is slightly lower and further back than for /iː/.",
        vi: "Nguyên âm ngắn. Thư giãn môi và miệng. Lưỡi đặt thấp hơn và lùi về phía sau một chút so với âm /iː/."
    },
    "e": {
        eng: "Short vowel. Open your mouth a bit wider than for /ɪ/. Lips are relaxed and spread slightly.",
        vi: "Nguyên âm ngắn. Mở miệng rộng hơn một chút so với khi phát âm /ɪ/. Môi thư giãn và hơi bè ra."
    },
    "æ": {
        eng: "Short vowel (flat 'A'). Open your mouth very wide. Keep your tongue low and flat at the bottom of your mouth.",
        vi: "Nguyên âm ngắn (a bẹt). Mở miệng rất rộng. Đặt lưỡi ở vị trí thấp và phẳng dưới đáy khoang miệng."
    },
    "ɑː": {
        eng: "Long vowel. Open your mouth wide and relaxed. Tongue is low and pulled back.",
        vi: "Nguyên âm dài. Mở miệng rộng và thư giãn. Lưỡi đặt thấp và lùi sâu về phía sau khoang miệng."
    },
    "ɒ": {
        eng: "Short vowel. Open your mouth and round your lips slightly. Tongue is low and back.",
        vi: "Nguyên âm ngắn. Mở miệng và tròn môi nhẹ. Lưỡi đặt ở vị trí thấp và lùi về phía sau."
    },
    "ɔː": {
        eng: "Long vowel. Round your lips into an 'O' shape. Tongue is low-middle and pulled back.",
        vi: "Nguyên âm dài. Tròn môi thành hình chữ 'O'. Lưỡi đặt ở vị trí trung bình thấp và lùi về phía sau."
    },
    "ʊ": {
        eng: "Short vowel. Round your lips loosely. Tongue is high-middle and pulled back.",
        vi: "Nguyên âm ngắn. Tròn môi nhẹ và lỏng. Lưỡi ở vị trí trung bình cao và hơi lùi về phía sau."
    },
    "uː": {
        eng: "Long vowel. Round your lips tightly into a small circle. Tongue is high and back.",
        vi: "Nguyên âm dài. Tròn môi chặt thành một vòng tròn nhỏ. Lưỡi đặt ở vị trí cao và lùi sâu về phía sau."
    },
    "ʌ": {
        eng: "Short vowel. Open your mouth slightly. Lips and tongue are fully relaxed in the center.",
        vi: "Nguyên âm ngắn. Mở miệng nhẹ. Môi và lưỡi hoàn toàn thư giãn ở vị trí trung tâm."
    },
    "ɜː": {
        eng: "Long vowel. Keep your mouth half-open. Lips are neutral. Raise the middle of your tongue slightly.",
        vi: "Nguyên âm dài. Mở miệng hé vừa phải. Môi ở vị trí trung lập. Hơi nâng phần giữa lưỡi lên."
    },
    "ə": {
        eng: "Short, unstressed vowel (schwa). The most relaxed sound in English. Lips and tongue completely relaxed.",
        vi: "Nguyên âm ngắn, không nhấn trọng âm. Âm thư giãn nhất trong tiếng Anh. Môi và lưỡi thả lỏng hoàn toàn."
    },
    // Diphthongs (8)
    "eɪ": {
        eng: "Diphthong. Start with the /e/ sound and smoothly glide into /ɪ/. Lips become narrower.",
        vi: "Nguyên âm đôi. Bắt đầu từ âm /e/ và lướt mượt mà sang âm /ɪ/. Khẩu hình miệng thu hẹp dần."
    },
    "aɪ": {
        eng: "Diphthong. Start with a wide open /ɑː/ and glide into /ɪ/. Mouth closes slightly.",
        vi: "Nguyên âm đôi. Bắt đầu mở rộng miệng với âm /ɑː/ rồi lướt sang âm /ɪ/. Miệng khép nhẹ dần."
    },
    "ɔɪ": {
        eng: "Diphthong. Start with rounded lips for /ɔː/ and glide into /ɪ/. Lips spread out.",
        vi: "Nguyên âm đôi. Bắt đầu với môi tròn của âm /ɔː/ rồi lướt sang âm /ɪ/. Môi bè dần ra."
    },
    "aʊ": {
        eng: "Diphthong. Start with open /ɑː/ and glide into /ʊ/. Lips round tightly.",
        vi: "Nguyên âm đôi. Bắt đầu mở rộng miệng với âm /ɑː/ rồi lướt sang âm /ʊ/. Môi tròn chặt lại."
    },
    "oʊ": {
        eng: "Diphthong. Start with a relaxed /ə/ or /ɒ/ and glide into /ʊ/. Lips become rounded.",
        vi: "Nguyên âm đôi. Bắt đầu từ âm /ə/ hoặc /ɒ/ và lướt sang âm /ʊ/. Môi khum tròn lại."
    },
    "ɪə": {
        eng: "Diphthong. Start with /ɪ/ and glide into a relaxed /ə/. Mouth opens slightly.",
        vi: "Nguyên âm đôi. Bắt đầu từ âm /ɪ/ và lướt sang âm /ə/ thả lỏng. Miệng hơi mở ra."
    },
    "eə": {
        eng: "Diphthong. Start with /e/ and glide into a relaxed /ə/. Mouth remains half-open.",
        vi: "Nguyên âm đôi. Bắt đầu từ âm /e/ và lướt sang âm /ə/ thả lỏng. Miệng giữ mở hé vừa."
    },
    "ʊə": {
        eng: "Diphthong. Start with /ʊ/ and glide into a relaxed /ə/. Lips go from rounded to neutral.",
        vi: "Nguyên âm đôi. Bắt đầu từ âm /ʊ/ và lướt sang âm /ə/ thả lỏng. Môi chuyển từ tròn sang trung lập."
    },
    // Consonants (24)
    "p": {
        eng: "Voiceless plosive. Press lips together, build up air pressure, then release with a strong puff of air (aspiration).",
        vi: "Âm vô thanh. Mím hai môi lại để cản hơi, sau đó bật hơi mạnh ra ngoài mà không rung dây thanh quản."
    },
    "b": {
        eng: "Voiced plosive. Press lips together and release with voice. Vocal cords vibrate.",
        vi: "Âm hữu thanh. Mím hai môi lại rồi bật hơi ra đồng thời rung dây thanh quản ở cổ họng."
    },
    "t": {
        eng: "Voiceless plosive. Place tongue tip behind upper teeth, block air, then release with a sharp puff.",
        vi: "Âm vô thanh. Đặt đầu lưỡi sát nướu răng hàm trên để cản hơi, sau đó bật mạnh hơi ra ngoài."
    },
    "d": {
        eng: "Voiced plosive. Place tongue tip behind upper teeth, block air, then release with voice. Vocal cords vibrate.",
        vi: "Âm hữu thanh. Đặt đầu lưỡi sau nướu răng hàm trên để chặn hơi, sau đó bật ra đồng thời rung dây thanh."
    },
    "k": {
        eng: "Voiceless plosive. Press back of tongue against soft palate, block air, then release with a puff.",
        vi: "Âm vô thanh. Nâng cuống lưỡi lên chạm ngạc mềm để chặn hơi, sau đó bật mạnh hơi ra ngoài."
    },
    "g": {
        eng: "Voiced plosive. Press back of tongue against soft palate, block air, then release with voice.",
        vi: "Âm hữu thanh. Nâng cuống lưỡi chạm ngạc mềm để cản hơi, sau đó giải phóng hơi và rung dây thanh."
    },
    "f": {
        eng: "Voiceless fricative. Touch upper teeth to lower lip, blow air gently through the narrow gap.",
        vi: "Âm vô thanh. Đặt răng hàm trên chạm nhẹ vào môi dưới, đẩy hơi thoát ra qua khe hẹp."
    },
    "v": {
        eng: "Voiced fricative. Touch upper teeth to lower lip, blow air while vibrating vocal cords.",
        vi: "Âm hữu thanh. Răng hàm trên chạm môi dưới, đẩy hơi ra đồng thời rung dây thanh quản."
    },
    "θ": {
        eng: "Voiceless fricative. Put tongue tip between upper and lower teeth, blow air gently through the gap.",
        vi: "Âm vô thanh. Đặt đầu lưỡi giữa răng cửa trên và dưới, đẩy hơi nhẹ nhàng qua kẽ răng."
    },
    "ð": {
        eng: "Voiced fricative. Put tongue tip between upper and lower teeth, blow air while vibrating vocal cords.",
        vi: "Âm hữu thanh. Đặt đầu lưỡi giữa răng cửa trên và dưới, đẩy hơi ra và rung dây thanh quản."
    },
    "s": {
        eng: "Voiceless fricative. Bring teeth close together, place tongue tip near alveolar ridge, blow air.",
        vi: "Âm vô thanh. Hai hàm răng khép gần nhau, đặt đầu lưỡi gần nướu răng hàm trên, thổi hơi ra ngoài."
    },
    "z": {
        eng: "Voiced fricative. Bring teeth close together, place tongue tip near alveolar ridge, vibrate vocal cords.",
        vi: "Âm hữu thanh. Hàm răng khép gần nhau, đầu lưỡi đặt gần nướu hàm trên, đẩy hơi đồng thời rung dây thanh."
    },
    "ʃ": {
        eng: "Voiceless fricative. Flare lips slightly, pull tongue back, blow air over the flat center of tongue.",
        vi: "Âm vô thanh (s nặng). Chu môi nhẹ, lùi lưỡi về phía sau một chút và thổi hơi mạnh ra ngoài."
    },
    "ʒ": {
        eng: "Voiced fricative. Flare lips slightly, pull tongue back, blow air while vibrating vocal cords.",
        vi: "Âm hữu thanh. Chu môi nhẹ, lùi lưỡi về sau, đẩy hơi ra ngoài đồng thời rung dây thanh quản."
    },
    "h": {
        eng: "Voiceless fricative. Open mouth, exhale air quickly from throat without using tongue or teeth.",
        vi: "Âm vô thanh. Mở miệng, thở hơi nhanh ra ngoài từ cổ họng như đang thở dài thư giãn."
    },
    "tʃ": {
        eng: "Voiceless affricate. Start with tongue tip blocking air behind teeth, then release into a /ʃ/ friction.",
        vi: "Âm vô thanh. Bắt đầu bằng cách chặn hơi giống âm /t/ sau đó bật mạnh ra thành âm sát /ʃ/."
    },
    "dʒ": {
        eng: "Voiced affricate. Start with tongue blocking air behind teeth, then release into a /ʒ/ friction with voice.",
        vi: "Âm hữu thanh. Chặn hơi sau nướu răng rồi bật hơi ra thành âm sát /ʒ/ đồng thời rung dây thanh."
    },
    "m": {
        eng: "Voiced nasal. Close lips completely, let air escape through your nose.",
        vi: "Âm mũi hữu thanh. Mím chặt hai môi, đẩy hơi đi lên và thoát ra ngoài qua đường mũi."
    },
    "n": {
        eng: "Voiced nasal. Place tongue tip against alveolar ridge, let air escape through nose.",
        vi: "Âm mũi hữu thanh. Đặt đầu lưỡi chạm vào nướu răng hàm trên, đẩy hơi thoát ra ngoài qua mũi."
    },
    "ŋ": {
        eng: "Voiced nasal. Press back of tongue against soft palate, let air escape through nose.",
        vi: "Âm mũi hữu thanh. Nâng cuống lưỡi chạm ngạc mềm chặn khoang miệng, để hơi thoát qua mũi."
    },
    "l": {
        eng: "Voiced approximant. Place tongue tip on alveolar ridge, let air pass freely along the sides of tongue.",
        vi: "Âm hữu thanh. Đặt đầu lưỡi chạm vào nướu răng hàm trên, để hơi đi ra hai bên cạnh của lưỡi."
    },
    "r": {
        eng: "Voiced approximant. Curl tongue tip slightly back near roof of mouth (do not touch), vibrate vocal cords.",
        vi: "Âm hữu thanh. Hơi cong đầu lưỡi về phía sau hướng lên vòm họng (không chạm), rung dây thanh."
    },
    "w": {
        eng: "Voiced approximant. Round lips tightly (like for /uː/), then quickly open lips and glide into next vowel.",
        vi: "Âm hữu thanh. Tròn môi chặt (như âm /uː/), sau đó nhanh chóng mở môi lướt sang nguyên âm tiếp theo."
    },
    "j": {
        eng: "Voiced approximant. Place tongue high near roof of mouth (like for /iː/), then glide into next vowel.",
        vi: "Âm hữu thanh. Đặt lưỡi ở vị trí cao gần vòm họng (như âm /iː/), sau đó lướt sang âm tiếp theo."
    }
};


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
    activeMode: "study",      // study, flashcard, quiz, bookmark, learned
    renderedCount: 0,         // For infinite scroll
    flashcardIndex: 0,        // Current flashcard
    bookmarks: new Set(),     // Bookmarked words list
    learned: new Set(),       // Learned words list
    expandedCards: new Set(), // Tracking expanded cards in grid view
    currentGrammarId: "pos",  // Active grammar topic ID
    currentRoadmapId: "prep_foundations", // Active roadmap topic ID
    geminiApiKey: ""          // Gemini API Key for dialogue generation
};

// Quiz Game State
let quizState = {
    words: [],                // 5 selected words
    currentIndex: 0,          // Current question (0 to 4)
    score: 0,                 // Score
    correctAnswer: ""         // Correct answer for current question
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
        const savedApiKey = localStorage.getItem("gemini_api_key");
        if (savedApiKey) {
            state.geminiApiKey = savedApiKey;
        } else {
            state.geminiApiKey = "";
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

function saveApiKey(key) {
    state.geminiApiKey = key.trim();
    localStorage.setItem("gemini_api_key", state.geminiApiKey);
}

// ==========================================
// 3. SOUND FILTER LOGIC
// ==========================================

function getSoundName(symbol) {
    const list = [...MONOPHTHONGS, ...DIPHTHONGS, ...CONSONANTS];
    const match = list.find(s => s.symbol === symbol);
    return match ? match.name : "";
}

function wordMatchesSound(word, sound) {
    if (state.activeMode === "bookmark" || state.activeMode === "learned") {
        return true;
    }
    
    const isVowel = [...MONOPHTHONGS, ...DIPHTHONGS].some(v => v.symbol === sound);
    if (isVowel) {
        const mappedVowel = VOWEL_MAPPINGS[word.stressed_vowel];
        return mappedVowel === sound;
    } else {
        return word.consonants.includes(sound);
    }
}

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

function getFilteredData() {
    return VOCABULARY_DATA.filter(w => {
        // Mode filter
        if (state.activeMode === "bookmark" && !state.bookmarks.has(w.word)) return false;
        if (state.activeMode === "learned" && !state.learned.has(w.word)) return false;
        
        // Sound filter (only if not viewing bookmarks, learned lists, or playing quiz)
        // Quiz will handle sound filtering independently
        if (state.activeMode !== "bookmark" && state.activeMode !== "learned" && state.activeMode !== "quiz") {
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
    // accentType: 1 for UK (en-GB), 2 for US (en-US)
    const lang = accentType === 1 ? "en-GB" : "en-US";
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(word)}`;
    const audio = new Audio(url);
    audio.volume = 1.0;
    audio.play().catch(err => {
        console.error("Google audio playback failed, trying fallback Youdao:", err);
        const fallbackUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(word)}&type=${accentType}`;
        const fallbackAudio = new Audio(fallbackUrl);
        fallbackAudio.volume = 1.0;
        fallbackAudio.play().catch(e => console.error("Fallback audio failed:", e));
    });
}

function playKidAudio(word) {
    if (!('speechSynthesis' in window)) {
        console.warn("SpeechSynthesis not supported, falling back to US audio.");
        playAudio(word, 2);
        return;
    }
    
    // Stop any ongoing speech synthesis
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    
    // Try to find a child voice or high-pitched voice
    const voices = window.speechSynthesis.getVoices();
    let voice = null;
    
    // Check for kid/child voices or common female voices on macOS/Windows
    const kidVoiceNames = ["junior", "eddy", "flo", "samantha", "susan", "karen", "moira"];
    for (const name of kidVoiceNames) {
        voice = voices.find(v => v.name.toLowerCase().includes(name) && v.lang.startsWith("en"));
        if (voice) break;
    }
    
    if (!voice) {
        // Fallback to any English voice
        voice = voices.find(v => v.lang.startsWith("en"));
    }
    
    if (voice) {
        utterance.voice = voice;
        // If it's a native child voice, keep standard pitch
        const vName = voice.name.toLowerCase();
        if (vName.includes("junior") || vName.includes("eddy") || vName.includes("flo")) {
            utterance.pitch = 1.0;
            utterance.rate = 0.85;
        } else {
            // Pitch up female/adult voice to simulate a child (4-10 years old)
            utterance.pitch = 1.5; 
            utterance.rate = 0.8;
        }
    } else {
        utterance.pitch = 1.5;
        utterance.rate = 0.8;
    }
    
    window.speechSynthesis.speak(utterance);
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

function getLevenshteinDistance(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1,     // insertion
                    matrix[i - 1][j] + 1      // deletion
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

function getSimilarity(s1, s2) {
    const longer = s1.length > s2.length ? s1 : s2;
    const longerLength = longer.length;
    if (longerLength === 0) return 1.0;
    return (longerLength - getLevenshteinDistance(s1, s2)) / longerLength;
}

function checkPronunciationSimilarity(original, spoken) {
    const cleanOriginal = original.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").trim();
    const cleanSpoken = spoken.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").trim();
    
    if (cleanOriginal === cleanSpoken) {
        return { isCorrect: true, similarity: 1.0 };
    }
    
    const similarity = getSimilarity(cleanOriginal, cleanSpoken);
    // Strict threshold for short words, more lenient for longer words
    const threshold = cleanOriginal.length <= 4 ? 0.85 : 0.75;
    
    return {
        isCorrect: similarity >= threshold,
        similarity: similarity
    };
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

        const checkResult = checkPronunciationSimilarity(word, result);
        resultText.style.display = "block";
        resultText.className = "speech-result";

        if (checkResult.isCorrect) {
            const accuracy = Math.round(checkResult.similarity * 100);
            resultText.textContent = `✓ Phát âm tốt! (Độ chính xác: ${accuracy}%)`;
            resultText.classList.add("success");
            state.learned.add(word);
            saveLearned();
            updateProgressWidget();
            updateStatsBanner();
        } else {
            const accuracy = Math.round(checkResult.similarity * 100);
            resultText.textContent = `✗ Chưa chính xác (${accuracy}%). Thử lại nhé!`;
            resultText.classList.add("error");
        }
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        if (event.error === "no-speech") {
            transcriptText.textContent = "Không nghe thấy tiếng. Vui lòng nói to rõ hơn.";
        } else {
            transcriptText.textContent = `Lỗi nhận diện: ${event.error}`;
        }
    };

    try {
        recognition.start();
    } catch(e) {
        console.error(e);
    }
}

// ==========================================
// 6.5. VOICE SEARCH LOGIC
// ==========================================
let searchRecognition = null;
if ('webkitSpeechRecognition' in window) {
    searchRecognition = new webkitSpeechRecognition();
    searchRecognition.continuous = false;
    searchRecognition.interimResults = false;
    searchRecognition.lang = 'en-US';
}

function startVoiceSearch() {
    if (!searchRecognition) {
        alert("Trình duyệt của bạn không hỗ trợ Web Speech API nhận diện giọng nói.");
        return;
    }

    const voiceSearchBtn = document.getElementById("voiceSearchBtn");
    const searchInput = document.getElementById("searchInput");

    if (voiceSearchBtn.classList.contains("listening")) {
        searchRecognition.stop();
        return;
    }

    voiceSearchBtn.classList.add("listening");
    searchInput.placeholder = "Đang lắng nghe... Hãy nói từ bằng tiếng Anh...";

    searchRecognition.onstart = () => {
        console.log("Voice search started");
    };

    searchRecognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        const cleanResult = result.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").trim();
        searchInput.value = cleanResult;
        state.searchQuery = cleanResult;
        
        state.renderedCount = 0;
        state.expandedCards.clear();
        state.flashcardIndex = 0;
        updateView();
    };

    searchRecognition.onerror = (event) => {
        console.error("Voice search error", event.error);
        if (event.error !== "no-speech") {
            searchInput.placeholder = `Lỗi: ${event.error}`;
            setTimeout(() => {
                searchInput.placeholder = "Tìm kiếm từ vựng hoặc nghĩa tiếng Việt...";
            }, 2000);
        }
    };

    searchRecognition.onend = () => {
        voiceSearchBtn.classList.remove("listening");
        searchInput.placeholder = "Tìm kiếm từ vựng hoặc nghĩa tiếng Việt...";
    };

    try {
        searchRecognition.start();
    } catch (e) {
        console.error(e);
    }
}

// ==========================================
// 7. RENDER LOGIC
// ==========================================

// Render Sidebar sound grid
function renderSidebar() {
    const renderSection = (containerId, soundList) => {
        const container = document.getElementById(containerId);
        container.innerHTML = "";
        
        soundList.forEach(s => {
            const count = getWordCountForSound(s.symbol);
            
            const pill = document.createElement("button");
            pill.className = `sound-pill ${state.currentSound === s.symbol && (state.activeMode === "study" || state.activeMode === "flashcard" || state.activeMode === "quiz") ? "active" : ""}`;
            pill.setAttribute("data-sound", s.symbol);
            pill.setAttribute("aria-label", `Âm ${s.symbol}, có ${count} từ`);
            
            pill.innerHTML = `
                <span class="sound-pill-symbol">/${s.symbol}/</span>
                <span class="sound-pill-count">${count} từ</span>
            `;
            
            pill.addEventListener("click", () => {
                document.querySelectorAll(".sound-pill").forEach(p => p.classList.remove("active"));
                document.querySelectorAll(".grammar-pill").forEach(p => p.classList.remove("active"));
                pill.classList.add("active");
                
                if (state.activeMode === "bookmark" || state.activeMode === "learned" || state.activeMode === "grammar" || state.activeMode === "roadmap") {
                    state.activeMode = "study";
                    document.querySelectorAll(".nav-tab-btn").forEach(t => t.classList.remove("active"));
                    document.getElementById("tabStudy").classList.add("active");
                }
                
                state.currentSound = s.symbol;
                state.isVowelMode = [...MONOPHTHONGS, ...DIPHTHONGS].some(v => v.symbol === s.symbol);
                
                state.renderedCount = 0;
                state.expandedCards.clear();
                state.flashcardIndex = 0;
                
                document.getElementById("appSidebar").classList.remove("open");
                
                updateView();

                // Autoplay the raw phoneme pronunciation for the selected sound
                playRawPhoneme(s.symbol);
            });
            
            container.appendChild(pill);
        });
    };

    renderSection("monophthongsGrid", MONOPHTHONGS);
    renderSection("diphthongsGrid", DIPHTHONGS);
    renderSection("consonantsGrid", CONSONANTS);

    // Render Grammar Menu list
    const grammarMenuList = document.getElementById("grammarMenuList");
    grammarMenuList.innerHTML = "";
    
    GRAMMAR_TOPICS.forEach(topic => {
        const pill = document.createElement("button");
        pill.className = `grammar-pill ${state.activeMode === "grammar" && state.currentGrammarId === topic.id ? "active" : ""}`;
        pill.innerHTML = `
            <div class="grammar-pill-icon"><i class="${topic.icon}"></i></div>
            <div class="grammar-pill-title">${topic.title}</div>
        `;
        
        pill.addEventListener("click", () => {
            // Deactivate all sound pills and other grammar pills
            document.querySelectorAll(".sound-pill").forEach(p => p.classList.remove("active"));
            document.querySelectorAll(".grammar-pill").forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            
            // Set state
            state.activeMode = "grammar";
            state.currentGrammarId = topic.id;
            
            // Deactivate tab buttons
            document.querySelectorAll(".nav-tab-btn").forEach(t => t.classList.remove("active"));
            
            // Close mobile sidebar
            document.getElementById("appSidebar").classList.remove("open");
            
            updateView();
        });
        
        grammarMenuList.appendChild(pill);
    });

    // Render Roadmap Menu lists (5.0, 6.5, and 7.0)
    const roadmapMenuList = document.getElementById("roadmapMenuList");
    const roadmap65MenuList = document.getElementById("roadmap65MenuList");
    const roadmap70MenuList = document.getElementById("roadmap70MenuList");
    
    if (roadmapMenuList) roadmapMenuList.innerHTML = "";
    if (roadmap65MenuList) roadmap65MenuList.innerHTML = "";
    if (roadmap70MenuList) roadmap70MenuList.innerHTML = "";
    
    ROADMAP_DATA.forEach(category => {
        const pill = document.createElement("button");
        pill.className = `grammar-pill ${state.activeMode === "roadmap" && state.currentRoadmapId === category.id ? "active" : ""}`;
        pill.innerHTML = `
            <div class="grammar-pill-icon"><i class="${category.icon}"></i></div>
            <div class="grammar-pill-title">${category.title}</div>
        `;
        
        pill.addEventListener("click", () => {
            // Deactivate all sound pills and other grammar/roadmap pills
            document.querySelectorAll(".sound-pill").forEach(p => p.classList.remove("active"));
            document.querySelectorAll(".grammar-pill").forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            
            // Set state
            state.activeMode = "roadmap";
            state.currentRoadmapId = category.id;
            
            // Deactivate tab buttons
            document.querySelectorAll(".nav-tab-btn").forEach(t => t.classList.remove("active"));
            
            // Close mobile sidebar
            document.getElementById("appSidebar").classList.remove("open");
            
            updateView();
        });
        
        if (category.id.startsWith("prep65_")) {
            if (roadmap65MenuList) roadmap65MenuList.appendChild(pill);
        } else if (category.id.startsWith("prep70_")) {
            if (roadmap70MenuList) roadmap70MenuList.appendChild(pill);
        } else {
            if (roadmapMenuList) roadmapMenuList.appendChild(pill);
        }
    });
}

// Update Premium SVG Progress Widget
function updateProgressWidget() {
    const totalWords = VOCABULARY_DATA.length;
    const totalLearned = state.learned.size;
    const percentage = totalWords > 0 ? Math.round((totalLearned / totalWords) * 100) : 0;
    
    // Animate SVG circle
    const circle = document.getElementById("progressRingCircle");
    const radius = 22;
    const circumference = 2 * Math.PI * radius; // 138.23
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    
    document.getElementById("progressPercentage").textContent = `${percentage}%`;
    document.getElementById("progressSubTitle").textContent = `${totalLearned} / ${totalWords} từ`;
}

// Stats & Banner
function updateStatsBanner() {
    const banner = document.getElementById("currentSoundBanner");
    const countSpan = document.getElementById("bannerSoundCount");
    
    const filteredTotal = getFilteredData();
    const sampleWord = REPRESENTATIVE_WORDS[state.currentSound] || "";
    const samplePronContainer = document.getElementById("bannerSamplePronunciation");
    const guideRow = document.getElementById("bannerGuideRow");
    const guideObj = PRONUNCIATION_GUIDES[state.currentSound];
    
    if (state.activeMode === "bookmark") {
        document.getElementById("bannerSoundSymbol").innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
        document.getElementById("bannerSoundName").textContent = "Từ vựng đã lưu";
        countSpan.textContent = `${filteredTotal.length} từ đã lưu trữ`;
        document.getElementById("playRawSoundBtn").style.display = "none";
        if (samplePronContainer) samplePronContainer.style.display = "none";
        if (guideRow) guideRow.style.display = "none";
    } else if (state.activeMode === "learned") {
        document.getElementById("bannerSoundSymbol").innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
        document.getElementById("bannerSoundName").textContent = "Từ vựng đã thuộc";
        countSpan.textContent = `${filteredTotal.length} từ đã học thuộc lòng`;
        document.getElementById("playRawSoundBtn").style.display = "none";
        if (samplePronContainer) samplePronContainer.style.display = "none";
        if (guideRow) guideRow.style.display = "none";
    } else {
        document.getElementById("bannerSoundSymbol").textContent = `/${state.currentSound}/`;
        document.getElementById("bannerSoundName").textContent = getSoundName(state.currentSound);
        countSpan.textContent = `${filteredTotal.length} từ vựng phù hợp bộ lọc`;
        document.getElementById("playRawSoundBtn").style.display = "flex";
        
        if (samplePronContainer) {
            if (sampleWord) {
                samplePronContainer.style.display = "flex";
                document.getElementById("bannerSampleWord").textContent = sampleWord;
            } else {
                samplePronContainer.style.display = "none";
            }
        }

        if (guideRow) {
            if (guideObj) {
                guideRow.style.display = "flex";
                document.getElementById("bannerGuideEng").textContent = guideObj.eng;
                document.getElementById("bannerGuideVi").textContent = guideObj.vi;
            } else {
                guideRow.style.display = "none";
            }
        }
    }
    
    // Update stats pill
    const currentSoundWords = getFilteredData();
    const learnedInCurrent = currentSoundWords.filter(w => state.learned.has(w.word)).length;
    
    document.getElementById("soundStatLearned").textContent = learnedInCurrent;
    document.getElementById("soundStatTotal").textContent = currentSoundWords.length;
}

function renderGrammarSheet() {
    const container = document.getElementById("grammarContentContainer");
    const activeTopic = GRAMMAR_TOPICS.find(t => t.id === state.currentGrammarId);
    
    if (!activeTopic) {
        container.innerHTML = "<h3>Không tìm thấy nội dung ngữ pháp</h3>";
        return;
    }
    
    container.innerHTML = `
        <div class="grammar-sheet-header">
            <div class="grammar-sheet-icon"><i class="${activeTopic.icon}"></i></div>
            <div>
                <h3 class="grammar-sheet-title">${activeTopic.title}</h3>
                <span class="grammar-sheet-subtitle">${activeTopic.subtitle}</span>
            </div>
        </div>
        <div class="grammar-sheet-body">
            ${activeTopic.contentHtml}
        </div>
    `;
    
    // Process sections to make them collapsible accordions
    const sections = container.querySelectorAll(".grammar-section");
    sections.forEach((section, index) => {
        const titleEl = section.querySelector(".grammar-section-title");
        if (!titleEl) return;
        
        // Create a wrapper for all children after the title element
        const contentWrapper = document.createElement("div");
        contentWrapper.className = "grammar-section-content";
        
        let sibling = titleEl.nextElementSibling;
        while (sibling) {
            const next = sibling.nextElementSibling;
            contentWrapper.appendChild(sibling);
            sibling = next;
        }
        
        // Append content wrapper back to the section
        section.appendChild(contentWrapper);
        
        // Append a chevron icon to the section title
        const chevron = document.createElement("i");
        chevron.className = "fa-solid fa-chevron-down section-chevron";
        titleEl.appendChild(chevron);
        
        // Setup click trigger styling
        titleEl.classList.add("collapsible-trigger");
        
        // Toggle function
        const toggleSection = (expand) => {
            if (expand) {
                titleEl.classList.add("active");
                contentWrapper.classList.add("show");
            } else {
                titleEl.classList.remove("active");
                contentWrapper.classList.remove("show");
            }
        };
        
        // Expand the first section by default, collapse others
        if (index === 0) {
            toggleSection(true);
        } else {
            toggleSection(false);
        }
        
        // Create Grammar AI dialogue area
        const dialogueArea = document.createElement("div");
        dialogueArea.className = "grammar-ai-dialogue-area";
        
        // Clean title text (remove Vietnamese and HTML markup)
        const cleanTitle = titleEl.textContent.replace(/[\n\r\t]/g, "").replace(/\/.*$/, "").trim();
        
        dialogueArea.innerHTML = `
            <div class="dialogue-title-row">
                <span class="dialogue-section-title"><i class="fa-solid fa-comments"></i> Hội thoại minh họa AI:</span>
                <button class="grammar-ai-btn" data-topic="${activeTopic.id}" data-section="${index}"><i class="fa-solid fa-robot"></i> Tạo hội thoại AI</button>
            </div>
            <div class="card-dialogue-container" id="grammarDialogueContainer_${activeTopic.id}_${index}"></div>
        `;
        contentWrapper.appendChild(dialogueArea);
        
        const grammarAiBtn = dialogueArea.querySelector(".grammar-ai-btn");
        const grammarDialogueContainer = dialogueArea.querySelector(`#grammarDialogueContainer_${activeTopic.id}_${index}`);
        
        // Show cached dialogue immediately if it exists
        const cached = localStorage.getItem(`grammar_dialogue_${activeTopic.id}_${index}`);
        if (cached) {
            try {
                const parsed = JSON.parse(cached);
                grammarDialogueContainer.innerHTML = renderGrammarHtml(parsed);
                grammarAiBtn.innerHTML = `<i class="fa-solid fa-arrows-rotate"></i> Tạo lại AI`;
            } catch (e) {
                console.error("Failed to parse cached grammar dialogue", e);
            }
        }
        
        grammarAiBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Stop propagation to prevent collapsible panel from toggling
            generateGrammarDialogue(activeTopic.id, activeTopic.title, cleanTitle, index, grammarDialogueContainer, grammarAiBtn);
        });

        // Add click listener
        titleEl.addEventListener("click", () => {
            const isExpanded = contentWrapper.classList.contains("show");
            toggleSection(!isExpanded);
        });
    });
}

function renderRoadmapSheet() {
    const container = document.getElementById("roadmapContentContainer");
    const activeCategory = ROADMAP_DATA.find(c => c.id === state.currentRoadmapId);
    
    if (!activeCategory) {
        container.innerHTML = "<h3>Không tìm thấy nội dung lộ trình</h3>";
        return;
    }
    
    let unitsHtml = "";
    activeCategory.units.forEach((unit, index) => {
        unitsHtml += `
            <div class="grammar-section">
                <h4 class="grammar-section-title collapsible-trigger">
                    <span>${unit.title}</span>
                </h4>
                <div class="grammar-section-content">
                    <div class="roadmap-unit-card">
                        <p>${unit.desc}</p>
                        <div class="roadmap-action-row">
                            <a href="${unit.url}" target="_blank" rel="noopener noreferrer" class="roadmap-link-btn">
                                <i class="fa-solid fa-arrow-up-right-from-square"></i> Xem bài học chi tiết
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = `
        <div class="grammar-sheet-header">
            <div class="grammar-sheet-icon"><i class="${activeCategory.icon}"></i></div>
            <div>
                <h3 class="grammar-sheet-title">${activeCategory.title}</h3>
                <span class="grammar-sheet-subtitle">${activeCategory.subtitle}</span>
            </div>
        </div>
        <div class="grammar-sheet-body">
            ${unitsHtml}
        </div>
    `;
    
    // Add chevron icons and handle accordion behavior
    const sections = container.querySelectorAll(".grammar-section");
    sections.forEach((section, index) => {
        const titleEl = section.querySelector(".grammar-section-title");
        const contentWrapper = section.querySelector(".grammar-section-content");
        if (!titleEl || !contentWrapper) return;
        
        // Append a chevron icon to the section title
        const chevron = document.createElement("i");
        chevron.className = "fa-solid fa-chevron-down section-chevron";
        titleEl.appendChild(chevron);
        
        // Toggle function
        const toggleSection = (expand) => {
            if (expand) {
                titleEl.classList.add("active");
                contentWrapper.classList.add("show");
            } else {
                titleEl.classList.remove("active");
                contentWrapper.classList.remove("show");
            }
        };
        
        // Expand the first section by default, collapse others
        if (index === 0) {
            toggleSection(true);
        } else {
            toggleSection(false);
        }
        
        // Add click listener
        titleEl.addEventListener("click", () => {
            const isExpanded = contentWrapper.classList.contains("show");
            toggleSection(!isExpanded);
        });
    });
}

// Main View Router
function updateView() {
    const studyView = document.getElementById("studyView");
    const flashcardView = document.getElementById("flashcardView");
    const quizView = document.getElementById("quizView");
    const grammarView = document.getElementById("grammarView");
    const roadmapView = document.getElementById("roadmapView");
    const emptyStateView = document.getElementById("emptyStateView");
    
    const controlPanel = document.querySelector(".dashboard-control-panel");
    const statsBanner = document.getElementById("currentSoundBanner");
    
    if (state.activeMode === "roadmap") {
        // Hide standard filters and stats
        controlPanel.style.display = "none";
        statsBanner.style.display = "none";
        
        // Show roadmap view, hide others
        studyView.classList.remove("active");
        flashcardView.classList.remove("active");
        quizView.classList.remove("active");
        emptyStateView.classList.remove("active");
        grammarView.classList.remove("active");
        if (roadmapView) roadmapView.classList.add("active");
        
        renderRoadmapSheet();
        return;
    }
    
    if (state.activeMode === "grammar") {
        // Hide standard filters and stats
        controlPanel.style.display = "none";
        statsBanner.style.display = "none";
        
        // Show grammar view, hide others
        studyView.classList.remove("active");
        flashcardView.classList.remove("active");
        quizView.classList.remove("active");
        emptyStateView.classList.remove("active");
        if (roadmapView) roadmapView.classList.remove("active");
        grammarView.classList.add("active");
        
        renderGrammarSheet();
        return;
    }
    
    // Show standard filters and stats
    controlPanel.style.display = "flex";
    statsBanner.style.display = "flex";
    grammarView.classList.remove("active");
    if (roadmapView) roadmapView.classList.remove("active");
    
    updateStatsBanner();
    updateProgressWidget();
    
    const filtered = getFilteredData();
    
    if (filtered.length === 0 && state.activeMode !== "quiz") {
        studyView.classList.remove("active");
        flashcardView.classList.remove("active");
        quizView.classList.remove("active");
        emptyStateView.classList.add("active");
        return;
    }
    
    emptyStateView.classList.remove("active");
    
    if (state.activeMode === "study" || state.activeMode === "bookmark" || state.activeMode === "learned") {
        studyView.classList.add("active");
        flashcardView.classList.remove("active");
        quizView.classList.remove("active");
        renderVocabularyGrid(filtered);
    } else if (state.activeMode === "flashcard") {
        studyView.classList.remove("active");
        flashcardView.classList.add("active");
        quizView.classList.remove("active");
        renderFlashcard(filtered);
    } else if (state.activeMode === "quiz") {
        studyView.classList.remove("active");
        flashcardView.classList.remove("active");
        quizView.classList.add("active");
        setupQuizScreen();
    }
}

function formatGrammarSection(wordObj) {
    const pos = wordObj.pos.toLowerCase().trim();
    const rawGrammar = wordObj.grammar || "";
    
    // 1. Generate typical grammar structure & usage based on Part of Speech (POS)
    let structure = "";
    let usageNoteHtml = "";
    
    if (pos.includes("verb")) {
        structure = `S + <strong>${wordObj.word}</strong> + O / <strong>${wordObj.word}</strong> + doing Sth`;
        usageNoteHtml = `
            <span class="usage-eng">Used as the main verb in a sentence to describe actions. Conjugate according to the subject and tense.</span>
            <span class="usage-vi">Sử dụng làm động từ chính trong câu để diễn tả hành động. Cần chia thì động từ cho phù hợp với chủ ngữ.</span>
        `;
    } else if (pos.includes("noun")) {
        structure = `a/an/the + <strong>${wordObj.word}</strong> / <strong>${wordObj.word}</strong> + of + Sth`;
        usageNoteHtml = `
            <span class="usage-eng">Acts as a subject or object in a sentence. Note whether it is countable or uncountable.</span>
            <span class="usage-vi">Đóng vai trò làm chủ ngữ hoặc tân ngữ trong câu. Cần lưu ý xem là danh từ đếm được hay không đếm được.</span>
        `;
    } else if (pos.includes("adjective")) {
        structure = `be + <strong>${wordObj.word}</strong> + (prep) / <strong>${wordObj.word}</strong> + Noun`;
        usageNoteHtml = `
            <span class="usage-eng">Placed before nouns to modify them, or after linking verbs like *be, seem, feel*.</span>
            <span class="usage-vi">Dùng đứng trước danh từ để bổ nghĩa, hoặc đứng sau hệ động từ (linking verbs) như *be, seem, feel*.</span>
        `;
    } else if (pos.includes("adverb")) {
        structure = `Verb + <strong>${wordObj.word}</strong> / <strong>${wordObj.word}</strong> + Adj`;
        usageNoteHtml = `
            <span class="usage-eng">Modifies verbs, adjectives, or other adverbs to clarify manner, degree, frequency, or time.</span>
            <span class="usage-vi">Dùng bổ nghĩa cho động từ hành động, tính từ hoặc phó từ khác để làm rõ cách thức, mức độ hoặc tần suất.</span>
        `;
    } else if (pos.includes("preposition")) {
        structure = `<strong>${wordObj.word}</strong> + Noun / Noun Phrase`;
        usageNoteHtml = `
            <span class="usage-eng">Indicates position, time, direction, or relationship between sentence elements.</span>
            <span class="usage-vi">Dùng để chỉ vị trí, thời gian, hướng đi hoặc mối quan hệ giữa các thành phần trong câu.</span>
        `;
    } else {
        structure = `<strong>${wordObj.word}</strong> + Word`;
        usageNoteHtml = `
            <span class="usage-eng">Function word used in daily communication contexts.</span>
            <span class="usage-vi">Từ chức năng được sử dụng trong các ngữ cảnh giao tiếp thông dụng.</span>
        `;
    }

    // 2. Parse examples from rawGrammar
    const lines = rawGrammar.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    let examplesHtml = "";
    
    if (lines.length > 0) {
        examplesHtml = lines.map(line => {
            let cleanLine = line.replace(/^[-*]\s*/, "");
            let parts = cleanLine.split("->");
            let eng = parts[0] ? parts[0].trim() : "";
            let vi = parts[1] ? parts[1].trim() : "";
            
            if (vi) {
                return `
                    <div class="grammar-example-item">
                        <p class="example-eng"><i class="fa-solid fa-angles-right"></i> ${eng}</p>
                        <p class="example-vi">${vi}</p>
                    </div>
                `;
            } else {
                return `
                    <div class="grammar-example-item">
                        <p class="example-eng"><i class="fa-solid fa-angles-right"></i> ${eng}</p>
                    </div>
                `;
            }
        }).join("");
    } else {
        examplesHtml = `
            <div class="grammar-example-item">
                <p class="example-eng" style="font-weight: normal; color: var(--text-muted);">
                    No example sentences available / Chưa có ví dụ mẫu.
                </p>
            </div>
        `;
    }

    return `
        <div class="structured-grammar-area">
            <div class="grammar-sub-group">
                <span class="grammar-sub-title"><i class="fa-solid fa-gears"></i> Proposed Structure / Cấu trúc đề xuất</span>
                <code class="grammar-structure-code">${structure}</code>
            </div>
            <div class="grammar-sub-group">
                <span class="grammar-sub-title"><i class="fa-solid fa-circle-info"></i> Usage & Notes / Cách dùng & Lưu ý</span>
                <p class="grammar-usage-text">${usageNoteHtml}</p>
            </div>
            <div class="grammar-sub-group">
                <span class="grammar-sub-title"><i class="fa-solid fa-book-open"></i> Illustrative Examples / Ví dụ minh họa</span>
                <div class="grammar-examples-list">
                    ${examplesHtml}
                </div>
            </div>
        </div>
    `;
}

// ==========================================
// 6.8. AI DIALOGUE GENERATOR FUNCTIONS
// ==========================================
function renderDialogueHtml(dialogueArray, word) {
    const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };
    const wordRegex = new RegExp(`\\b(${escapeRegExp(word)}(s|ed|ing|es|d)?)\\b`, 'gi');
    
    return dialogueArray.map(line => {
        const isSpeakerB = line.speaker === "B" || line.speaker === "b";
        const highlightedEng = line.eng.replace(wordRegex, '<strong>$1</strong>');
        
        return `
            <div class="dialogue-bubble ${isSpeakerB ? "speaker-b" : "speaker-a"}">
                <div class="dialogue-speaker-avatar">${line.speaker.toUpperCase()}</div>
                <div class="dialogue-bubble-body">
                    <span class="dialogue-eng">${highlightedEng}</span>
                    <span class="dialogue-vi">${line.vi}</span>
                </div>
            </div>
        `;
    }).join("");
}

function getOfflineDialogue(word, pos) {
    const p = pos.toLowerCase();
    if (p.includes("verb")) {
        return [
            {speaker: "A", eng: `Can you show me how to ${word} this tool?`, vi: `Bạn có thể chỉ cho tôi cách sử dụng hành động này không?`},
            {speaker: "B", eng: `Sure, you just need to ${word} it carefully like this.`, vi: `Chắc chắn rồi, bạn chỉ cần thực hiện nó một cách cẩn thận như thế này.`},
            {speaker: "A", eng: `Thanks! Now I can do it by myself.`, vi: `Cảm ơn! Bây giờ tôi đã có thể tự làm được rồi.`}
        ];
    } else if (p.includes("noun")) {
        return [
            {speaker: "A", eng: `Is this ${word} useful for our lesson today?`, vi: `Mục này có hữu ích cho bài học hôm nay của chúng ta không?`},
            {speaker: "B", eng: `Yes, learning about this ${word} will help us communicate better.`, vi: `Có, tìm hiểu về chủ đề này sẽ giúp chúng ta giao tiếp tốt hơn.`},
            {speaker: "A", eng: `That is great. Let's study it together.`, vi: `Tuyệt quá. Chúng ta cùng học nó nhé.`}
        ];
    } else if (p.includes("adjective") || p.includes("adj")) {
        return [
            {speaker: "A", eng: `The teacher said this topic is very ${word}.`, vi: `Giáo viên nói rằng chủ đề này rất quan trọng/đặc trưng.`},
            {speaker: "B", eng: `Yes, we need to be ${word} when talking about it.`, vi: `Đúng vậy, chúng ta cần phải lưu ý kỹ khi nói về nó.`},
            {speaker: "A", eng: `I will remember that. Thank you!`, vi: `Tôi sẽ nhớ kỹ điều đó. Cảm ơn bạn!`}
        ];
    } else {
        return [
            {speaker: "A", eng: `Do you want to practice using the word ${word}?`, vi: `Bạn có muốn luyện tập sử dụng từ này không?`},
            {speaker: "B", eng: `Yes, let's make a conversation with ${word} right now.`, vi: `Có, chúng ta hãy cùng trò chuyện với từ này ngay bây giờ.`},
            {speaker: "A", eng: `That is a perfect way to remember it!`, vi: `Đó là một cách hoàn hảo để ghi nhớ nó!`}
        ];
    }
}

async function generateDialogue(w, containerEl, btnEl) {
    const word = w.word;
    const pos = w.pos;
    const cefr = w.cefr;
    const apiKey = state.geminiApiKey || localStorage.getItem("gemini_api_key") || "";
    
    if (!apiKey) {
        const fallbackData = getOfflineDialogue(word, pos);
        containerEl.innerHTML = `
            <div class="dialogue-api-notice">
                <i class="fa-solid fa-triangle-exclamation" style="color: #f59e0b; margin-right: 6px;"></i>
                Bạn chưa cấu hình Gemini API Key. Đang hiển thị <strong>hội thoại mẫu ngoại tuyến</strong>. Nhấn vào biểu tượng <i class="fa-solid fa-gear"></i> cài đặt ở góc trên bên phải để nhập API Key miễn phí và tự động tạo hội thoại động bằng AI.
            </div>
            ${renderDialogueHtml(fallbackData, word)}
        `;
        return;
    }
    
    containerEl.innerHTML = `
        <div class="dialogue-loading-skeleton">
            <div class="skeleton-item">
                <div class="skeleton-avatar"></div>
                <div class="skeleton-text-block"></div>
            </div>
            <div class="skeleton-item right">
                <div class="skeleton-avatar"></div>
                <div class="skeleton-text-block"></div>
            </div>
            <div class="skeleton-item">
                <div class="skeleton-avatar"></div>
                <div class="skeleton-text-block"></div>
            </div>
        </div>
    `;
    
    btnEl.disabled = true;
    btnEl.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Đang tạo...`;
    
    try {
        const prompt = `Create a short, natural English conversational dialogue (3 lines: Speaker A, Speaker B, Speaker A) using the word "${word}" (used as a ${pos}). Keep the vocabulary simple and suited for CEFR ${cefr} level. Provide the English text and its natural Vietnamese translation. Output MUST be a valid JSON object matching this schema exactly: { "dialogue": [ {"speaker": "A", "eng": "...", "vi": "..."}, {"speaker": "B", "eng": "...", "vi": "..."}, {"speaker": "A", "eng": "...", "vi": "..."} ] }`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    responseMimeType: "application/json"
                }
            })
        });
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const resData = await response.json();
        const jsonText = resData.candidates[0].content.parts[0].text;
        const parsed = JSON.parse(jsonText);
        
        if (parsed && parsed.dialogue && Array.isArray(parsed.dialogue)) {
            localStorage.setItem(`ai_dialogue_${word}`, JSON.stringify(parsed.dialogue));
            containerEl.innerHTML = renderDialogueHtml(parsed.dialogue, word);
        } else {
            throw new Error("Invalid response format");
        }
    } catch (err) {
        console.error("AI generation failed:", err);
        const fallbackData = getOfflineDialogue(word, pos);
        containerEl.innerHTML = `
            <div class="dialogue-api-notice" style="background-color: rgba(239, 68, 68, 0.05); border-color: rgba(239, 68, 68, 0.15); color: var(--text-secondary); margin-top: 6px;">
                <i class="fa-solid fa-circle-exclamation" style="color: #ef4444; margin-right: 6px;"></i>
                Không thể kết nối với Gemini API (${err.message}). Đang hiển thị <strong>hội thoại mẫu ngoại tuyến</strong>.
            </div>
            ${renderDialogueHtml(fallbackData, word)}
        `;
    } finally {
        btnEl.disabled = false;
        btnEl.innerHTML = `<i class="fa-solid fa-arrows-rotate"></i> Tạo lại AI`;
    }
}

// Grammar dialogue rendering and fetching functions
function renderGrammarHtml(dialogueArray) {
    return dialogueArray.map(line => {
        const isSpeakerB = line.speaker === "B" || line.speaker === "b";
        return `
            <div class="dialogue-bubble ${isSpeakerB ? "speaker-b" : "speaker-a"}">
                <div class="dialogue-speaker-avatar">${line.speaker.toUpperCase()}</div>
                <div class="dialogue-bubble-body">
                    <span class="dialogue-eng">${line.eng}</span>
                    <span class="dialogue-vi">${line.vi}</span>
                </div>
            </div>
        `;
    }).join("");
}

function getOfflineGrammarDialogue(topicId, sectionIndex) {
    const key = `${topicId}_${sectionIndex}`;
    const fallbackDB = {
        "pos_0": [
            {speaker: "A", eng: `I want to <strong>abandon</strong> this old car.`, vi: `Tôi muốn từ bỏ chiếc xe cũ này.`},
            {speaker: "B", eng: `No, you have the <strong>ability</strong> to fix it!`, vi: `Không, bạn có khả năng sửa nó mà!`},
            {speaker: "A", eng: `That is <strong>beautiful</strong>! Let's do it.`, vi: `Thật tuyệt vời! Chúng ta cùng làm nhé.`}
        ],
        "pos_1": [
            {speaker: "A", eng: `What is the <strong>difference</strong> between these two?`, vi: `Sự khác biệt giữa hai cái này là gì?`},
            {speaker: "B", eng: `One is a <strong>creative</strong> project, the other is not.`, vi: `Một cái là dự án sáng tạo, cái kia thì không.`},
            {speaker: "A", eng: `I see. Let's <strong>simplify</strong> the plan.`, vi: `Tôi hiểu rồi. Hãy đơn giản hóa kế hoạch.`}
        ],
        "tenses_0": [
            {speaker: "A", eng: `I <strong>drink</strong> coffee every morning.`, vi: `Tôi uống cà phê mỗi sáng.`},
            {speaker: "B", eng: `Really? My brother <strong>does</strong> too, but he <strong>prefers</strong> tea.`, vi: `Thật sao? Anh trai tôi cũng vậy, nhưng anh ấy thích trà hơn.`},
            {speaker: "A", eng: `Yes, coffee <strong>gives</strong> me energy for the whole day.`, vi: `Đúng vậy, cà phê cung cấp năng lượng cho tôi cả ngày.`}
        ],
        "tenses_1": [
            {speaker: "A", eng: `What <strong>are you doing</strong> right now?`, vi: `Bạn đang làm gì thế?`},
            {speaker: "B", eng: `I <strong>am studying</strong> for my English exam.`, vi: `Tôi đang học bài cho kỳ thi tiếng Anh.`},
            {speaker: "A", eng: `Great! You <strong>are working</strong> very hard.`, vi: `Tuyệt vời! Bạn đang làm việc rất chăm chỉ.`}
        ],
        "tenses_2": [
            {speaker: "A", eng: `<strong>Have you ever eaten</strong> sushi?`, vi: `Bạn đã từng ăn sushi chưa?`},
            {speaker: "B", eng: `Yes, I <strong>have eaten</strong> it many times. It is delicious!`, vi: `Rồi, tôi đã ăn nó nhiều lần rồi. Nó rất ngon!`},
            {speaker: "A", eng: `I <strong>have not tried</strong> it yet. We should go together.`, vi: `Tôi vẫn chưa thử nó. Chúng ta nên đi cùng nhau.`}
        ],
        "tenses_3": [
            {speaker: "A", eng: `Why are you so tired?`, vi: `Sao trông bạn mệt mỏi thế?`},
            {speaker: "B", eng: `I <strong>have been running</strong> for two hours.`, vi: `Tôi đã chạy bộ liên tục suốt hai tiếng đồng hồ.`},
            {speaker: "A", eng: `Wow! You <strong>have been training</strong> really hard lately.`, vi: `Oa! Dạo này bạn đã tập luyện thực sự chăm chỉ.`}
        ],
        "tenses_4": [
            {speaker: "A", eng: `Where <strong>did you go</strong> yesterday?`, vi: `Hôm qua bạn đã đi đâu thế?`},
            {speaker: "B", eng: `I <strong>went</strong> to the cinema and <strong>watched</strong> a great movie.`, vi: `Tôi đã đi đến rạp chiếu phim và xem một bộ phim rất hay.`},
            {speaker: "A", eng: `Who <strong>did you go</strong> with?`, vi: `Bạn đã đi cùng với ai?`},
            {speaker: "B", eng: `I <strong>went</strong> with my sister.`, vi: `Tôi đã đi cùng với chị gái mình.`}
        ],
        "tenses_5": [
            {speaker: "A", eng: `What <strong>were you doing</strong> at 8 PM last night?`, vi: `Bạn đang làm gì vào lúc 8 giờ tối qua thế?`},
            {speaker: "B", eng: `I <strong>was washing</strong> the dishes while my sister <strong>was watching</strong> TV.`, vi: `Tôi đang rửa bát trong khi chị gái tôi đang xem TV.`},
            {speaker: "A", eng: `I called you but you didn't answer.`, vi: `Tôi đã gọi cho bạn nhưng bạn không nghe máy.`},
            {speaker: "B", eng: `Ah, the water <strong>was running</strong> so loudly.`, vi: `À, tiếng nước chảy to quá.`}
        ],
        "tenses_6": [
            {speaker: "A", eng: `Why were you late for the meeting?`, vi: `Tại sao bạn lại đi họp muộn thế?`},
            {speaker: "B", eng: `Because when I arrived, the train <strong>had already left</strong>.`, vi: `Bởi vì khi tôi đến nơi, chuyến tàu đã khởi hành rồi.`},
            {speaker: "A", eng: `Oh no! If only you <strong>had checked</strong> the schedule.`, vi: `Ôi không! Giá như bạn kiểm tra lịch trình sớm hơn.`}
        ],
        "tenses_7": [
            {speaker: "A", eng: `The ground was very wet this morning.`, vi: `Sáng nay mặt đất ẩm ướt quá.`},
            {speaker: "B", eng: `Yes, it <strong>had been raining</strong> all night before you woke up.`, vi: `Đúng vậy, trời đã mưa liên tục suốt đêm trước khi bạn thức dậy.`},
            {speaker: "A", eng: `I see. No wonder the air feels so fresh now.`, vi: `Ra là vậy. Thảo nào không khí bây giờ trong lành thế.`}
        ],
        "tenses_8": [
            {speaker: "A", eng: `I think it <strong>will rain</strong> tomorrow.`, vi: `Tôi nghĩ ngày mai trời sẽ mưa.`},
            {speaker: "B", eng: `Then I <strong>will bring</strong> an umbrella with me.`, vi: `Vậy thì tôi sẽ mang theo ô bên mình.`},
            {speaker: "A", eng: `Good idea! I <strong>will check</strong> the weather forecast again tonight.`, vi: `Ý kiến hay đấy! Tôi sẽ kiểm tra lại dự báo thời tiết tối nay.`}
        ],
        "tenses_9": [
            {speaker: "A", eng: `Can we meet at 10 AM tomorrow?`, vi: `Chúng ta có thể gặp nhau lúc 10 giờ sáng mai không?`},
            {speaker: "B", eng: `Sorry, I <strong>will be working</strong> at that time.`, vi: `Xin lỗi, lúc đó tôi đang làm việc rồi.`},
            {speaker: "A", eng: `How about 3 PM?`, vi: `Vậy còn 3 giờ chiều thì sao?`},
            {speaker: "B", eng: `Yes, I <strong>will be waiting</strong> for you then.`, vi: `Được chứ, lúc đó tôi sẽ đang đợi bạn.`}
        ],
        "tenses_10": [
            {speaker: "A", eng: `Will you finish the report by tonight?`, vi: `Bạn sẽ hoàn thành báo cáo trước tối nay chứ?`},
            {speaker: "B", eng: `Yes, I <strong>will have completed</strong> it by 9 PM.`, vi: `Có, tôi sẽ hoàn thành xong trước 9 giờ tối.`},
            {speaker: "A", eng: `Perfect! The manager <strong>will have reviewed</strong> it before tomorrow's meeting.`, vi: `Tuyệt vời! Giám đốc sẽ xem qua trước cuộc họp ngày mai.`}
        ],
        "tenses_11": [
            {speaker: "A", eng: `Next month, I <strong>will have been living</strong> here for exactly five years.`, vi: `Tháng tới, tôi sẽ sinh sống ở đây tròn đúng 5 năm.`},
            {speaker: "B", eng: `Time flies so fast! You <strong>will have been working</strong> at your job for five years too?`, vi: `Thời gian trôi nhanh thật đấy! Bạn cũng sẽ làm việc ở chỗ làm được 5 năm luôn chứ?`},
            {speaker: "A", eng: `Almost! It will be four years.`, vi: `Gần thế! Sẽ là 4 năm.`}
        ],
        "passive_0": [
            {speaker: "A", eng: `This cake <strong>was made</strong> by my sister.`, vi: `Chiếc bánh này được làm bởi chị gái tôi.`},
            {speaker: "B", eng: `It looks delicious! Can it <strong>be bought</strong> in a store?`, vi: `Nó trông ngon quá! Nó có thể mua ở cửa hàng không?`},
            {speaker: "A", eng: `No, it is only baked at home.`, vi: `Không, nó chỉ được nướng ở nhà thôi.`}
        ],
        "conditionals_0": [
            {speaker: "A", eng: `What happens if you freeze water?`, vi: `Điều gì xảy ra nếu bạn đông lạnh nước?`},
            {speaker: "B", eng: `It <strong>turns</strong> into ice.`, vi: `Nó chuyển thành đá.`},
            {speaker: "A", eng: `Ah! If you heat ice, it <strong>melts</strong> back to water, right?`, vi: `À! Nếu bạn đun nóng đá, nó tan chảy lại thành nước, đúng không?`},
            {speaker: "B", eng: `Yes, that is a scientific fact.`, vi: `Đúng vậy, đó là sự thật khoa học.`}
        ],
        "conditionals_1": [
            {speaker: "A", eng: `If it <strong>rains</strong> tomorrow, we <strong>will cancel</strong> the picnic.`, vi: `Nếu ngày mai trời mưa, chúng ta sẽ hủy chuyến dã ngoại.`},
            {speaker: "B", eng: `If we cancel it, what <strong>will we do</strong> instead?`, vi: `Nếu chúng ta hủy nó, chúng ta sẽ làm gì thay thế?`},
            {speaker: "A", eng: `If we stay home, we <strong>can watch</strong> movies together.`, vi: `Nếu chúng ta ở nhà, chúng ta có thể xem phim cùng nhau.`}
        ],
        "conditionals_2": [
            {speaker: "A", eng: `If you <strong>won</strong> the lottery, what <strong>would you buy</strong>?`, vi: `Nếu bạn trúng vé số, bạn sẽ mua gì?`},
            {speaker: "B", eng: `If I <strong>were</strong> rich, I <strong>would travel</strong> around the world.`, vi: `Nếu tôi giàu có, tôi sẽ đi du lịch khắp thế giới.`},
            {speaker: "A", eng: `That sounds amazing! If I <strong>had</strong> that much money, I <strong>would build</strong> a school.`, vi: `Nghe thật tuyệt! Nếu tôi có nhiều tiền như vậy, tôi sẽ xây một ngôi trường.`}
        ],
        "conditionals_3": [
            {speaker: "A", eng: `If she <strong>had studied</strong> harder, she <strong>would have passed</strong> the test.`, vi: `Nếu cô ấy học chăm chỉ hơn, cô ấy đã đỗ kỳ thi rồi.`},
            {speaker: "B", eng: `Yes, she was very sad. If I <strong>had known</strong>, I <strong>would have helped</strong> her.`, vi: `Đúng vậy, cô ấy đã rất buồn. Nếu tôi biết, tôi đã giúp cô ấy rồi.`},
            {speaker: "A", eng: `We should comfort her.`, vi: `Chúng ta nên an ủi cô ấy.`}
        ],
        "conditionals_4": [
            {speaker: "A", eng: `If you <strong>had slept</strong> earlier last night, you <strong>would not be</strong> so tired now.`, vi: `Nếu tối qua bạn ngủ sớm hơn, bây giờ bạn đã không mệt mỏi thế này.`},
            {speaker: "B", eng: `I know. If I <strong>had finished</strong> my work on time, I <strong>would be</strong> sleeping right now.`, vi: `Tôi biết. Nếu tôi hoàn thành công việc đúng hạn, tôi đã đang ngủ ngay bây giờ rồi.`},
            {speaker: "A", eng: `Make sure to rest early tonight.`, vi: `Hãy nhớ nghỉ ngơi sớm tối nay.`}
        ],
        "relative_0": [
            {speaker: "A", eng: `Do you know the woman <strong>who</strong> works at the bakery?`, vi: `Bạn có biết người phụ nữ làm việc ở tiệm bánh không?`},
            {speaker: "B", eng: `Yes, she is the lady <strong>who</strong> always gives free cookies.`, vi: `Có, cô ấy là người phụ nữ luôn tặng bánh quy miễn phí.`},
            {speaker: "A", eng: `She is very friendly and generous.`, vi: `Cô ấy rất thân thiện và rộng lượng.`}
        ],
        "relative_1": [
            {speaker: "A", eng: `Is that the teacher <strong>whom</strong> you respect the most?`, vi: `Đó có phải là giáo viên người mà bạn kính trọng nhất không?`},
            {speaker: "B", eng: `Yes, she is the one <strong>whom</strong> all students adore.`, vi: `Đúng vậy, cô ấy là người mà tất cả học sinh đều yêu mến.`},
            {speaker: "A", eng: `I hope I can attend her class next semester.`, vi: `Tôi hy vọng tôi có thể tham gia lớp học của cô ấy học kỳ tới.`}
        ],
        "relative_2": [
            {speaker: "A", eng: `I lost the pen <strong>which</strong> you lent me yesterday.`, vi: `Tôi làm mất chiếc bút mà bạn cho tôi mượn hôm qua rồi.`},
            {speaker: "B", eng: `Don't worry. It was a cheap pen <strong>which</strong> I bought in a supermarket.`, vi: `Đừng lo. Đó chỉ là chiếc bút rẻ tiền tôi mua ở siêu thị.`},
            {speaker: "A", eng: `I will buy you a new one today.`, vi: `Hôm nay tôi sẽ mua cho bạn một chiếc mới.`}
        ],
        "relative_3": [
            {speaker: "A", eng: `I love movies <strong>that</strong> have happy endings.`, vi: `Tôi thích những bộ phim mà có kết thúc hạnh phúc.`},
            {speaker: "B", eng: `Really? I prefer books <strong>that</strong> make me think deeply.`, vi: `Thật sao? Tôi thích những cuốn sách mà khiến tôi phải suy nghĩ sâu sắc hơn.`},
            {speaker: "A", eng: `Everyone has their own taste!`, vi: `Mỗi người có một sở thích riêng mà!`}
        ],
        "relative_4": [
            {speaker: "A", eng: `That is the girl <strong>whose</strong> father is a famous actor.`, vi: `Đó là cô gái có bố là một diễn viên nổi tiếng.`},
            {speaker: "B", eng: `Ah, she is the one <strong>whose</strong> talent won the prize last week.`, vi: `À, cô ấy là người có tài năng đã giành giải thưởng tuần trước.`},
            {speaker: "A", eng: `She is indeed very gifted.`, vi: `Cô ấy thực sự rất có năng khiếu.`}
        ],
        "comparison_0": [
            {speaker: "A", eng: `She is <strong>as tall as</strong> her mother.`, vi: `Cô ấy cao bằng mẹ mình.`},
            {speaker: "B", eng: `But she does not run <strong>as fast as</strong> her sister.`, vi: `Nhưng cô ấy chạy không nhanh bằng chị mình.`},
            {speaker: "A", eng: `That is fine, she is still good at sports.`, vi: `Không sao cả, cô ấy vẫn chơi thể thao tốt.`}
        ],
        "comparison_1": [
            {speaker: "A", eng: `Learning English is <strong>easier</strong> than learning French.`, vi: `Học tiếng Anh thì dễ hơn học tiếng Pháp.`},
            {speaker: "B", eng: `I think French is <strong>more beautiful</strong> to hear.`, vi: `Tôi nghĩ tiếng Pháp nghe đẹp/hay hơn.`},
            {speaker: "A", eng: `But English is <strong>more popular</strong> in the world.`, vi: `Nhưng tiếng Anh thì phổ biến hơn trên thế giới.`}
        ],
        "comparison_2": [
            {speaker: "A", eng: `This is the <strong>most beautiful</strong> picture in the gallery.`, vi: `Đây là bức tranh đẹp nhất trong phòng triển lãm.`},
            {speaker: "B", eng: `And it was painted by the <strong>youngest</strong> artist!`, vi: `Và nó được vẽ bởi họa sĩ trẻ tuổi nhất!`},
            {speaker: "A", eng: `Wow, she must be the <strong>most talented</strong> person.`, vi: `Oa, cô ấy hẳn là người tài năng nhất.`}
        ]
    };
    return fallbackDB[key] || fallbackDB["pos_0"];
}

async function generateGrammarDialogue(topicId, topicTitle, sectionTitle, sectionIndex, containerEl, btnEl) {
    const apiKey = state.geminiApiKey || localStorage.getItem("gemini_api_key") || "";
    
    if (!apiKey) {
        const fallbackData = getOfflineGrammarDialogue(topicId, sectionIndex);
        containerEl.innerHTML = `
            <div class="dialogue-api-notice">
                <i class="fa-solid fa-triangle-exclamation" style="color: #f59e0b; margin-right: 6px;"></i>
                Bạn chưa cấu hình Gemini API Key. Đang hiển thị <strong>hội thoại mẫu ngoại tuyến</strong>. Nhấn vào biểu tượng <i class="fa-solid fa-gear"></i> cài đặt ở góc trên bên phải để nhập API Key miễn phí và tự động tạo hội thoại động bằng AI.
            </div>
            ${renderGrammarHtml(fallbackData)}
        `;
        return;
    }
    
    containerEl.innerHTML = `
        <div class="dialogue-loading-skeleton">
            <div class="skeleton-item">
                <div class="skeleton-avatar"></div>
                <div class="skeleton-text-block"></div>
            </div>
            <div class="skeleton-item right">
                <div class="skeleton-avatar"></div>
                <div class="skeleton-text-block"></div>
            </div>
            <div class="skeleton-item">
                <div class="skeleton-avatar"></div>
                <div class="skeleton-text-block"></div>
            </div>
        </div>
    `;
    
    btnEl.disabled = true;
    btnEl.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Đang tạo...`;
    
    try {
        const prompt = `Create a short, natural English conversational dialogue (3 lines: Speaker A, Speaker B, Speaker A) demonstrating the English grammar rule: "${sectionTitle}" (from the topic: "${topicTitle}"). Highlight the sentences using this grammar structure by surrounding them with <strong> tags. Keep the vocabulary simple and suited for learners. Provide the English text and its natural Vietnamese translation. Output MUST be a valid JSON object matching this schema exactly: { "dialogue": [ {"speaker": "A", "eng": "...", "vi": "..."}, {"speaker": "B", "eng": "...", "vi": "..."}, {"speaker": "A", "eng": "...", "vi": "..."} ] }`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    responseMimeType: "application/json"
                }
            })
        });
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const resData = await response.json();
        const jsonText = resData.candidates[0].content.parts[0].text;
        const parsed = JSON.parse(jsonText);
        
        if (parsed && parsed.dialogue && Array.isArray(parsed.dialogue)) {
            localStorage.setItem(`grammar_dialogue_${topicId}_${sectionIndex}`, JSON.stringify(parsed.dialogue));
            containerEl.innerHTML = renderGrammarHtml(parsed.dialogue);
        } else {
            throw new Error("Invalid response format");
        }
    } catch (err) {
        console.error("AI grammar dialogue generation failed:", err);
        const fallbackData = getOfflineGrammarDialogue(topicId, sectionIndex);
        containerEl.innerHTML = `
            <div class="dialogue-api-notice" style="background-color: rgba(239, 68, 68, 0.05); border-color: rgba(239, 68, 68, 0.15); color: var(--text-secondary); margin-top: 6px;">
                <i class="fa-solid fa-circle-exclamation" style="color: #ef4444; margin-right: 6px;"></i>
                Không thể kết nối với Gemini API (${err.message}). Đang hiển thị <strong>hội thoại mẫu ngoại tuyến</strong>.
            </div>
            ${renderGrammarHtml(fallbackData)}
        `;
    } finally {
        btnEl.disabled = false;
        btnEl.innerHTML = `<i class="fa-solid fa-arrows-rotate"></i> Tạo lại AI`;
    }
}

// Render Grid cards
function renderVocabularyGrid(filteredWords) {
    const grid = document.getElementById("vocabularyGrid");
    
    if (state.renderedCount === 0) {
        grid.innerHTML = "";
    }
    
    const startIdx = state.renderedCount;
    const endIdx = Math.min(startIdx + 30, filteredWords.length);
    
    if (startIdx >= filteredWords.length) {
        document.getElementById("loadingTrigger").style.display = "none";
        return;
    }
    
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
                        <button class="audio-mini-btn play-kid-btn" title="Nghe giọng Trẻ em (4-10 tuổi)"><i class="fa-solid fa-child"></i> KID</button>
                    </div>
                </div>
                
                <div class="card-meanings">
                    <div class="meaning-item meaning-vi-item">
                        <span class="meaning-badge badge-vi">Giải nghĩa (VIET)</span>
                        <p class="card-vi">${w.def_vi}</p>
                    </div>
                    <div class="meaning-item meaning-en-item">
                        <span class="meaning-badge badge-en">Definition (ENG-ENG)</span>
                        <p class="card-en">${w.def_en}</p>
                    </div>
                </div>
                
                <div class="card-spelling">
                    Spelling pattern / Dấu hiệu âm: <strong>${spellingPattern}</strong>
                </div>

                <div class="card-expandable ${isExpanded ? "show" : ""}">
                    <div class="expand-group">
                        <span class="expand-group-title">Context / Hoàn cảnh giao tiếp:</span>
                        <p class="expand-group-desc">${w.context}</p>
                    </div>
                    ${formatGrammarSection(w)}
                    <div class="card-dialogue-area">
                        <div class="dialogue-title-row">
                            <span class="dialogue-section-title"><i class="fa-solid fa-comments"></i> Hội thoại mẫu giao tiếp:</span>
                            <button class="ai-dialogue-btn" data-word="${w.word}"><i class="fa-solid fa-robot"></i> Tạo hội thoại AI</button>
                        </div>
                        <div class="card-dialogue-container" id="dialogueContainer_${w.word}"></div>
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
                    <span>${isExpanded ? "Collapse / Thu gọn" : "Show Details / Xem ví dụ"}</span> <i class="fa-solid fa-chevron-down"></i>
                </button>
            </div>
        `;
        
        // --- Bind Card Clicks ---
        
        card.querySelector(".play-us-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            playAudio(w.word, 2);
        });
        
        card.querySelector(".play-uk-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            playAudio(w.word, 1);
        });

        card.querySelector(".play-kid-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            playKidAudio(w.word);
        });

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
            if (state.activeMode === "bookmark") {
                updateView();
            }
        });

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
            updateProgressWidget();
            updateStatsBanner();
            if (state.activeMode === "learned") {
                updateView();
            }
        });

        card.querySelector(".mic-mini-btn").addEventListener("click", () => {
            startSpeechCheck(w.word);
        });
        
        const aiBtn = card.querySelector(".ai-dialogue-btn");
        const dialogueContainer = card.querySelector(`#dialogueContainer_${w.word}`);
        
        // Show cached dialogue immediately if it exists
        const cached = localStorage.getItem(`ai_dialogue_${w.word}`);
        if (cached) {
            try {
                const parsed = JSON.parse(cached);
                dialogueContainer.innerHTML = renderDialogueHtml(parsed, w.word);
                aiBtn.innerHTML = `<i class="fa-solid fa-arrows-rotate"></i> Tạo lại AI`;
            } catch (e) {
                console.error("Failed to parse cached dialogue", e);
            }
        }
        
        aiBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            generateDialogue(w, dialogueContainer, aiBtn);
        });
        
        grid.appendChild(card);
    }
    
    state.renderedCount = endIdx;
}

// Render Flashcard
function renderFlashcard(filteredWords) {
    if (state.flashcardIndex >= filteredWords.length) {
        state.flashcardIndex = 0;
    }
    if (state.flashcardIndex < 0) {
        state.flashcardIndex = filteredWords.length - 1;
    }
    
    const w = filteredWords[state.flashcardIndex];
    
    document.getElementById("fcWord").textContent = w.word;
    document.getElementById("fcPos").textContent = w.pos;
    document.getElementById("fcIpa").textContent = w.ipa;
    
    const spellingPattern = detectSpellingPattern(w.word, state.currentSound);
    document.getElementById("fcSpelling").textContent = spellingPattern;
    
    const cefrBadge = document.getElementById("fcCefr");
    cefrBadge.className = `cefr-badge cefr-${w.cefr.toLowerCase()}`;
    cefrBadge.textContent = w.cefr;
    
    document.getElementById("fcDefVi").textContent = w.def_vi;
    document.getElementById("fcDefEn").textContent = w.def_en;
    document.getElementById("fcContext").textContent = w.context;
    document.getElementById("fcGrammar").innerHTML = formatGrammarSection(w);
    
    document.getElementById("fcProgress").textContent = `${state.flashcardIndex + 1} / ${filteredWords.length}`;
    
    const card = document.getElementById("flipCard");
    card.classList.remove("flipped");
    
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

// ==========================================
// 8. QUIZ MODE LOGIC
// ==========================================

function setupQuizScreen() {
    const startScreen = document.getElementById("quizStartScreen");
    const questionScreen = document.getElementById("quizQuestionScreen");
    const resultScreen = document.getElementById("quizResultScreen");
    
    startScreen.style.display = "flex";
    questionScreen.style.display = "none";
    resultScreen.style.display = "none";
    
    document.getElementById("quizStartSound").textContent = `/${state.currentSound}/`;
}

function startQuiz() {
    // Get all words matching current sound
    const availableWords = VOCABULARY_DATA.filter(w => wordMatchesSound(w, state.currentSound));
    
    if (availableWords.length === 0) {
        alert("Không có từ vựng nào thuộc âm này để tạo trắc nghiệm!");
        return;
    }
    
    // Choose 5 random words (or fewer if total available is less than 5)
    const countToPick = Math.min(5, availableWords.length);
    const shuffled = [...availableWords].sort(() => 0.5 - Math.random());
    
    quizState.words = shuffled.slice(0, countToPick);
    quizState.currentIndex = 0;
    quizState.score = 0;
    
    document.getElementById("quizStartScreen").style.display = "none";
    document.getElementById("quizQuestionScreen").style.display = "flex";
    
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const w = quizState.words[quizState.currentIndex];
    quizState.correctAnswer = w.def_vi;
    
    // Header Info
    document.getElementById("quizQuestionNum").textContent = `Câu hỏi ${quizState.currentIndex + 1} / ${quizState.words.length}`;
    document.getElementById("quizScoreText").textContent = quizState.score;
    
    // Word detail
    document.getElementById("quizQuestionWord").textContent = w.word;
    document.getElementById("quizQuestionIpa").textContent = w.ipa;
    
    // Audio buttons
    const audioUsBtn = document.getElementById("quizAudioUsBtn");
    const audioUkBtn = document.getElementById("quizAudioUkBtn");
    const audioKidBtn = document.getElementById("quizAudioKidBtn");
    
    // Clear old listeners
    const newUsBtn = audioUsBtn.cloneNode(true);
    audioUsBtn.parentNode.replaceChild(newUsBtn, audioUsBtn);
    newUsBtn.addEventListener("click", () => playAudio(w.word, 2));
    
    const newUkBtn = audioUkBtn.cloneNode(true);
    audioUkBtn.parentNode.replaceChild(newUkBtn, audioUkBtn);
    newUkBtn.addEventListener("click", () => playAudio(w.word, 1));
    
    const newKidBtn = audioKidBtn.cloneNode(true);
    audioKidBtn.parentNode.replaceChild(newKidBtn, audioKidBtn);
    newKidBtn.addEventListener("click", () => playKidAudio(w.word));
    
    // Auto play audio on question start
    playAudio(w.word, 2);
    
    // Generate Options (1 correct, 3 distractors)
    const distractors = [];
    const fullPool = VOCABULARY_DATA.filter(item => item.def_vi !== w.def_vi);
    const shuffledPool = fullPool.sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < shuffledPool.length; i++) {
        const item = shuffledPool[i];
        if (!distractors.includes(item.def_vi) && item.def_vi.length > 0) {
            distractors.push(item.def_vi);
        }
        if (distractors.length >= 3) break;
    }
    
    // Shuffled Options List
    const options = [w.def_vi, ...distractors].sort(() => 0.5 - Math.random());
    
    // Render Option buttons
    const optionsList = document.getElementById("quizOptionsList");
    optionsList.innerHTML = "";
    
    options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "quiz-option-btn";
        btn.textContent = opt;
        
        btn.addEventListener("click", () => {
            handleQuizAnswer(btn, opt);
        });
        
        optionsList.appendChild(btn);
    });
    
    // Hide explanation initially
    document.getElementById("quizExplanation").style.display = "none";
}

function handleQuizAnswer(selectedBtn, chosenOption) {
    // Disable all options
    document.querySelectorAll(".quiz-option-btn").forEach(btn => btn.disabled = true);
    
    const isCorrect = chosenOption === quizState.correctAnswer;
    
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        quizState.score++;
        document.getElementById("quizScoreText").textContent = quizState.score;
        // Play success chime or sound could go here
    } else {
        selectedBtn.classList.add("incorrect");
        // Highlight the correct one
        document.querySelectorAll(".quiz-option-btn").forEach(btn => {
            if (btn.textContent === quizState.correctAnswer) {
                btn.classList.add("correct");
            }
        });
    }
    
    // Show Explanation
    const currentWord = quizState.words[quizState.currentIndex];
    document.getElementById("quizExplainVi").textContent = currentWord.def_vi;
    // Format quiz examples for display
    const cleanQuizEx = currentWord.grammar.split("\n").map(l => l.trim().replace(/^[-*]\s*/, "")).filter(l => l.length > 0).join("\n");
    document.getElementById("quizExplainExamples").textContent = cleanQuizEx;
    document.getElementById("quizExplanation").style.display = "flex";
}

function nextQuizQuestion() {
    quizState.currentIndex++;
    if (quizState.currentIndex < quizState.words.length) {
        renderQuizQuestion();
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    document.getElementById("quizQuestionScreen").style.display = "none";
    
    const resultScreen = document.getElementById("quizResultScreen");
    resultScreen.style.display = "flex";
    
    const scoreVal = document.getElementById("quizResultScore");
    const scoreTitle = document.getElementById("quizResultTitle");
    const scoreDesc = document.getElementById("quizResultDesc");
    const trophyIcon = document.getElementById("quizResultIcon");
    
    scoreVal.textContent = `${quizState.score} / ${quizState.words.length}`;
    
    if (quizState.score === quizState.words.length) {
        scoreTitle.textContent = "Hoàn hảo!";
        scoreDesc.textContent = "Tuyệt cú mèo! Bạn đã trả lời đúng tất cả các câu hỏi của âm này!";
        trophyIcon.className = "fa-solid fa-trophy quiz-trophy-icon";
        trophyIcon.style.color = "#fbbf24";
    } else if (quizState.score >= 3) {
        scoreTitle.textContent = "Khá tốt!";
        scoreDesc.textContent = "Bạn nắm bài khá vững rồi đấy. Tiếp tục phát huy nhé!";
        trophyIcon.className = "fa-solid fa-medal quiz-trophy-icon";
        trophyIcon.style.color = "#a7f3d0";
    } else {
        scoreTitle.textContent = "Cố gắng lên!";
        scoreDesc.textContent = "Đừng nản lòng, hãy xem lại ví dụ và luyện phát âm nhiều hơn nhé!";
        trophyIcon.className = "fa-solid fa-heart-crack quiz-trophy-icon";
        trophyIcon.style.color = "#f43f5e";
    }
}

// ==========================================
// 9. EVENT BINDINGS & INIT
// ==========================================

function setupFlashcardActions() {
    const card = document.getElementById("flipCard");
    
    card.addEventListener("click", (e) => {
        if (e.target.closest('.fc-audio-btn') || e.target.closest('.fc-mic-btn') || e.target.closest('.fc-action-btn')) {
            return;
        }
        card.classList.toggle("flipped");
    });
    
    document.getElementById("fcAudioUsBtn").addEventListener("click", (e) => {
        e.stopPropagation();
        const word = document.getElementById("fcWord").textContent;
        playAudio(word, 2);
    });
    
    document.getElementById("fcAudioUkBtn").addEventListener("click", (e) => {
        e.stopPropagation();
        const word = document.getElementById("fcWord").textContent;
        playAudio(word, 1);
    });

    document.getElementById("fcAudioKidBtn").addEventListener("click", (e) => {
        e.stopPropagation();
        const word = document.getElementById("fcWord").textContent;
        playKidAudio(word);
    });

    document.getElementById("fcMicBtn").addEventListener("click", (e) => {
        e.stopPropagation();
        const word = document.getElementById("fcWord").textContent;
        startSpeechCheck(word);
    });

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
        updateProgressWidget();
        updateStatsBanner();
    });

    document.getElementById("fcNextBtn").addEventListener("click", () => {
        const filtered = getFilteredData();
        state.flashcardIndex++;
        if (state.flashcardIndex >= filtered.length) {
            state.flashcardIndex = 0;
        }
        renderFlashcard(filtered);
    });

    document.getElementById("fcPrevBtn").addEventListener("click", () => {
        const filtered = getFilteredData();
        state.flashcardIndex--;
        if (state.flashcardIndex < 0) {
            state.flashcardIndex = filtered.length - 1;
        }
        renderFlashcard(filtered);
    });
}

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

    // Voice Search Button Binding
    document.getElementById("voiceSearchBtn").addEventListener("click", () => {
        startVoiceSearch();
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
            
            // Re-render sidebar to highlight active sound pill if we were in grammar mode
            renderSidebar();
            
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

    // Play raw sound sample in banner (Sidebar soundboard)
    document.getElementById("playRawSoundBtn").addEventListener("click", () => {
        playRawPhoneme(state.currentSound);
    });

    document.getElementById("bannerSoundSymbol").addEventListener("click", () => {
        playRawPhoneme(state.currentSound);
    });

    // Play banner sample pronunciation in different voices
    document.getElementById("playBannerSampleUs").addEventListener("click", () => {
        const sampleWord = REPRESENTATIVE_WORDS[state.currentSound];
        if (sampleWord) {
            playAudio(sampleWord, 2); // US
        }
    });

    document.getElementById("playBannerSampleUk").addEventListener("click", () => {
        const sampleWord = REPRESENTATIVE_WORDS[state.currentSound];
        if (sampleWord) {
            playAudio(sampleWord, 1); // UK
        }
    });

    document.getElementById("playBannerSampleKid").addEventListener("click", () => {
        const sampleWord = REPRESENTATIVE_WORDS[state.currentSound];
        if (sampleWord) {
            playKidAudio(sampleWord); // KID
        }
    });

    // Quiz Buttons Event Binding
    document.getElementById("quizStartBtn").addEventListener("click", startQuiz);
    document.getElementById("quizNextBtn").addEventListener("click", nextQuizQuestion);
    document.getElementById("quizRetryBtn").addEventListener("click", startQuiz);
    document.getElementById("quizBackBtn").addEventListener("click", () => {
        // Return to Study Mode
        document.querySelectorAll(".nav-tab-btn").forEach(t => t.classList.remove("active"));
        document.getElementById("tabStudy").classList.add("active");
        state.activeMode = "study";
        state.renderedCount = 0;
        state.expandedCards.clear();
        updateView();
    });

    // Settings modal bindings
    const settingsBtn = document.getElementById("settingsBtn");
    const settingsModal = document.getElementById("settingsModal");
    const closeSettingsBtn = document.getElementById("closeSettingsModalBtn");
    const cancelSettingsBtn = document.getElementById("cancelSettingsBtn");
    const saveSettingsBtn = document.getElementById("saveSettingsBtn");
    const geminiApiKeyInput = document.getElementById("geminiApiKeyInput");
    const toggleApiKeyVisibility = document.getElementById("toggleApiKeyVisibility");

    settingsBtn.addEventListener("click", () => {
        geminiApiKeyInput.value = state.geminiApiKey || "";
        settingsModal.style.display = "flex";
    });

    const hideSettingsModal = () => {
        settingsModal.style.display = "none";
    };

    closeSettingsBtn.addEventListener("click", hideSettingsModal);
    cancelSettingsBtn.addEventListener("click", hideSettingsModal);

    saveSettingsBtn.addEventListener("click", () => {
        const key = geminiApiKeyInput.value.trim();
        saveApiKey(key);
        hideSettingsModal();
        alert("Đã lưu API Key thành công!");
    });

    toggleApiKeyVisibility.addEventListener("click", () => {
        const type = geminiApiKeyInput.getAttribute("type") === "password" ? "text" : "password";
        geminiApiKeyInput.setAttribute("type", type);
        const icon = toggleApiKeyVisibility.querySelector("i");
        icon.className = type === "password" ? "fa-solid fa-eye" : "fa-solid fa-eye-slash";
    });

    settingsModal.addEventListener("click", (e) => {
        if (e.target === settingsModal) {
            hideSettingsModal();
        }
    });

    // Infinite Scroll trigger via window scroll
    window.addEventListener("scroll", () => {
        if (state.activeMode === "flashcard" || state.activeMode === "quiz") return;
        
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
