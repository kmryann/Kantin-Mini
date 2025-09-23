"use client";

import { useEffect, useState } from "react";

type Resp = { value?: number };

export default function VisitorAdminPage() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function fetchCount() {
    setLoading(true);
    setErr(null);
    try {
      const r = await fetch("/api/visitors", { method: "GET", cache: "no-store" });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const d: Resp = await r.json();
      setCount(typeof d.value === "number" ? d.value : 0);
    } catch (e: any) {
      setErr(e?.message ?? "Gagal memuat");
      setCount(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold">Visitor Dashboard</h1>
      <p className="text-sm text-gray-600 mt-1">Halaman ini dilindungi Basic Auth.</p>

      <div className="mt-6 rounded-2xl border p-5">
        <div className="text-sm text-gray-500">Total Pengunjung</div>
        <div className="text-4xl font-bold mt-2">
          {count === null ? (loading ? "…" : "—") : count}
        </div>

        {err && <p className="mt-3 text-sm text-red-600">Error: {err}</p>}

        {/* Tombol Refresh */}
        <button
          onClick={fetchCount}
          disabled={loading}
          className="mt-4 rounded-xl border px-3 py-2 text-sm"
        >
          {loading ? "Menyegarkan…" : "Refresh"}
        </button>

        {/* Tombol Paksa Hit */}
        <button
          onClick={async () => {
            await fetch("/api/visitors?force=1", { method: "POST", cache: "no-store" });
            await fetchCount();
          }}
          className="mt-2 rounded-xl border px-3 py-2 text-sm"
        >
          Paksa Hit
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-6">
        *Hit dihitung maksimal 1× per 24 jam per browser (cookie).
      </p>
    </main>
  );
}
