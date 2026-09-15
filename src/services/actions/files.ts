import { authenticatedRequest } from "@/services/actions/auth";

export type ConversationUploadResult = {
  images: string[];
  pdfs: string[];
  videos: string[];
};

export async function uploadConversationFiles(formData: FormData): Promise<{
  success: boolean;
  data: ConversationUploadResult;
  error?: unknown;
}> {
  const result = await authenticatedRequest<{
    images?: string[];
    videos?: string[];
    pdfs?: string[];
    data?: { images?: string[]; videos?: string[]; pdfs?: string[] };
  }>("/file/upload-conversation-files", {
    method: "POST",
    body: formData,
  });

  if (!result.success) {
    return {
      success: false,
      data: { images: [], pdfs: [], videos: [] },
      error: result.error,
    };
  }

  const raw = result.data as {
    images?: string[];
    videos?: string[];
    pdfs?: string[];
    data?: { images?: string[]; videos?: string[]; pdfs?: string[] };
  };
  const payload = raw?.data || raw;

  return {
    success: true,
    data: {
      images: payload?.images || [],
      pdfs: payload?.pdfs || [],
      videos: payload?.videos || [],
    },
  };
}

export async function deleteUploadedFiles(urls: string[]): Promise<void> {
  if (!urls.length) return;
  // Best-effort cleanup; ignore failures so soft-delete still succeeds.
  try {
    await authenticatedRequest("/file/delete-conversation-files", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls }),
    });
  } catch {
    // ignore
  }
}

export function apiError(err: unknown): string {
  if (!err) return "Something went wrong.";
  if (typeof err === "string") return err;
  if (typeof err === "object") {
    const e = err as { data?: { message?: string }; message?: string; error?: string };
    return e.data?.message || e.message || e.error || "Something went wrong.";
  }
  return "Something went wrong.";
}
