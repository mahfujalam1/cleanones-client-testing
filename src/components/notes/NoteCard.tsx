import { Button, Card, Tooltip } from "antd";
import { TbFileText, TbPencil, TbTrash } from "react-icons/tb";
import type { ClientNote } from "@/redux/slices/notesSlice";

interface NoteCardProps {
  note: ClientNote;
  onEdit: () => void;
  onDelete: () => void;
  editLabel?: string;
  deleteLabel?: string;
}

export function NoteCard({ note, onEdit, onDelete, editLabel = "Edit note", deleteLabel = "Delete note" }: NoteCardProps) {
  return (
    <Card
      className="border-slate-200 transition-colors hover:border-slate-300"
      styles={{ body: { padding: 14 } }}
    >
      <div className="flex gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-sky-100 bg-sky-50 text-sky-600">
          <TbFileText className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-bold tracking-tight text-slate-800">{note.title}</h3>
              <p className="mt-0.5 truncate text-[11px] font-medium text-slate-500">{note.location}</p>
            </div>
            <div className="flex shrink-0 items-center gap-0.5">
              <Tooltip title={editLabel}>
                <Button
                  type="text"
                  size="small"
                  icon={<TbPencil />}
                  onClick={onEdit}
                  aria-label="Edit note"
                  className="text-slate-500"
                />
              </Tooltip>
              <Tooltip title={deleteLabel}>
                <Button
                  type="text"
                  danger
                  size="small"
                  icon={<TbTrash />}
                  onClick={onDelete}
                  aria-label="Delete note"
                />
              </Tooltip>
            </div>
          </div>
          <p className="mt-2.5 rounded border border-slate-200 bg-slate-50/70 p-2.5 text-xs leading-5 text-slate-600">
            {note.content}
          </p>
          <p className="mt-2 text-right text-[10px] font-medium text-slate-400">{note.createdAt}</p>
        </div>
      </div>
    </Card>
  );
}
