"use client";

import { useState, type FormEvent } from "react";
import { useParams } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import { Button, Card, Input, Rate } from "antd";
import {
  type FeedbackRecord,
  FeedbackHistoryItem,
} from "@/components/feedback/FeedbackHistoryItem";

const { TextArea } = Input;

export default function FeedbackPage() {
  const params = useParams<{ locale: string }>();
  const t = getTranslation(params?.locale);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [history, setHistory] = useState<FeedbackRecord[]>([]);

  const ratingStats = [
    { label: t.feedback.rating, value: "4.7 / 5", sub: t.feedback.ratingPrompt },
    { label: t.feedback.recentFeedback, value: String(history.length), sub: t.feedback.recentFeedback },
    {
      label: t.feedback.fiveStarReviews,
      value: String(history.filter((item) => item.rating === 5).length),
      sub: t.feedback.general,
    },
  ];

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (rating === 0) return;

    const ratingLabels = t.feedback.ratingLabels;
    const newRecord: FeedbackRecord = {
      id: String(Date.now()),
      date: "Jun 28, 2026",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      location: "Floor 3 - Main Office",
      rating,
      label: ratingLabels[rating - 1],
      comment: comment || "Good job!",
    };

    setHistory((current) => [newRecord, ...current]);
    setRating(0);
    setComment("");
  };

  return (
    <div className="space-y-4 text-sm">
      <div>
        <h1 className="text-lg font-bold leading-tight text-slate-900">{t.feedback.title}</h1>
        <p className="mt-0.5 text-xs text-slate-500">
          {t.feedback.ratingPrompt}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {ratingStats.map((stat, index) => (
          <Card
            key={stat.label}
            className="border-slate-200 text-center"
            styles={{ body: { padding: 16 } }}
          >
            <p className="text-lg font-extrabold leading-tight text-slate-800">{stat.value}</p>
            {index === 0 && <Rate disabled value={5} className="mt-1 text-sm" />}
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
              {stat.label}
            </p>
            <p className="mt-0.5 text-[10px] text-slate-400">{stat.sub}</p>
          </Card>
        ))}
      </div>

      <Card className="border-slate-200" styles={{ body: { padding: 18 } }}>
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xs font-bold uppercase tracking-wide text-slate-800">
            {t.feedback.submitFeedback}
          </h2>
          <p className="mt-0.5 text-[11px] text-slate-500">
            {t.feedback.ratingPrompt}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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

      <Card className="border-slate-200" styles={{ body: { padding: 0 } }}>
        <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-3">
          <h2 className="text-xs font-bold uppercase tracking-wide text-slate-800">
            {t.feedback.recentFeedback}
          </h2>
        </div>
        <div className="divide-y divide-slate-200">
          {history.map((record) => (
            <FeedbackHistoryItem key={record.id} record={record} />
          ))}
        </div>
      </Card>
    </div>
  );
}
