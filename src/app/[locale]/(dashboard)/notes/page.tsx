"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { useParams } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import { Button, Card, Empty, Input, Modal } from "antd";
import { TbPlus } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addNote,
  updateNote,
  deleteNote,
  type ClientNote,
} from "@/redux/slices/notesSlice";
import { NoteCard } from "@/components/notes/NoteCard";

const { TextArea } = Input;

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
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold leading-tight text-slate-900">{t.notes.title}</h1>
          <p className="mt-0.5 text-xs text-slate-500">
            {t.notes.titlePlaceholder}
          </p>
        </div>
        <Button
          type="primary"
          icon={<TbPlus />}
          onClick={handleOpenAdd}
          className="shrink-0 text-xs font-semibold"
        >
          {t.notes.addNote}
        </Button>
      </div>

      {notes.length === 0 ? (
        <Card className="border-slate-200" styles={{ body: { padding: 32 } }}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div>
                <p className="text-xs font-semibold text-slate-700">{t.notes.noNotes}</p>
                <p className="mt-1 text-[11px] text-slate-500">
                  {t.notes.notePlaceholder}
                </p>
              </div>
            }
          />
        </Card>
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

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        title={
          <span className="text-sm font-semibold">
            {editingNote ? t.common.edit : t.notes.addNote}
          </span>
        }
        footer={null}
        centered
        width={500}
        destroyOnHidden
      >
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <Field label={t.notes.title}>
            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder={t.notes.titlePlaceholder}
              required
            />
          </Field>
          <Field label={t.locations.title}>
            <Input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder={t.locations.title}
              required
            />
          </Field>
          <Field label={t.notes.notePlaceholder}>
            <TextArea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder={t.notes.notePlaceholder}
              autoSize={{ minRows: 4, maxRows: 7 }}
              required
            />
          </Field>
          <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
            <Button onClick={() => setModalOpen(false)}>{t.common.cancel}</Button>
            <Button type="primary" htmlType="submit" className="text-xs font-semibold">
              {editingNote ? t.common.save : t.notes.createNote}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onOk={handleDeleteConfirm}
        title={<span className="text-sm font-semibold">{t.common.delete}</span>}
        okText={t.common.delete}
        okButtonProps={{ danger: true }}
        cancelText={t.common.cancel}
        centered
        width={420}
        destroyOnHidden
      >
        <p className="py-2 text-xs leading-5 text-slate-500">
          {t.notes.noNotes}
        </p>
      </Modal>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-xs font-semibold text-slate-600">
      <span className="mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}
