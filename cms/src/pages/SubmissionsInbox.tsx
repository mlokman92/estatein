import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { fromTable } from "../lib/db";
import { getSubmission, SUBMISSION_STATUSES } from "../lib/forms";
import { Card, Select, Spinner, cn } from "../components/ui";

type Row = Record<string, unknown> & { id: string; created_at: string };

const statusStyle: Record<string, string> = {
  new: "bg-purple/15 text-purple-light",
  in_progress: "bg-amber-500/15 text-amber-600",
  closed: "bg-elevated text-muted",
};

export default function SubmissionsInbox() {
  const { slug } = useParams();
  const cfg = getSubmission(slug);

  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!cfg) return;
    setLoading(true);
    setError(null);
    const { data, error } = await fromTable(cfg.table)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setRows((data ?? []) as Row[]);
    setLoading(false);
  }, [cfg]);

  useEffect(() => {
    void load();
  }, [load]);

  if (!cfg) return <Card>Unknown inbox.</Card>;

  async function setStatus(row: Row, status: string) {
    if (!cfg) return;
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status } : r)));
    const { error } = await fromTable(cfg.table).update({ status }).eq("id", row.id);
    if (error) {
      alert(`Update failed: ${error.message}`);
      void load();
    }
  }

  async function onDelete(row: Row) {
    if (!cfg) return;
    if (!confirm("Delete this submission permanently?")) return;
    const { error } = await fromTable(cfg.table).delete().eq("id", row.id);
    if (error) {
      alert(`Delete failed: ${error.message}`);
      return;
    }
    setRows((prev) => prev.filter((r) => r.id !== row.id));
  }

  function primary(row: Row): string {
    const parts = cfg!.primaryFields
      .map((f) => row[f])
      .filter((v) => v != null && String(v).trim())
      .map(String);
    return parts.length ? parts.join(" ") : "(no name)";
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">{cfg.labelPlural}</h1>
        <p className="text-sm text-muted">
          {rows.length} submission{rows.length === 1 ? "" : "s"} · read-only, from
          the public site
        </p>
      </div>

      {loading ? (
        <div className="grid place-items-center py-16">
          <Spinner className="size-7" />
        </div>
      ) : error ? (
        <Card className="border-red-500/30 text-red-600">{error}</Card>
      ) : rows.length === 0 ? (
        <Card className="text-center text-muted">No submissions yet.</Card>
      ) : (
        <div className="flex flex-col gap-4">
          {rows.map((row) => (
            <Card key={row.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-medium text-fg">{primary(row)}</div>
                  <div className="text-xs text-muted">
                    {formatDate(row.created_at)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {cfg.hasStatus && (
                    <>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-1 text-xs capitalize",
                          statusStyle[String(row.status)] ?? "bg-elevated text-muted",
                        )}
                      >
                        {String(row.status ?? "new").replace("_", " ")}
                      </span>
                      <Select
                        value={String(row.status ?? "new")}
                        onChange={(e) => void setStatus(row, e.target.value)}
                        className="w-36"
                      >
                        {SUBMISSION_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s.replace("_", " ")}
                          </option>
                        ))}
                      </Select>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => void onDelete(row)}
                    className="grid size-9 place-items-center rounded-lg border border-line-strong text-muted hover:bg-red-500/10 hover:text-red-600"
                    aria-label="Delete submission"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              <dl className="mt-4 grid gap-x-8 gap-y-3 border-t border-line pt-4 sm:grid-cols-2">
                {cfg.fields.map((f) => {
                  const v = row[f.name];
                  if (v == null || String(v) === "") return null;
                  return (
                    <div key={f.name}>
                      <dt className="text-xs uppercase tracking-wide text-muted">
                        {f.label}
                      </dt>
                      <dd className="mt-0.5 whitespace-pre-wrap break-words text-sm text-fg">
                        {typeof v === "boolean" ? (v ? "Yes" : "No") : String(v)}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      });
}
