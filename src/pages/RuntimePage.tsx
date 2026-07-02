import { useEffect, useState } from "react";
import { api } from "../api/client";
import { PortfolioRenderer } from "../components/PortfolioRenderer";
import { fallbackDocument } from "../data/fallbackDocument";
import type { PortfolioDocument } from "../types";

type Props = {
  runtimeId: string;
};

export function RuntimePage({ runtimeId }: Props) {
  const [document, setDocument] = useState<PortfolioDocument | null>(null);
  const [status, setStatus] = useState("Loading runtime");

  useEffect(() => {
    if (!runtimeId) {
      setDocument(fallbackDocument);
      setStatus("No runtime UUID in the URL. Showing sample portfolio.");
      return;
    }

    api.runtime(runtimeId)
      .then((runtime) => {
        setDocument(runtime.document);
        setStatus("");
      })
      .catch(() => {
        setDocument(fallbackDocument);
        setStatus("Runtime not found. Showing sample portfolio.");
      });
  }, [runtimeId]);

  useEffect(() => {
    if (document) {
      window.document.title = document.title || "Portfolio";
    }
  }, [document]);

  if (!document) {
    return <div className="loading-state">{status}</div>;
  }

  return (
    <>
      {status && <div className="runtime-banner">{status}</div>}
      <PortfolioRenderer document={document} />
    </>
  );
}
