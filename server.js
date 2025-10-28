const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto'); // For generating user IDs

const app = express();
const PORT = process.env.PORT || 3000;
const notesFilePath = path.join(__dirname, 'notes.json');

// A simple in-memory "database" for users.
// In a real app, this would be a secure database.
const users = {};

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// User authentication endpoints
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.status(409).json({ message: 'User already exists' });
    }
    const userId = crypto.randomUUID();
    users[username] = { id: userId, password };
    console.log(`Registered new user: ${username} with ID: ${userId}`);
    res.status(201).json({ message: 'User registered successfully!' });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users[username];
    if (user && user.password === password) {
        // In a real app, you would generate and send a JWT token here.
        res.status(200).json({ message: 'Login successful!', userId: user.id });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

// API endpoint to get all notes
app.get('/api/notes', async (req, res) => {
    const userId = req.headers['x-user-id'];
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const data = await fs.readFile(notesFilePath, 'utf8');
        const notes = JSON.parse(data);
        const userNotes = notes.filter(note => note.userId === userId);
        res.json(userNotes);
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.json([]);
        } else {
            console.error('Error reading notes file:', error);
            res.status(500).json({ error: 'Failed to read notes' });
        }
    }
});

// API endpoint to save a new note
app.post('/api/notes', async (req, res) => {
    const userId = req.headers['x-user-id'];
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const newNote = {
            id: Date.now().toString(),
            content: req.body.content,
            userId: userId // Associate note with the user
        };
        let notes = [];
        try {
            const data = await fs.readFile(notesFilePath, 'utf8');
            notes = JSON.parse(data);
        } catch (error) {
            if (error.code !== 'ENOENT') throw error;
        }

        notes.push(newNote);
        await fs.writeFile(notesFilePath, JSON.stringify(notes, null, 2), 'utf8');
        res.status(201).json({ message: 'Note saved successfully!' });
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).json({ error: 'Failed to save note' });
    }
});

// API endpoint to update a note
app.put('/api/notes/:id', async (req, res) => {
    const userId = req.headers['x-user-id'];
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const noteIdToUpdate = req.params.id;
        const updatedContent = req.body.content;
        const data = await fs.readFile(notesFilePath, 'utf8');
        const notes = JSON.parse(data);

        const noteIndex = notes.findIndex(note => note.id === noteIdToUpdate && note.userId === userId);
        if (noteIndex === -1) {
            return res.status(404).json({ error: 'Note not found or you are not the owner' });
        }
        
        notes[noteIndex].content = updatedContent;
        await fs.writeFile(notesFilePath, JSON.stringify(notes, null, 2), 'utf8');
        res.status(200).json({ message: 'Note updated successfully!' });
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ error: 'Failed to update note' });
    }
});

// API endpoint to delete a note by its ID
app.delete('/api/notes/:id', async (req, res) => {
    const userId = req.headers['x-user-id'];
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const noteIdToDelete = req.params.id;
        let notes = [];
        
        try {
            const data = await fs.readFile(notesFilePath, 'utf8');
            notes = JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return res.status(404).json({ error: 'Notes file not found' });
            }
            throw error;
        }

        const initialNoteCount = notes.length;
        const updatedNotes = notes.filter(note => note.id !== noteIdToDelete || note.userId !== userId);

        if (updatedNotes.length === initialNoteCount) {
            return res.status(404).json({ error: 'Note not found or you are not the owner' });
        }

        await fs.writeFile(notesFilePath, JSON.stringify(updatedNotes, null, 2), 'utf8');
        res.status(200).json({ message: 'Note deleted successfully!' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ error: 'Failed to delete note' });
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
