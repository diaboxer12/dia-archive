const data = window.DIA_SITE_DATA;
const $ = (selector) => document.querySelector(selector);
const activeCase = data.cases.find((item) => item.id === data.activeCaseId) || data.cases[0];
const activeSeason = data.seasons.find((item) => item.id === data.activeSeasonId) || data.seasons[0];

function pageName() {
  return document.body.dataset.page || "home";
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function ui(path, fallback = "") {
  const value = path.split(".").reduce((node, key) => node?.[key], data.ui);
  return value ?? fallback;
}

function seasonItems(items) {
  return items.filter((item) => !item.seasonId || item.seasonId === data.activeSeasonId);
}

function evidenceById(id) {
  return data.evidences.find((item) => item.id === id);
}

function puzzleById(id) {
  return data.puzzles.find((item) => item.id === id);
}

function isLocked(item) {
  return item.visibility !== "public";
}

function statusLabel(status) {
  return ui(`statusLabels.${status}`, status);
}

function badgeLabel(item) {
  if (item.status === "partial" || item.status === "public") return "PUBLIC";
  if (item.status === "failed") return "FAILED";
  if (item.status === "denied") return "DENIED";
  return "LOCKED";
}

function imageThumb(item, mode = "card") {
  const fit = mode === "detail" ? "contain" : (item.thumbFit || "cover");
  const focus = mode === "detail" ? "50% 50%" : (item.thumbFocus || "50% 50%");
  return item.thumbnail
    ? `<img src="${escapeHtml(item.thumbnail)}" alt="${escapeHtml(item.title)}" style="--fit:${escapeHtml(fit)}; --focus:${escapeHtml(focus)}" onerror="this.remove()">`
    : `<span class="preview-label">${escapeHtml(item.previewLabel || "NO PREVIEW")}</span>`;
}

function fileCard(item, compact = false) {
  const locked = isLocked(item);
  const href = locked ? "#" : `file.html?id=${encodeURIComponent(item.id)}`;
  const lockAttrs = locked ? `data-locked-file="true" data-locked-title="${escapeHtml(item.title)}"` : "";
  return `
    <a class="file-card ${compact ? "compact-file-card" : ""} ${locked ? "locked-evidence-card" : ""} status-${escapeHtml(item.status)} visibility-${escapeHtml(item.visibility)}" href="${href}" ${lockAttrs}>
      <div class="file-code"><span>${escapeHtml(item.id)}</span><span class="status-badge ${escapeHtml(item.status)}">${badgeLabel(item)}</span></div>
      <div class="thumb ${escapeHtml(item.visualType)} ${locked ? "restricted-thumb" : ""}">${imageThumb(item, "card")}</div>
      <div>
        <div class="file-title">${escapeHtml(item.title)}</div>
        <div class="file-date">${escapeHtml(item.date)}</div>
      </div>
      <div class="mini-progress"><span>복구율</span><div class="bar" style="--value:${item.recovery}%"><span></span></div></div>
      <div class="file-tag">TAG: ${escapeHtml(item.tag || item.puzzle || "EVIDENCE")}</div>
      <div class="file-status">${escapeHtml(statusLabel(item.status))}</div>
    </a>
  `;
}

function shell(active) {
  const nav = [
    ["index.html", ui("nav.home", "HOME"), "home"],
    ["case.html", ui("nav.case", "CASE FILES"), "case"],
    ["archive.html", ui("nav.archive", "EVIDENCE ARCHIVE"), "archive"],
    ["terminal.html", ui("nav.terminal", "RECOVERY TERMINAL"), "terminal"],
    ["log.html", ui("nav.log", "SYSTEM LOG"), "log"],
    ["hints.html", ui("nav.hints", "HINT DIRECTORY"), "hints"]
  ];
  return `
    <header class="topbar">
      <a class="brand" href="index.html" aria-label="HOME">
        <div class="dia-mark">DIA</div>
        <div>
          <div class="brand-title">${escapeHtml(ui("brandTitle", "Digital Incident Archive"))}</div>
          <div class="access-tag">${escapeHtml(ui("accessTag", "RESTRICTED ACCESS"))}</div>
        </div>
      </a>
      <nav class="nav">
        ${nav.map(([href, label, key]) => `<a class="${active === key ? "active" : ""}" href="${href}">${label}</a>`).join("")}
      </nav>
      <div class="visitor">${escapeHtml(ui("visitorId", "VISITOR_017"))}</div>
    </header>
  `;
}

function seasonStrip() {
  return `
    <div class="season-strip">
      ${data.seasons.map((season) => `
        <div class="season-chip ${season.id === data.activeSeasonId ? "active" : "inactive"}">
          <span>${escapeHtml(season.id)}</span>
          <strong>${escapeHtml(season.title)}</strong>
          <em>${escapeHtml(season.status)}</em>
        </div>
      `).join("")}
    </div>
  `;
}

function casePanel() {
  return `
    <aside class="panel case-panel">
      <div class="panel-body">
        <div class="red">${escapeHtml(ui("panels.currentCase", "CURRENT CASE"))}</div>
        <div class="rule"></div>
        <div class="case-id">${escapeHtml(activeCase.id)}</div>
        <div class="case-name">${escapeHtml(activeCase.title)}</div>
        <div class="rule"></div>
        <div class="meta">
          <div><span>${escapeHtml(ui("labels.season", "시즌"))}</span><strong>${escapeHtml(activeSeason.id)}</strong></div>
          <div><span>${escapeHtml(ui("labels.incidentDate", "사건 발생일"))}</span><strong>${escapeHtml(activeCase.incidentDate)}</strong></div>
          <div><span>${escapeHtml(ui("labels.firstRegistered", "최초 등록일"))}</span><strong>${escapeHtml(activeCase.firstRegistered)}</strong></div>
          <div><span>${escapeHtml(ui("labels.caseStatus", "사건 상태"))}</span><strong>${escapeHtml(activeCase.status)}</strong></div>
        </div>
        <div class="progress-line">
          <div class="progress-info"><span>${escapeHtml(ui("labels.recovery", "복구율"))}</span><strong>${activeCase.recovery}%</strong></div>
          <div class="bar case-progress" style="--value:${activeCase.recovery}%"><span></span></div>
        </div>
        <div class="meta">
          <div><span>${escapeHtml(ui("labels.publicFiles", "공개 자료"))}</span><strong>${escapeHtml(activeCase.publicFiles)}</strong></div>
          <div><span>${escapeHtml(ui("labels.latestUpdate", "최근 갱신"))}</span><strong>${escapeHtml(activeCase.latestUpdate)}</strong></div>
        </div>
        <a class="side-button" href="case.html">${escapeHtml(ui("buttons.openCaseFile", "OPEN CASE FILE"))} <span>&gt;</span></a>
        <div class="rule notice-rule"></div>
        <div class="red">${escapeHtml(ui("panels.notice", "NOTICE"))}</div>
        <p class="notice">${escapeHtml(activeCase.notice)}</p>
        <div class="system-box">${escapeHtml(ui("footerSystem", "D.I.A EVIDENCE RECOVERY SYSTEM\nTERMINAL v2.3.1")).replace(/\n/g, "<br>")}<div class="barcode"></div></div>
      </div>
    </aside>
  `;
}

function notesPanel() {
  return `
    <section class="panel">
      <div class="panel-head">${escapeHtml(ui("panels.archiveNotes", "ARCHIVE NOTES"))}</div>
      <div class="panel-body">
        <ul class="notes-list">${data.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>
      </div>
    </section>
  `;
}

function lockedPanel() {
  return `
    <section class="panel">
      <div class="panel-head">${escapeHtml(ui("panels.lockedFiles", "LOCKED FILES"))}</div>
      <div class="panel-body locked-card-list">
        ${data.lockedFiles.slice(0, 5).map((item) => {
          const evidence = evidenceById(item.id);
          return `
          <div class="locked-file ${escapeHtml(item.tone)}">
            <div class="locked-thumb-mini ${evidence ? escapeHtml(evidence.visualType) : ""}">${evidence ? imageThumb(evidence, "card") : "LOCK"}</div>
            <div>
              <strong>${escapeHtml(item.id)}</strong>
              <span>${escapeHtml(item.title)}</span>
              <em>${escapeHtml(item.tone?.toUpperCase() || "RESTRICTED")}</em>
              <small>${escapeHtml(item.state)}</small>
            </div>
          </div>
        `}).join("")}
      </div>
    </section>
  `;
}

function hintsPanel() {
  return `
    <section class="panel">
      <div class="panel-head">${escapeHtml(ui("panels.hintDirectory", "HINT DIRECTORY"))}</div>
      <div class="panel-body hint-list">
        ${data.hints.map((hint, index) => `<a class="hint-row" href="hints.html#hint-${index}"><span><strong>${escapeHtml(hint.id)}</strong><br>${escapeHtml(hint.text)}</span><span>${hint.status.toUpperCase()}</span></a>`).join("")}
      </div>
    </section>
  `;
}

function terminalPanel() {
  return `
    <section class="panel">
      <div class="panel-head">${escapeHtml(ui("panels.recoveryTerminal", "RECOVERY TERMINAL"))}</div>
      <div class="panel-body">
        <div class="terminal-text">${escapeHtml(ui("terminal.intro", "입력한 코드를 확인하십시오."))}</div>
        <div class="terminal-row">
          <input id="answer" placeholder="${escapeHtml(ui("terminal.placeholder", "CODE 입력"))}">
          <button class="enter" id="enterCode">${escapeHtml(ui("buttons.verifyCode", "VERIFY CODE"))}</button>
        </div>
        <p class="terminal-result" id="terminalResult">${escapeHtml(ui("terminal.defaultMessage", "대기 중. 복구 코드를 입력하십시오."))}</p>
      </div>
    </section>
  `;
}

function logPanel(limit = 7) {
  return `
    <section class="panel">
      <div class="panel-head"><span>${escapeHtml(ui("panels.systemLog", "SYSTEM LOG"))}</span><a href="log.html">${escapeHtml(ui("buttons.viewLog", "VIEW LOG"))} &gt;</a></div>
      <div class="panel-body log-list">
        ${seasonItems(data.logs).slice(0, limit).map((log) => `<div class="log-row"><span>${escapeHtml(log.date)}</span><span>${escapeHtml(log.text)}</span></div>`).join("")}
      </div>
    </section>
  `;
}

function unresolvedPanel() {
  return `<section class="panel"><div class="panel-head">${escapeHtml(ui("panels.unresolvedItems", "UNRESOLVED ITEMS"))}</div><div class="panel-body numbered-list">${data.unresolvedItems.map((item, index) => `<div><strong>${String(index + 1).padStart(2, "0")}.</strong><span>${escapeHtml(item)}</span></div>`).join("")}</div></section>`;
}

function publicAnalysisPanel() {
  return `<section class="panel"><div class="panel-head">${escapeHtml(ui("panels.publicAnalysis", "PUBLIC ANALYSIS"))}</div><div class="panel-body analysis-list">${data.publicAnalysis.map((item) => `<div><strong>${escapeHtml(item.user)}</strong><span>${escapeHtml(item.text)}</span></div>`).join("")}</div></section>`;
}

function relationItems() {
  return [data.fileRelations[0]?.[0], ...data.fileRelations.map((edge) => edge[1])].filter(Boolean);
}

function relationPanel() {
  return `<section class="panel"><div class="panel-head">${escapeHtml(ui("panels.fileRelation", "FILE RELATION"))}</div><div class="panel-body relation-chain">${relationItems().map((item, index) => `<div style="--depth:${index}"><span>${index === 0 ? "" : "└─"}</span>${escapeHtml(item)}</div>`).join("")}</div></section>`;
}

function paperStrip() {
  return `<div class="archive-paper-strip" aria-hidden="true"><span>열람할 수 있는 기록이 있습니다.</span></div>`;
}

function puzzleCards() {
  return `
    <div class="puzzle-grid">
      ${seasonItems(data.puzzles).map((puzzle) => `
        <a class="puzzle-card ${escapeHtml(puzzle.status)}" href="puzzle.html?id=${encodeURIComponent(puzzle.id)}">
          <div class="puzzle-top"><strong>${escapeHtml(puzzle.id)}</strong><span>${escapeHtml(puzzle.status.toUpperCase())}</span></div>
          <h3>${escapeHtml(puzzle.title)}</h3>
          <p>${escapeHtml(puzzle.description)}</p>
          <dl>
            <div><dt>${escapeHtml(ui("labels.mode", "Mode"))}</dt><dd>${escapeHtml(puzzle.mode.toUpperCase())}</dd></div>
            <div><dt>${escapeHtml(ui("labels.connectedEvidence", "Connected Evidence"))}</dt><dd>${puzzle.connectedEvidence.map(escapeHtml).join(", ")}</dd></div>
            <div><dt>${escapeHtml(ui("labels.reward", "Reward"))}</dt><dd>${escapeHtml(puzzle.reward)}</dd></div>
          </dl>
          <span class="open-link">${escapeHtml(ui("buttons.openRecovery", "OPEN RECOVERY"))} &gt;</span>
        </a>
      `).join("")}
    </div>
  `;
}

function dashboard() {
  const evidences = seasonItems(data.evidences);
  return `
    ${shell("archive")}
    <main class="layout home-layout">
      ${casePanel()}
      <div class="center-stack">
        ${seasonStrip()}
        <section class="panel">
          <div class="panel-head"><span>${escapeHtml(ui("panels.evidenceArchive", "EVIDENCE ARCHIVE"))}</span><a href="archive.html">${escapeHtml(ui("buttons.viewAll", "VIEW ALL"))} &gt;</a></div>
          <div class="panel-body archive-grid home-archive-grid">${evidences.map((item) => fileCard(item, true)).join("")}</div>
        </section>
        <div class="two-col">
          <section class="panel">
            <div class="panel-head"><span>${escapeHtml(ui("panels.caseSummary", "CASE SUMMARY"))}</span><a href="case.html">${escapeHtml(ui("buttons.openFile", "OPEN FILE"))} &gt;</a></div>
            <div class="panel-body case-summary-grid home-summary-grid">
              <div class="summary-block key-question"><span>${escapeHtml(ui("labels.keyQuestion", "KEY QUESTION"))}</span><strong>${escapeHtml(activeCase.keyQuestion)}</strong></div>
              <div class="summary-block"><span>${escapeHtml(ui("panels.unresolvedItems", "UNRESOLVED"))}</span><ul>${data.unresolvedItems.slice(0, 3).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
            </div>
          </section>
          ${terminalPanel()}
        </div>
        <div class="two-col">
          ${logPanel(4)}
          ${publicAnalysisPanel()}
        </div>
        ${relationPanel()}
      </div>
      <aside class="side-stack">${notesPanel()}${lockedPanel()}</aside>
      ${paperStrip()}
    </main>
  `;
}

function casePage() {
  return `
    ${shell("case")}
    <main class="layout">
      ${casePanel()}
      <div class="center-stack">
        ${seasonStrip()}
        <section class="panel">
          <div class="panel-head">${escapeHtml(ui("panels.caseFileSummary", "CASE FILE SUMMARY"))}</div>
          <div class="panel-body case-summary-grid">
            <div class="summary-block key-question"><span>${escapeHtml(ui("labels.keyQuestion", "KEY QUESTION"))}</span><strong>${escapeHtml(activeCase.keyQuestion)}</strong></div>
            <div class="summary-block"><span>${escapeHtml(ui("labels.currentlyPublicFiles", "CURRENTLY PUBLIC FILES"))}</span><ul>${data.publicFiles.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
            <div class="summary-block"><span>${escapeHtml(ui("panels.unresolvedItems", "UNRESOLVED ITEMS"))}</span><ul>${data.unresolvedItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
            <div class="summary-block"><span>${escapeHtml(ui("labels.fileRelationPreview", "FILE RELATION PREVIEW"))}</span><div class="relation-chain compact">${relationItems().map((item, index) => `<div style="--depth:${index}"><span>${index === 0 ? "" : "└─"}</span>${escapeHtml(item)}</div>`).join("")}</div></div>
          </div>
        </section>
        ${unresolvedPanel()}
        ${publicAnalysisPanel()}
        ${logPanel(5)}
      </div>
      <aside class="side-stack">${notesPanel()}${lockedPanel()}</aside>
      ${paperStrip()}
    </main>
  `;
}

function archivePage() {
  return `
    ${shell("archive")}
    <main class="layout">
      ${casePanel()}
      <div class="center-stack">
        ${seasonStrip()}
        <section class="panel">
          <div class="panel-head"><span>${escapeHtml(ui("panels.evidenceArchive", "EVIDENCE ARCHIVE"))}</span><small>${seasonItems(data.evidences).length} FILES INDEXED</small></div>
          <div class="panel-body archive-grid">${seasonItems(data.evidences).map((item) => fileCard(item)).join("")}</div>
        </section>
        ${relationPanel()}
        ${publicAnalysisPanel()}
      </div>
      <aside class="side-stack">${notesPanel()}${lockedPanel()}</aside>
      ${paperStrip()}
    </main>
  `;
}

function lightbox() {
  return `
    <div class="lightbox" id="lightbox" aria-modal="true" role="dialog" aria-label="이미지 확대 보기">
      <div class="lightbox-bar">
        <div class="lightbox-title" id="lightboxTitle">이미지 확대</div>
        <div class="lightbox-controls">
          <button type="button" data-zoom="out">-</button>
          <button type="button" data-zoom="reset">100%</button>
          <button type="button" data-zoom="in">+</button>
          <button type="button" data-close-lightbox>CLOSE</button>
        </div>
      </div>
      <div class="lightbox-stage" id="lightboxStage"></div>
    </div>
  `;
}

function filePage() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id") || data.evidences[0].id;
  const item = evidenceById(id) || data.evidences[0];
  if (isLocked(item)) {
    return `
      ${shell("archive")}
      <main class="layout">
        ${casePanel()}
        <div class="center-stack">
          <section class="panel">
            <div class="panel-head"><span>${escapeHtml(item.id)} / ${escapeHtml(item.title)}</span><a href="archive.html">${escapeHtml(ui("buttons.returnArchive", "RETURN ARCHIVE"))} &gt;</a></div>
            <div class="panel-body">
              <div class="puzzle-detail-head locked">
                <span>${escapeHtml(badgeLabel(item))}</span>
                <strong>${escapeHtml(ui("terminal.noAccessMessage", "열람 권한이 없습니다."))}</strong>
              </div>
            </div>
          </section>
        </div>
        <aside class="side-stack">${notesPanel()}${lockedPanel()}</aside>
      </main>
    `;
  }
  const puzzle = puzzleById(item.puzzle);
  const related = item.related.map(evidenceById).filter(Boolean);
  return `
    ${shell("archive")}
    <main class="layout">
      ${casePanel()}
      <div class="center-stack">
        <section class="panel">
          <div class="panel-head"><span>${escapeHtml(item.id)} / ${escapeHtml(item.title)}</span><a href="archive.html">${escapeHtml(ui("buttons.returnArchive", "RETURN ARCHIVE"))} &gt;</a></div>
          <div class="panel-body detail-layout">
            <div class="detail-preview">
              <button class="thumb ${escapeHtml(item.visualType)} detail-thumb" type="button" data-lightbox-image="${escapeHtml(item.thumbnail || "")}" data-lightbox-title="${escapeHtml(item.title)}" aria-label="${escapeHtml(item.title)} 확대 보기">${imageThumb(item, "detail")}</button>
            </div>
            <div class="detail-copy">
              ${escapeHtml(ui("labels.evidenceCode", "증거 코드"))}: ${escapeHtml(item.id)}
              ${escapeHtml(ui("labels.fileTitle", "자료명"))}: ${escapeHtml(item.title)}
              ${escapeHtml(ui("labels.date", "날짜"))}: ${escapeHtml(item.date)}
              ${escapeHtml(ui("labels.status", "상태"))}: ${escapeHtml(statusLabel(item.status))}
              ${escapeHtml(ui("labels.recovery", "복구율"))}: ${escapeHtml(item.recovery)}%

              ${escapeHtml(ui("labels.archivistNote", "기록관 메모"))}:
              ${escapeHtml(item.note)}

              ${escapeHtml(ui("labels.connectedPuzzle", "연결 퍼즐"))}:
              ${escapeHtml(puzzle ? `${puzzle.id} / ${puzzle.title}` : "NONE")}

              ${escapeHtml(ui("labels.relatedFiles", "연결 자료"))}:
              ${related.length ? related.map((entry) => `${entry.id} / ${entry.title}`).join("\n") : "NONE"}
            </div>
          </div>
        </section>
      </div>
      <aside class="side-stack">${notesPanel()}${hintsPanel()}</aside>
    </main>
    ${lightbox()}
  `;
}

