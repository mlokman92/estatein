import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import { Card, Spinner, buttonClass } from "../components/ui";

type Row = { key: string; updated_at: string };

export default function SiteContentList() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("site_content")
      .select("key, updated_at")
      .order("key", { ascending: true });
    if (error) setError(error.message);
    else setRows((data ?? []) as Row[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function onDelete(key: string) {
    if (!confirm(`Delete content key “${key}”?`)) return;
    const { error } = await supabase.from("site_content").delete().eq("key", key);
    if (error) {
      alert(`Delete failed: ${error.message}`);
      return;
    }
    setRows((prev) => prev.filter((r) => r.key !== key));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Page copy</h1>
          <p className="text-sm text-muted">
            Editable text blocks (heroes, headings, CTA, banner) as JSON key/value
          </p>
        </div>
        <Link to="/content/new" className={buttonClass()}>
          <Plus className="size-4" />
          New key
        </Link>
      </div>

      {loading ? (
        <div className="grid place-items-center py-16">
          <Spinner className="size-7" />
        </div>
      ) : error ? (
        <Card className="border-red-500/30 text-red-600">{error}</Card>
      ) : rows.length === 0 ? (
        <Card className="text-center text-muted">No content keys yet.</Card>
      ) : (
        <Card className="overflow-hidden p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Key</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-mono text-purple-light">{row.key}</td>
                  <td className="px-4 py-3 text-muted">{formatDate(row.updated_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/content/${row.key}`}
                        className="grid size-8 place-items-center rounded-lg text-muted hover:bg-elevated hover:text-fg"
                        aria-label="Edit"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => void onDelete(row.key)}
                        className="grid size-8 place-items-center rounded-lg text-muted hover:bg-red-500/10 hover:text-red-600"
                        aria-label="Delete"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}
