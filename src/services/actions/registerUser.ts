import { targetApi } from "@/utils/baseUrl";

export const registerUser = async (values: Record<string, unknown>) => {
  const res = await fetch(
    `${targetApi}/api/v1/user/create-user`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      cache: "no-cache",
    }
  );

  const userInfo = await res.json();
  return userInfo;
};
