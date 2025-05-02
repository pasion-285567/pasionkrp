import { notesData } from './notesData.js';

async function importNoteContent(noteId) {
    try {
        const module = await import(`./Notes/${noteId}.js`);
        return module[`${noteId}Content`];
    } catch (error) {
        console.error(`Error loading note content for ${noteId}:`, error);
        return 'Error loading content';
    }
}

async function loadNotes() {
    try {
        const notesContainer = document.getElementById('notes');
        // Wait for notesData to be populated
        await new Promise(resolve => setTimeout(resolve, 100));
        
        console.log('NotesData:', notesData); // Debug log
        
        if (Object.keys(notesData).length === 0) {
            console.log('No notes data available yet');
            return;
        }

        const notesHTML = Object.entries(notesData)
            .map(([noteId, noteData]) => `
                <div class="blog-placeholder" onclick="openPopup('${noteId}')">
                    <div class="blog-title">${noteData.title}</div>
                    <div class="blog-content">${noteData.preview}</div>
                </div>
            `)
            .join('');
        
        notesContainer.innerHTML = notesHTML;
    } catch (error) {
        console.error('Error loading notes:', error);
    }
}
async function openPopup(noteId) {
    const content = await importNoteContent(noteId);
    
    document.getElementById('popup-container').innerHTML = `
        <div class="popup" id="popup">
            <span class="close-btn" onclick="closePopup()">&times;</span>
            <h2>${content.title}</h2>
            <div class="popup-content">
                ${content.content
                    .split('\n\n')  // Split by double newlines (stanzas)
                    .map(stanza => 
                        stanza.trim() ? 
                            `<div class="stanza">
                                ${stanza.split('\n')
                                    .map(line => line.trim())
                                    .filter(line => line)
                                    .join('<br>')}
                            </div>` 
                        : ''
                    )
                    .join('')}
            </div>
        </div>
    `;

    document.getElementById('popup').style.display = 'block';
    document.getElementById('popup-overlay').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'none';
}

window.openPopup = openPopup;
window.closePopup = closePopup;

document.addEventListener('DOMContentLoaded', loadNotes);