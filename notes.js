import { notesData } from './notesData.js';

const EXCERPT_LENGTH = 110;

function renderNotes() {
    const notesContainer = document.querySelector('.notes-container');
    if (!notesContainer) return;
    notesContainer.innerHTML = '';

    Object.entries(notesData).forEach(([noteId, note]) => {
        let excerpt = (note.content || '').replace(/\n/g, ' ').trim();
        if (excerpt.length > EXCERPT_LENGTH) {
            excerpt = excerpt.slice(0, EXCERPT_LENGTH).trim() + '...';
        }
        const card = document.createElement('div');
        card.className = 'note-card';
        card.innerHTML = `
            <div class="note-date">${note.date || ''}</div>
            <div class="note-title">${note.title || ''}</div>
            <div class="note-excerpt">${excerpt}</div>
        `;
        card.addEventListener('click', () => openNote(noteId));
        notesContainer.appendChild(card);
    });
}

function openNote(noteId) {
    const note = notesData[noteId];
    if (note) {
        document.getElementById('noteTitle').textContent = note.title || '';
        document.getElementById('noteDate').textContent = note.date || '';
        document.getElementById('noteContent').innerHTML = (note.content || '').replace(/\n/g, '<br>');
        document.getElementById('noteModal').classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeNoteModal() {
    document.getElementById('noteModal').classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Attach close event and render notes on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderNotes();
    document.querySelector('#noteModal .modal-close').onclick = closeNoteModal;
    document.getElementById('noteModal').onclick = function (e) {
        if (e.target === this) closeNoteModal();
    };
});

// Optional: expose openNote if you want to call it globally
window.openNote = openNote;