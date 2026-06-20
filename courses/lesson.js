/* ═══════════════════════════════════════
   LUMINA ACADEMY — Lesson Page Logic
   Each lesson page must define window.LESSON_DATA
   before including this script.
   ═══════════════════════════════════════ */

function initLessonPage() {
  const data = window.LESSON_DATA;
  if (!data) return;

  const user = LuminaAuth.currentUser();
  const courseId = data.courseId;
  const lessonId = data.lessonId;
  const lessons = data.lessons; // [{id,title,time,url}]

  // ── Render sidebar ──
  const sidebarList = document.getElementById('lessonSidebarList');
  if (sidebarList) {
    sidebarList.innerHTML = lessons.map(l => {
      const isDone = LuminaAuth.isLoggedIn() && LuminaAuth.isLessonComplete(courseId, l.id);
      const isActive = l.id === lessonId;
      return `
        <a href="${l.url}" class="ls-lesson ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}">
          <span class="ls-check">${isDone ? '✓' : ''}</span>
          <span class="ls-lesson-name">${l.title}</span>
          <span class="ls-lesson-time">${l.time}</span>
        </a>`;
    }).join('');
  }

  // ── Progress bar in sidebar ──
  if (LuminaAuth.isLoggedIn()) {
    const prog = LuminaAuth.getCourseProgress(courseId, lessons.length);
    const fillEl = document.getElementById('lsProgressFill');
    const textEl = document.getElementById('lsProgressText');
    if (fillEl) fillEl.style.width = prog.percent + '%';
    if (textEl) textEl.textContent = `${prog.done} / ${prog.total} done`;
  } else {
    const textEl = document.getElementById('lsProgressText');
    if (textEl) textEl.textContent = `Log in to track`;
  }

  // ── Login banner ──
  const banner = document.getElementById('loginBanner');
  if (banner) {
    banner.style.display = LuminaAuth.isLoggedIn() ? 'none' : 'flex';
  }

  // ── Complete button ──
  const completeBtn = document.getElementById('completeBtn');
  if (completeBtn) {
    updateCompleteButton();
    completeBtn.addEventListener('click', () => {
      if (!LuminaAuth.isLoggedIn()) {
        window.location.href = '../login.html';
        return;
      }
      LuminaAuth.markLessonComplete(courseId, lessonId);
      updateCompleteButton();
      // Refresh sidebar checkmarks + progress bar
      initLessonPage();
    });
  }

  function updateCompleteButton() {
    if (!completeBtn) return;
    const done = LuminaAuth.isLoggedIn() && LuminaAuth.isLessonComplete(courseId, lessonId);
    completeBtn.classList.toggle('completed', done);
    completeBtn.textContent = done ? 'Completed' : 'Mark as Complete';
  }

  // ── Bottom prev/next nav ──
  const idx = lessons.findIndex(l => l.id === lessonId);
  const prevLink = document.getElementById('prevLessonLink');
  const nextLink = document.getElementById('nextLessonLink');
  if (prevLink) {
    if (idx > 0) { prevLink.href = lessons[idx - 1].url; prevLink.classList.remove('disabled'); }
    else { prevLink.classList.add('disabled'); }
  }
  if (nextLink) {
    if (idx < lessons.length - 1) { nextLink.href = lessons[idx + 1].url; nextLink.classList.remove('disabled'); }
    else { nextLink.textContent = '🎉 Finish Course →'; nextLink.href = data.courseUrl; nextLink.classList.remove('disabled'); }
  }
}

document.addEventListener('DOMContentLoaded', initLessonPage);
