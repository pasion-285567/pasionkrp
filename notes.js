// Map the note contents from individual files
const noteContents = {
    'mahalmoakopanginoon': mahalmoakopanginoonContent,
    'mahalkitapanginoon': mahalkitapanginoonContent,
    'symphony': symphonyContent,
    'sofhia': sofhiaContent,
    'panalangin': panalanginContent,
    'parasataong': parasataongContent,
    'hinditayopwede': hinditayopwedeContent,
    'Imalwayshere': imalwayshereContent,
    'sangalan': sangalanContent,
    'illwait': illwaitContent
};

function openPopup(noteId) {
    const content = noteContents[noteId];

    document.getElementById('popup-container').innerHTML = `
        <div class="popup" id="popup">
            <span class="close-btn" onclick="closePopup()">&times;</span>
            ${content}
        </div>
    `;

    document.getElementById('popup').style.display = 'block';
    document.getElementById('popup-overlay').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'none';
}
