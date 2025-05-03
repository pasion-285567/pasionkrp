import { notesData } from '.Notes/notesData.js'; // Adjust the path as necessary

async function importNoteContent(noteId) {
    try {
        console.log('Importing note:', noteId); // Debug log
        const module = await import(`./Notes/${noteId}.js`);
        return module[`${noteId}Content`];
    } catch (error) {
        console.error(`Error loading note content for ${noteId}:`, error);
        return null;
    }
}

async function loadNotes() {
    try {
        const notesContainer = document.getElementById('notes');
        console.log('Notes container:', notesContainer); // Debug container

        // Remove setTimeout and check notesData directly
        console.log('Initial notesData:', notesData);
        
        if (Object.keys(notesData).length === 0) {
            console.log('NotesData is empty, waiting for data...');
            // Wait for notesData to be populated from notesData.js
            await new Promise(resolve => {
                const checkData = setInterval(() => {
                    if (Object.keys(notesData).length > 0) {
                        clearInterval(checkData);
                        resolve();
                    }
                }, 100);
            });
            console.log('NotesData loaded:', notesData);
        }

        const notesHTML = Object.entries(notesData)
            .map(([noteId, noteData]) => {
                console.log('Creating note element for:', noteId); // Debug each note
                return `
                    <div class="blog-placeholder" onclick="openPopup('${noteId}')">
                        <div class="blog-title">${noteData.title}</div>
                        <div class="blog-content">${noteData.preview}</div>
                    </div>
                `;
            })
            .join('');
        
        console.log('Final HTML:', notesHTML); // Debug final HTML
        notesContainer.innerHTML = notesHTML;
    } catch (error) {
        console.error('Error loading notes:', error);
    }
}

async function openPopup(noteId) {
    const content = await importNoteContent(noteId);
    if (!content) return;
    
    document.getElementById('popup-container').innerHTML = `
        <div class="popup" id="popup">
            <span class="close-btn" onclick="window.closePopup()">&times;</span>
            <h2>${content.title}</h2>
            <div class="popup-content">
                ${content.content
                    .split('\n\n')
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

// Make functions available globally
window.openPopup = openPopup;
window.closePopup = closePopup;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadNotes);