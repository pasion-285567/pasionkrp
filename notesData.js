// Function to get list of note files from directory
async function getNotesList() {
    try {
        const response = await fetch('Notes/');
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const files = Array.from(doc.querySelectorAll('a'))
            .map(a => a.href)
            .filter(href => href.endsWith('.js'))
            .map(href => href.split('/').pop().replace('.js', ''));
        return files;
    } catch (error) {
        console.error('Error getting notes list:', error);
        return [];
    }
}

export const notesData = {};

// Initialize notesData
(async () => {
    const noteFiles = await getNotesList();
    for (const noteId of noteFiles) {
        try {
            const module = await import(`./Notes/${noteId}.js`);
            const content = module[`${noteId}Content`];
            notesData[noteId] = {
                title: content.title,
                preview: content.preview
            };
        } catch (error) {
            console.error(`Error loading note ${noteId}:`, error);
        }
    }
})();