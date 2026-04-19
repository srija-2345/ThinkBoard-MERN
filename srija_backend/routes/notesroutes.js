import express from "express";
import { getAllNotes,getNoteById,postAllNotes,putAllNotes,deleteAllNotes }from '../controllers/notescontroller.js';
const router=express.Router();

router.get("/" ,getAllNotes);     
router.get("/:id", getNoteById);     
router.post("/" ,postAllNotes);
router.put("/:id" ,putAllNotes);
router.delete("/:id" ,deleteAllNotes);


export default router;