"use client";
import { useEffect } from "react";

export default function VisitorPing() {
  useEffect(() => {
    // HARUS POST, bukan GET
    fetch("/api/visitors", { method: "POST" }).catch(() => {});
  }, []);
  return null;
}
