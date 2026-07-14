import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import { removeImageByUrl } from "../lib/storage";
import type { Property } from "../lib/types";
import { formatPrice, resolveImg } from "../lib/utils";
import { Card, Spinner, buttonClass, cn } from "../components/ui";

export default function PropertiesList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) setError(error.message);
    else setProperties(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function onDelete(property: Property) {
    if (!confirm(`Delete "${property.title}"? This removes its gallery and pricing too.`)) {
      return;
    }
    setDeletingId(property.id);

    // Best-effort: remove uploaded gallery images from storage before the row
    // (and its cascade children) disappear.
    const { data: images } = await supabase
      .from("property_gallery_images")
      .select("src")
      .eq("property_id", property.id);
    await Promise.all(
      (images ?? []).map((img) => removeImageByUrl(img.src)),
    );
    if (property.card_image) await removeImageByUrl(property.card_image);

    const { error } = await supabase.from("properties").delete().eq("id", property.id);
    setDeletingId(null);
    if (error) {
      alert(`Delete failed: ${error.message}`);
      return;
    }
    setProperties((prev) => prev.filter((p) => p.id !== property.id));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Properties</h1>
          <p className="text-sm text-muted">
            {properties.length} listing{properties.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link to="/properties/new" className={buttonClass()}>
          <Plus className="size-4" />
          New property
        </Link>
      </div>

      {loading ? (
        <div className="grid place-items-center py-16">
          <Spinner className="size-7" />
        </div>
      ) : error ? (
        <Card className="border-red-500/30 text-red-600">{error}</Card>
      ) : properties.length === 0 ? (
        <Card className="text-center text-muted">
          No properties yet. Create your first listing.
        </Card>
      ) : (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Property</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((p) => {
                  const thumb = resolveImg(p.card_image);
                  return (
                    <tr key={p.id} className="border-b border-line last:border-0">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-lg border border-line-strong bg-bg text-xs text-muted">
                            {thumb ? (
                              <img src={thumb} alt="" className="size-full object-cover" />
                            ) : (
                              "IMG"
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-fg">{p.title}</div>
                            <div className="text-xs text-muted">/{p.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted">{p.property_type ?? "—"}</td>
                      <td className="px-4 py-3 text-fg">
                        {formatPrice(p.price, p.currency)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-1 text-xs",
                            p.is_published
                              ? "bg-purple/15 text-purple-light"
                              : "bg-elevated text-muted",
                          )}
                        >
                          {p.is_published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/properties/${p.id}`}
                            className="grid size-8 place-items-center rounded-lg text-muted hover:bg-elevated hover:text-fg"
                            aria-label={`Edit ${p.title}`}
                          >
                            <Pencil className="size-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => void onDelete(p)}
                            disabled={deletingId === p.id}
                            className="grid size-8 place-items-center rounded-lg text-muted hover:bg-red-500/10 hover:text-red-600 disabled:opacity-50"
                            aria-label={`Delete ${p.title}`}
                          >
                            {deletingId === p.id ? (
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
