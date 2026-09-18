import type { FormEvent, ReactNode } from "react";
import { Button, Input, Modal } from "antd";
import type { ClientNote } from "@/redux/slices/notesSlice";

const { TextArea } = Input;

export function NoteFormModal({
  t,
  open,
  onClose,
  editingNote,
  title,
  setTitle,
  location,
  setLocation,
  content,
  setContent,
  onSubmit,
}: {
  t: any;
  open: boolean;
  onClose: () => void;
  editingNote: ClientNote | null;
  title: string;
  setTitle: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
}) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
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
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
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
          <Button onClick={onClose}>{t.common.cancel}</Button>
          <Button type="primary" htmlType="submit" className="text-xs font-semibold">
            {editingNote ? t.common.save : t.notes.createNote}
          </Button>
        </div>
      </form>
    </Modal>
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