function puzzleModule(puzzle) {
  const labels = {
    rotate: ["SCAN TARGET", "ROTATE STAMP", "VERIFY DIRECTION"],
    arrange: ["PHOTO 01", "PHOTO 02", "PHOTO 03", "PHOTO 04"],
    timeline: ["DATE CARD", "SOURCE CARD", "CONFLICT CARD"],
    restore: ["FRAGMENT A", "FRAGMENT B", "FOLD LINE"]
  }[puzzle.mode] || ["INPUT", "COMPARE", "VERIFY"];
  return `
    <div class="puzzle-module ${escapeHtml(puzzle.mode)}">
      <div class="module-screen">
        ${labels.map((label, index) => `<div class="module-slot"><span>${escapeHtml(label)}</span><em>${String(index + 1).padStart(2, "0")}</em></div>`).join("")}
      </div>
      <div class="module-copy">
        <strong>${escapeHtml(puzzle.mode.toUpperCase())} MODULE</strong>
        <p>${escapeHtml(ui("moduleNotice", "실제 조작 기능은 이후 자료가 공개될 때 연결됩니다. 현재는 퍼즐 진입 구조와 상태 표시만 활성화되어 있습니다."))}</p>
      </div>
    </div>
  `;
}

function puzzlePage() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id") || data.puzzles[0].id;
  const puzzle = puzzleById(id) || data.puzzles[0];
  return `
    ${shell("terminal")}
    <main class="layout">
      ${casePanel()}
      <div class="center-stack">
        <section class="panel">
          <div class="panel-head"><span>${escapeHtml(puzzle.id)} / ${escapeHtml(puzzle.title)}</span><a href="terminal.html">${escapeHtml(ui("buttons.returnTerminal", "RETURN TERMINAL"))} &gt;</a></div>
          <div class="panel-body puzzle-detail">
            <div class="puzzle-detail-head ${escapeHtml(puzzle.status)}">
              <span>${escapeHtml(puzzle.status.toUpperCase())}</span>
              <strong>${escapeHtml(puzzle.description)}</strong>
            </div>
            ${puzzleModule(puzzle)}
            <div class="case-summary-grid">
              <div class="summary-block"><span>${escapeHtml(ui("labels.connectedEvidence", "CONNECTED EVIDENCE"))}</span><ul>${puzzle.connectedEvidence.map((id) => `<li>${escapeHtml(id)}</li>`).join("")}</ul></div>
              <div class="summary-block"><span>${escapeHtml(ui("labels.reward", "REWARD"))}</span><strong>${escapeHtml(puzzle.reward)}</strong></div>
              <div class="summary-block"><span>${escapeHtml(ui("labels.recoverySteps", "RECOVERY STEPS"))}</span><ul>${puzzle.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ul></div>
            </div>
          </div>
        </section>
      </div>
      <aside class="side-stack">${hintsPanel()}${lockedPanel()}</aside>
    </main>
  `;
}

