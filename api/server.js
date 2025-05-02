const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/notesdb')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server running on http://localhost:3000');
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Note Schema
const noteSchema = new mongoose.Schema({
    title: String,
    preview: String,
    content: String,
    isHidden: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

// Routes
app.post('/notes', async (req, res) => {
    try {
        console.log('Received note data:', req.body);
        const note = new Note(req.body);
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single note by ID
app.get('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update note
app.put('/notes/:id', async (req, res) => {
    try {
        console.log('Update request for note:', req.params.id);
        console.log('Update data:', req.body);
        
        const note = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        
        console.log('Updated note:', note);
        res.json(note);
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Delete note
app.delete('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add these new routes
app.patch('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(
            req.params.id,
            { isHidden: req.body.isHidden },
            { new: true }
        );
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/notes/reorder', async (req, res) => {
    try {
        const { noteId, newOrder } = req.body;
        const notes = await Note.find().sort({ order: 1 });
        
        // Update orders
        for (let i = 0; i < notes.length; i++) {
            await Note.findByIdAndUpdate(notes[i]._id, { order: i });
        }
        
        // Update specific note's order
        const note = await Note.findByIdAndUpdate(
            noteId,
            { order: newOrder },
            { new: true }
        );
        
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});