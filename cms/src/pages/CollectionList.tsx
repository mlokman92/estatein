import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { fromTable } from "../lib/db";
import { removeImageByUrl } from "../lib/storage";
import { getCollection } from "../lib/collections";
import { resolveImg } from "../lib/utils";
import { Card, Spinner, buttonClass, cn } from "../components/ui";

type Row = Record<string, unknown> & { id: string };

export default function CollectionList() {
  const { slug } = useParams();
  const cfg = getCollection(slug);

  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!cfg) return;
    setLoading(true);
    setError(null);
    const { data, error } = await fromTable(cfg.table)
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) setError(error.message);
    else setRows((data ?? []) as Row[]);
    setLoading(false);
  }, [cfg]);

  useEffect(() => {
    void load();
  }, [load]);

  if (!cfg) {
    return <Card>Unknown collection.</Card>;
  }

  const imageField = cfg.imageFields?.[0];

  async function onDelete(row: Row) {
    if (!cfg) return;
    const title = String(row[cfg.titleField] ?? "this item");
    if (!confirm(`Delete “${title}”?`)) return;
    setDeletingId(row.id);
    for (const f of cfg.imageFields ?? []) {
      const v = row[f];
      if (typeof v === "string" && v) await removeImageByUrl(v);
    }
    const { error } = await fromTable(cfg.table).delete().eq("id", row.id);
    setDeletingId(null);
    if (error) {
      alert(`Delete failed: ${error.message}`);
      return;
    }
    setRows((prev) => prev.filter((r) => r.id !== row.id));
  }

  function titleOf(row: Row): string {
    const primary = row[cfg!.titleField];
    if (primary != null && String(primary).trim()) return String(primary);
    if (cfg!.subtitleField) {
      const sec = row[cfg!.subtitleField];
      if (sec != null && String(sec).trim()) return String(sec);
    }
    return "(untitled)";
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{cfg.labelPlural}</h1>
          <p className="text-sm text-muted">
            {rows.length} item{rows.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link to={`/c/${cfg.slug}/new`} className={buttonClass()}>
          <Plus className="size-4" />
          New {cfg.label.toLowerCase()}
        </Link>
      </div>

      {loading ? (
        <div className="grid place-items-center py-16">
          <Spinner className="size-7" />
        </div>
      ) : error ? (
        <Card className="border-red-500/30 text-red-600">{error}</Card>
      ) : rows.length === 0 ? (
        <Card className="text-center text-muted">
          No {cfg.labelPlural.toLowerCase()} yet.
        </Card>
      ) : (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">{cfg.label}</th>
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const thumb = imageField
                    ? resolveImg(row[imageField] as string | null)
                    : null;
                  const subtitle =
                    cfg.subtitleField && cfg.subtitleField !== cfg.titleField
                      ? (row[cfg.subtitleField] as string | null)
                      : null;
                  return (
                    <tr key={row.id} className="border-b border-line last:border-0">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {imageField && (
                            <div className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-lg border border-line-strong bg-bg text-[10px] text-muted">
                              {thumb ? (
                                <img src={thumb} alt="" className="size-full object-cover" />
                              ) : (
                                "IMG"
                              )}
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-fg">{titleOf(row)}</div>
                            {subtitle && (
                              <div className="text-xs text-muted">{subtitle}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted">{String(row.sort_order ?? 0)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-1 text-xs",
                            row.is_published
                              ? "bg-purple/15 text-purple-light"
                              : "bg-elevated text-muted",
                          )}
                        >
                          {row.is_published ? "Published" : "Hidden"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/c/${cfg.slug}/${row.id}`}
                            className="grid size-8 place-items-center rounded-lg text-muted hover:bg-elevated hover:text-fg"
                            aria-label="Edit"
                          >
                            <Pencil className="size-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => void onDelete(row)}
                            disabled={deletingId === row.id}
                            className="grid size-8 place-items-center rounded-lg text-muted hover:bg-red-500/10 hover:text-red-600 disabled:opacity-50"
                            aria-label="Delete"
                          >
                            {deletingId === row.id ? (
                              <Spinner className="size-4" />
                            ) : (
                              <Trash2 className="size-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
