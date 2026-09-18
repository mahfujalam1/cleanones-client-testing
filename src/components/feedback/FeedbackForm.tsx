import type { FormEvent } from "react";
import { Button, Card, Input, Rate } from "antd";

const { TextArea } = Input;

export function FeedbackForm({
  t,
  rating,
  setRating,
  comment,
  setComment,
  onSubmit,
}: {
  t: any;
  rating: number;
  setRating: (value: number) => void;
  comment: string;
  setComment: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
}) {
  return (
    <Card className="border-slate-200" styles={{ body: { padding: 18 } }}>
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-xs font-bold uppercase tracking-wide text-slate-800">
          {t.feedback.submitFeedback}
        </h2>
        <p className="mt-0.5 text-[11px] text-slate-500">
          {t.feedback.ratingPrompt}
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        <Rate value={rating} onChange={setRating} className="text-xl" aria-label="Service rating" />

        <label className="block text-xs font-semibold text-slate-600">
          <span className="mb-1.5 block">{t.feedback.commentsPlaceholder}</span>
          <TextArea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder={t.feedback.commentsPlaceholder}
            autoSize={{ minRows: 4, maxRows: 7 }}
            maxLength={1000}
            showCount
          />
        </label>

        <Button
          type="primary"
          htmlType="submit"
          disabled={rating === 0}
          className="text-xs font-semibold"
        >
          {t.feedback.submitBtn}
        </Button>
      </form>
    </Card>
  );
}
