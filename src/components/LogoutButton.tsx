"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/oauth/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-gray-800 text-white dark:hover:text-zinc-600 dark:hover:bg-gray-200"
    >
      Sign out
    </button>
  );
}