function terminalPage() {
  return `${shell("terminal")}<main class="layout">${casePanel()}<div class="center-stack">${terminalPanel()}<section class="panel"><div class="panel-head">${escapeHtml(ui("panels.activePuzzles", "ACTIVE PUZZLES"))}</div><div class="panel-body">${puzzleCards()}</div></section></div><aside class="side-stack">${hintsPanel()}${lockedPanel()}</aside></main>`;
}

function logPage() {
  return `${shell("log")}<main class="layout">${casePanel()}<div class="center-stack">${seasonStrip()}${logPanel(99)}</div><aside class="side-stack">${notesPanel()}${lockedPanel()}</aside></main>`;
}

function hintsPage() {
  return `
    ${shell("hints")}
    <main class="layout">
      ${casePanel()}
      <div class="center-stack">
        <section class="panel">
          <div class="panel-head">${escapeHtml(ui("panels.hintDirectory", "HINT DIRECTORY"))}</div>
          <div class="panel-body hint-accordion">
            ${data.hints.map((hint, index) => `
              <details class="hint-card ${hint.status === "locked" ? "locked-hint" : "available-hint"}" id="hint-${index}" ${hint.status === "available" ? "open" : ""}>
                <summary><strong>${escapeHtml(hint.id)}</strong><span>${escapeHtml(hint.status.toUpperCase())}</span></summary>
                <p>${escapeHtml(hint.text)}</p>
                <div>${escapeHtml(hint.body)}</div>
              </details>
            `).join("")}
          </div>
        </section>
      </div>
      <aside class="side-stack">${notesPanel()}${lockedPanel()}</aside>
    </main>
  `;
}

