"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui/states";
import { Container } from "@/components/ui/container";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <Container className="section-shell max-w-3xl"><ErrorState message="Страница не загрузилась. Попробуйте повторить запрос." /><button onClick={reset} className="btn-primary mt-5">Повторить</button></Container>;
}
