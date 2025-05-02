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
        console.log('Starting loadNotes function');
        const response = await fetch('http://localhost:3000/notes');
        console.log('Fetch response:', response.status);
        
        const notes = await response.json();
        console.log('Notes data:', notes);
        
        const notesContainer = document.getElementById('notes');
        console.log('Notes container:', notesContainer);
        
        if (!notes || notes.length === 0) {
            console.log('No notes found');
            notesContainer.innerHTML = '<p>No notes available.</p>';
            return;
        }
        
        const notesHTML = notes.map(note => `
            <div class="blog-placeholder" onclick="openPopup('${note._id}')">
                <div class="blog-title">${note.title}</div>
                <div class="blog-content">${note.preview}</div>
            </div>
        `).join('');
        
        console.log('Generated HTML:', notesHTML);
        notesContainer.innerHTML = notesHTML;
    } catch (error) {
        console.error('LoadNotes error:', error);
    }
}

// Call loadNotes when page loads
document.addEventListener('DOMContentLoaded', loadNotes);
loadNotes();

// Make functions available globally
window.openPopup = async function(noteId) {
    try {
        const response = await fetch(`http://localhost:3000/notes/${noteId}`);
        if (!response.ok) throw new Error('Failed to load note');
        
        const note = await response.json();
        
        document.getElementById('popup-container').innerHTML = `
            <div class="popup" id="popup">
                <span class="close-btn" onclick="closePopup()">&times;</span>
                <h2>${note.title}</h2>
                <div class="popup-content">
                    ${note.content
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
    } catch (error) {
        console.error('Error:', error);
    }
};

window.closePopup = function() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('popup-overlay');
    if (popup && overlay) {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }
};