function bindLightbox() {
  const trigger = document.querySelector("[data-lightbox-image]");
  const box = document.getElementById("lightbox");
  if (!trigger || !box) return;
  const stage = document.getElementById("lightboxStage");
  const title = document.getElementById("lightboxTitle");
  let zoom = 1;
  function setZoom(next) {
    zoom = Math.max(0.5, Math.min(4, next));
    box.style.setProperty("--zoom", zoom);
  }
  trigger.addEventListener("click", () => {
    const src = trigger.dataset.lightboxImage;
    title.textContent = trigger.dataset.lightboxTitle || "이미지 확대";
    stage.innerHTML = src ? `<img src="${escapeHtml(src)}" alt="${escapeHtml(title.textContent)}">` : `<div class="detail-copy">${escapeHtml(ui("panels.detailNoPreview", "NO PREVIEW / 고화질 이미지가 아직 등록되지 않았습니다."))}</div>`;
    setZoom(1);
    box.classList.add("open");
  });
  box.addEventListener("click", (event) => {
    if (event.target === box || event.target.hasAttribute("data-close-lightbox")) box.classList.remove("open");
    const action = event.target.dataset.zoom;
    if (action === "in") setZoom(zoom + 0.25);
    if (action === "out") setZoom(zoom - 0.25);
    if (action === "reset") setZoom(1);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") box.classList.remove("open");
  });
}

