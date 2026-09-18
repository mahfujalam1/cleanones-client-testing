"use client";

import { useState, type FormEvent } from "react";
import { useParams } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addNote,
  updateNote,
  deleteNote,
  type ClientNote,
} from "@/redux/slices/notesSlice";
import { NoteCard } from "@/components/notes/NoteCard";
import { NotesHeader } from "@/components/notes/NotesHeader";
import { NotesEmptyState } from "@/components/notes/NotesEmptyState";
import { NoteFormModal } from "@/components/notes/NoteFormModal";
import { DeleteNoteModal } from "@/components/notes/DeleteNoteModal";

export default function NotesPage() {
  const params = useParams<{ locale: string }>();
  const t = getTranslation(params?.locale);

  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes.notes);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<ClientNote | null>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteToDeleteId, setNoteToDeleteId] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingNote(null);
    setTitle("");
    setLocation("");
    setContent("");
    setModalOpen(true);
  };

  const handleOpenEdit = (note: ClientNote) => {
    setEditingNote(note);
    setTitle(note.title);
    setLocation(note.location);
    setContent(note.content);
    setModalOpen(true);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !location.trim() || !content.trim()) return;

    if (editingNote) {
      dispatch(updateNote({ ...editingNote, title, location, content }));
    } else {
      dispatch(addNote({ title, location, content }));
    }
    setModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (noteToDeleteId) {
      dispatch(deleteNote(noteToDeleteId));
    }
    setNoteToDeleteId(null);
    setDeleteModalOpen(false);
  };

  return (
    <div className="space-y-4 text-sm">
      <NotesHeader title={t.notes.title} subtitle={t.notes.titlePlaceholder} addLabel={t.notes.addNote} onAdd={handleOpenAdd} />

      {notes.length === 0 ? (
        <NotesEmptyState title={t.notes.noNotes} description={t.notes.notePlaceholder} />
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              editLabel={t.common.edit}
              deleteLabel={t.common.delete}
              onEdit={() => handleOpenEdit(note)}
              onDelete={() => {
                setNoteToDeleteId(note.id);
                setDeleteModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <NoteFormModal
        t={t}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        editingNote={editingNote}
        title={title}
        setTitle={setTitle}
        location={location}
        setLocation={setLocation}
        content={content}
        setContent={setContent}
        onSubmit={handleSubmit}
      />

      <DeleteNoteModal
        t={t}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
