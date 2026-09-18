"use client";

import { useState, type FormEvent } from "react";
import { useParams } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import { type FeedbackRecord } from "@/components/feedback/FeedbackHistoryItem";
import { FeedbackStatsRow } from "@/components/feedback/FeedbackStatsRow";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import { FeedbackHistoryList } from "@/components/feedback/FeedbackHistoryList";

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

      <FeedbackStatsRow stats={ratingStats} />

      <FeedbackForm t={t} rating={rating} setRating={setRating} comment={comment} setComment={setComment} onSubmit={handleSubmit} />

      <FeedbackHistoryList title={t.feedback.recentFeedback} records={history} />
    </div>
  );
}