function bindTerminal() {
  const button = $("#enterCode");
  if (!button) return;
  button.addEventListener("click", () => {
    const value = $("#answer")?.value.trim();
    const result = $("#terminalResult");
    const match = data.puzzles.find((puzzle) => puzzle.answer && puzzle.answer.toUpperCase() === value.toUpperCase());
    if (!result) return;
    if (!value) result.textContent = ui("terminal.emptyMessage", "현재 공개 자료만으로는 확인되지 않습니다.");
    else if (match) {
      result.innerHTML = `${escapeHtml(ui("terminal.successMessage", "자료 상태가 열람 가능으로 전환되었습니다."))} <a href="puzzle.html?id=${encodeURIComponent(match.id)}">OPEN ${escapeHtml(match.id)} &gt;</a>`;
    } else {
      result.textContent = ui("terminal.failMessage", "현재 공개 자료만으로는 확인되지 않습니다.");
    }
  });
}

function bindLockedFiles() {
  document.querySelectorAll("[data-locked-file]").forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();
      alert(ui("terminal.noAccessMessage", "열람 권한이 없습니다."));
    });
  });
}

function render() {
  const map = {
    home: dashboard,
    dashboard,
    case: casePage,
    archive: archivePage,
    file: filePage,
    terminal: terminalPage,
    puzzle: puzzlePage,
    log: logPage,
    hints: hintsPage
  };
  document.querySelector(".app").innerHTML = (map[pageName()] || dashboard)();
  bindLightbox();
  bindTerminal();
  bindLockedFiles();
}

render();
