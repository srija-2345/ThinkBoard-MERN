import Note from "../models/Note.js";

// GET ALL NOTES
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// GET NOTE BY ID
export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// CREATE NOTE (keeping your name: postAllNotes)
export async function postAllNotes(req, res) {
  try {
    const { title, content } = req.body;

    // ✅ validation added
    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const note = new Note({ title, content });
    const savedNote = await note.save();

    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in postAllNotes controller", error);
    res.status(500).json({ message: "Internal Server Error" }); // fixed typo
  }
}

// UPDATE NOTE (keeping your name: putAllNotes)
export async function putAllNotes(req, res) {
  try {
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// DELETE NOTE (keeping your name: deleteAllNotes)
export async function deleteAllNotes(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}