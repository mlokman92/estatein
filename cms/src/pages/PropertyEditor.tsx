import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { PricingItem } from "../lib/types";
import { PROPERTY_TYPES } from "../lib/types";
import { slugify, toNumberOrNull } from "../lib/utils";
import {
  Button,
  Card,
  Field,
  Select,
  Spinner,
  TextArea,
  TextInput,
  Toggle,
} from "../components/ui";
import { ImageField } from "../components/ImageField";

type GalleryDraft = { key: string; src: string; alt: string };
type PricingItemDraft = { key: string; label: string; value: string; note: string };
type PricingDraft = {
  key: string;
  title: string;
  learn_more_url: string;
  items: PricingItemDraft[];
};

type Form = {
  title: string;
  slug: string;
  tagline: string;
  property_type: string;
  location: string;
  is_published: boolean;
  sort_order: string;
  price: string;
  currency: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  area_unit: string;
  card_image: string;
  card_description: string;
  full_description: string;
  key_features: string;
  meta_title: string;
  meta_description: string;
};

const EMPTY_FORM: Form = {
  title: "",
  slug: "",
  tagline: "",
  property_type: "",
  location: "",
  is_published: true,
  sort_order: "0",
  price: "",
  currency: "USD",
  bedrooms: "",
  bathrooms: "",
  area: "",
  area_unit: "Square Feet",
  card_image: "",
  card_description: "",
  full_description: "",
  key_features: "",
  meta_title: "",
  meta_description: "",
};

const uid = () => crypto.randomUUID();
const orNull = (s: string) => (s.trim() === "" ? null : s.trim());

export default function PropertyEditor() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();

  const [form, setForm] = useState<Form>(EMPTY_FORM);
  const [gallery, setGallery] = useState<GalleryDraft[]>([]);
  const [pricing, setPricing] = useState<PricingDraft[]>([]);
  const [slugTouched, setSlugTouched] = useState(false);

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = useCallback(
    <K extends keyof Form>(key: K, value: Form[K]) =>
      setForm((prev) => ({ ...prev, [key]: value })),
    [],
  );

  useEffect(() => {
    if (isNew) return;
    let active = true;
    (async () => {
      const [{ data: prop, error: pErr }, { data: gal }, { data: pri }] =
        await Promise.all([
          supabase.from("properties").select("*").eq("id", id).single(),
          supabase
            .from("property_gallery_images")
            .select("*")
            .eq("property_id", id)
            .order("sort_order"),
          supabase
            .from("pricing_categories")
            .select("*")
            .eq("property_id", id)
            .order("sort_order"),
        ]);
      if (!active) return;
      if (pErr || !prop) {
        setError(pErr?.message ?? "Property not found");
        setLoading(false);
        return;
      }
      const features = Array.isArray(prop.key_features)
        ? (prop.key_features as unknown[]).map(String)
        : [];
      setForm({
        title: prop.title,
        slug: prop.slug,
        tagline: prop.tagline ?? "",
        property_type: prop.property_type ?? "",
        location: prop.location ?? "",
        is_published: prop.is_published,
        sort_order: String(prop.sort_order),
        price: prop.price == null ? "" : String(prop.price),
        currency: prop.currency,
        bedrooms: prop.bedrooms == null ? "" : String(prop.bedrooms),
        bathrooms: prop.bathrooms == null ? "" : String(prop.bathrooms),
        area: prop.area == null ? "" : String(prop.area),
        area_unit: prop.area_unit,
        card_image: prop.card_image ?? "",
        card_description: prop.card_description ?? "",
        full_description: prop.full_description ?? "",
        key_features: features.join("\n"),
        meta_title: prop.meta_title ?? "",
        meta_description: prop.meta_description ?? "",
      });
      setSlugTouched(true);
      setGallery(
        (gal ?? []).map((g) => ({ key: uid(), src: g.src, alt: g.alt ?? "" })),
      );
      setPricing(
        (pri ?? []).map((c) => ({
          key: uid(),
          title: c.title,
          learn_more_url: c.learn_more_url ?? "",
          items: (Array.isArray(c.items) ? (c.items as PricingItem[]) : []).map((it) => ({
            key: uid(),
            label: it.label ?? "",
            value: it.value ?? "",
            note: it.note ?? "",
          })),
        })),
      );
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [id, isNew]);

  const effectiveSlug = useMemo(
    () => (slugTouched ? form.slug : slugify(form.title)),
    [slugTouched, form.slug, form.title],
  );

  async function onSave() {
    setError(null);
    if (!form.title.trim()) return setError("Title is required.");
    const slug = (slugTouched ? form.slug : slugify(form.title)).trim();
    if (!slug) return setError("Slug is required.");

    setSaving(true);
    const payload = {
      title: form.title.trim(),
      slug,
      tagline: orNull(form.tagline),
      property_type: orNull(form.property_type),
      location: orNull(form.location),
      is_published: form.is_published,
      sort_order: toNumberOrNull(form.sort_order) ?? 0,
      price: toNumberOrNull(form.price),
      currency: form.currency.trim() || "USD",
      bedrooms: intOrNull(form.bedrooms),
      bathrooms: intOrNull(form.bathrooms),
      area: toNumberOrNull(form.area),
      area_unit: form.area_unit.trim() || "Square Feet",
      card_image: orNull(form.card_image),
      card_description: orNull(form.card_description),
      full_description: orNull(form.full_description),
      key_features: form.key_features
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      meta_title: orNull(form.meta_title),
      meta_description: orNull(form.meta_description),
    };

    let propertyId = id;
    if (isNew) {
      const { data, error } = await supabase
        .from("properties")
        .insert(payload)
        .select("id")
        .single();
      if (error || !data) return finishWithError(error?.message);
      propertyId = data.id;
    } else {
      const { error } = await supabase
        .from("properties")
        .update(payload)
        .eq("id", id);
      if (error) return finishWithError(error.message);
    }

    // Replace child rows wholesale — small counts, keeps the sync simple.
    const galleryRows = gallery
      .filter((g) => g.src.trim())
      .map((g, i) => ({
        property_id: propertyId!,
        src: g.src.trim(),
        alt: orNull(g.alt),
        sort_order: i,
      }));
    const pricingRows = pricing
      .filter((c) => c.title.trim())
      .map((c, i) => ({
        property_id: propertyId!,
        title: c.title.trim(),
        learn_more_url: orNull(c.learn_more_url),
        items: c.items
          .filter((it) => it.label.trim() || it.value.trim())
          .map((it) => ({
            label: it.label.trim(),
            value: it.value.trim(),
            ...(it.note.trim() ? { note: it.note.trim() } : {}),
          })),
        sort_order: i,
      }));

    const { error: gDel } = await supabase
      .from("property_gallery_images")
      .delete()
      .eq("property_id", propertyId!);
    if (gDel) return finishWithError(gDel.message);
    if (galleryRows.length) {
      const { error: gIns } = await supabase
        .from("property_gallery_images")
        .insert(galleryRows);
      if (gIns) return finishWithError(gIns.message);
    }

    const { error: pDel } = await supabase
      .from("pricing_categories")
      .delete()
      .eq("property_id", propertyId!);
    if (pDel) return finishWithError(pDel.message);
    if (pricingRows.length) {
      const { error: pIns } = await supabase
        .from("pricing_categories")
        .insert(pricingRows);
      if (pIns) return finishWithError(pIns.message);
    }

    setSaving(false);
    navigate("/");
  }

  function finishWithError(message?: string) {
    setSaving(false);
    setError(
      message?.includes("duplicate key")
        ? "That slug is already taken — choose a unique slug."
        : (message ?? "Save failed."),
    );
  }

  if (loading) {
    return (
      <div className="grid place-items-center py-16">
        <Spinner className="size-7" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-24">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="grid size-9 place-items-center rounded-lg border border-line-strong text-muted hover:text-fg"
          aria-label="Back to properties"
        >
          <ArrowLeft className="size-4" />
        </button>
        <h1 className="text-2xl font-semibold">
          {isNew ? "New property" : form.title || "Edit property"}
        </h1>
      </div>

      {error && (
        <Card className="border-red-500/30 text-red-600">{error}</Card>
      )}

      {/* Basics */}
      <Card>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
          Basics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title" required>
            <TextInput
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </Field>
          <Field label="Slug" hint="URL identifier — must be unique" required>
            <TextInput
              value={effectiveSlug}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", e.target.value);
              }}
            />
          </Field>
          <Field label="Tagline" hint="Card eyebrow, e.g. “Coastal Escapes — Where Waves Beckon”">
            <TextInput
              value={form.tagline}
              onChange={(e) => set("tagline", e.target.value)}
            />
          </Field>
          <Field label="Location" hint="e.g. Malibu, California">
            <TextInput
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
            />
          </Field>
          <Field label="Property type">
            <Select
              value={form.property_type}
              onChange={(e) => set("property_type", e.target.value)}
            >
              <option value="">— none —</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </Field>
          <div className="flex items-end gap-6">
            <Field label="Sort order" hint="Lower shows first">
              <TextInput
                type="number"
                value={form.sort_order}
                onChange={(e) => set("sort_order", e.target.value)}
                className="w-28"
              />
            </Field>
            <div className="pb-2">
              <Toggle
                checked={form.is_published}
                onChange={(v) => set("is_published", v)}
                label="Published"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Pricing & size */}
      <Card>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
          Price &amp; size
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Price">
            <TextInput
              type="number"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
            />
          </Field>
          <Field label="Currency">
            <TextInput
              value={form.currency}
              onChange={(e) => set("currency", e.target.value)}
            />
          </Field>
          <div />
          <Field label="Bedrooms">
            <TextInput
              type="number"
              value={form.bedrooms}
              onChange={(e) => set("bedrooms", e.target.value)}
            />
          </Field>
          <Field label="Bathrooms">
            <TextInput
              type="number"
              value={form.bathrooms}
              onChange={(e) => set("bathrooms", e.target.value)}
            />
          </Field>
          <div />
          <Field label="Area">
            <TextInput
              type="number"
              value={form.area}
              onChange={(e) => set("area", e.target.value)}
            />
          </Field>
          <Field label="Area unit">
            <TextInput
              value={form.area_unit}
              onChange={(e) => set("area_unit", e.target.value)}
            />
          </Field>
        </div>
      </Card>

      {/* Media */}
      <Card>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
          Card image
        </h2>
        <ImageField
          value={form.card_image}
          onChange={(v) => set("card_image", v)}
        />
      </Card>

      {/* Descriptions */}
      <Card>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
          Descriptions &amp; features
        </h2>
        <div className="flex flex-col gap-4">
          <Field label="Card description" hint="Short teaser shown on grid cards">
            <TextArea
              value={form.card_description}
              onChange={(e) => set("card_description", e.target.value)}
            />
          </Field>
          <Field label="Full description" hint="Long copy on the detail page">
            <TextArea
              value={form.full_description}
              onChange={(e) => set("full_description", e.target.value)}
              className="min-h-32"
            />
          </Field>
          <Field
            label="Key features"
            hint="One feature per line — becomes the amenities list"
          >
            <TextArea
              value={form.key_features}
              onChange={(e) => set("key_features", e.target.value)}
              className="min-h-32"
            />
          </Field>
        </div>
      </Card>

      {/* Gallery */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Gallery images
          </h2>
          <Button
            variant="dark"
            onClick={() =>
              setGallery((g) => [...g, { key: uid(), src: "", alt: "" }])
            }
          >
            <Plus className="size-4" />
            Add image
          </Button>
        </div>
        {gallery.length === 0 ? (
          <p className="text-sm text-muted">No images yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {gallery.map((g, i) => (
              <div
                key={g.key}
                className="flex flex-col gap-3 rounded-[var(--radius-btn)] border border-line p-3 sm:flex-row sm:items-start"
              >
                <div className="flex-1">
                  <ImageField
                    value={g.src}
                    onChange={(v) =>
                      setGallery((prev) =>
                        prev.map((row) =>
                          row.key === g.key ? { ...row, src: v } : row,
                        ),
                      )
                    }
                  />
                  <input
                    value={g.alt}
                    onChange={(e) =>
                      setGallery((prev) =>
                        prev.map((row) =>
                          row.key === g.key ? { ...row, alt: e.target.value } : row,
                        ),
                      )
                    }
                    placeholder="Alt text (accessibility)"
                    className="mt-2 w-full rounded-[var(--radius-btn)] border border-line-strong bg-bg px-3 py-2 text-sm text-fg outline-none placeholder:text-muted/60 focus:border-purple"
                  />
                </div>
                <div className="flex gap-1">
                  <IconBtn
                    label="Move up"
                    disabled={i === 0}
                    onClick={() => setGallery((p) => move(p, i, i - 1))}
                  >
                    <ChevronUp className="size-4" />
                  </IconBtn>
                  <IconBtn
                    label="Move down"
                    disabled={i === gallery.length - 1}
                    onClick={() => setGallery((p) => move(p, i, i + 1))}
                  >
                    <ChevronDown className="size-4" />
                  </IconBtn>
                  <IconBtn
                    label="Remove"
                    danger
                    onClick={() =>
                      setGallery((p) => p.filter((row) => row.key !== g.key))
                    }
                  >
                    <Trash2 className="size-4" />
                  </IconBtn>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Pricing */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Pricing categories
          </h2>
          <Button
            variant="dark"
            onClick={() =>
              setPricing((p) => [
                ...p,
                { key: uid(), title: "", learn_more_url: "", items: [] },
              ])
            }
          >
            <Plus className="size-4" />
            Add category
          </Button>
        </div>
        {pricing.length === 0 ? (
          <p className="text-sm text-muted">No pricing categories yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {pricing.map((c) => (
              <div
                key={c.key}
                className="rounded-[var(--radius-btn)] border border-line p-4"
              >
                <div className="flex flex-wrap items-end gap-3">
                  <div className="min-w-40 flex-1">
                    <Field label="Category title">
                      <TextInput
                        value={c.title}
                        onChange={(e) =>
                          updatePricing(setPricing, c.key, { title: e.target.value })
                        }
                      />
                    </Field>
                  </div>
                  <div className="min-w-40 flex-1">
                    <Field label="Learn more URL">
                      <TextInput
                        value={c.learn_more_url}
                        onChange={(e) =>
                          updatePricing(setPricing, c.key, {
                            learn_more_url: e.target.value,
                          })
                        }
                      />
                    </Field>
                  </div>
                  <IconBtn
                    label="Remove category"
                    danger
                    onClick={() =>
                      setPricing((p) => p.filter((row) => row.key !== c.key))
                    }
                  >
                    <Trash2 className="size-4" />
                  </IconBtn>
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  {c.items.map((it) => (
                    <div key={it.key} className="flex flex-wrap items-center gap-2">
                      <input
                        value={it.label}
                        onChange={(e) =>
                          updateItem(setPricing, c.key, it.key, { label: e.target.value })
                        }
                        placeholder="Label"
                        className="min-w-32 flex-1 rounded-[var(--radius-btn)] border border-line-strong bg-bg px-3 py-2 text-sm text-fg outline-none placeholder:text-muted/60 focus:border-purple"
                      />
                      <input
                        value={it.value}
                        onChange={(e) =>
                          updateItem(setPricing, c.key, it.key, { value: e.target.value })
                        }
                        placeholder="Value"
                        className="min-w-24 flex-1 rounded-[var(--radius-btn)] border border-line-strong bg-bg px-3 py-2 text-sm text-fg outline-none placeholder:text-muted/60 focus:border-purple"
                      />
                      <input
                        value={it.note}
                        onChange={(e) =>
                          updateItem(setPricing, c.key, it.key, { note: e.target.value })
                        }
                        placeholder="Note (optional)"
                        className="min-w-32 flex-1 rounded-[var(--radius-btn)] border border-line-strong bg-bg px-3 py-2 text-sm text-fg outline-none placeholder:text-muted/60 focus:border-purple"
                      />
                      <IconBtn
                        label="Remove item"
                        danger
                        onClick={() =>
                          updatePricing(setPricing, c.key, {
                            items: c.items.filter((row) => row.key !== it.key),
                          })
                        }
                      >
                        <Trash2 className="size-4" />
                      </IconBtn>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      updatePricing(setPricing, c.key, {
                        items: [
                          ...c.items,
                          { key: uid(), label: "", value: "", note: "" },
                        ],
                      })
                    }
                    className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm text-purple-light hover:underline"
                  >
                    <Plus className="size-4" />
                    Add line item
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* SEO */}
      <Card>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
          SEO metadata
        </h2>
        <div className="flex flex-col gap-4">
          <Field label="Meta title">
            <TextInput
              value={form.meta_title}
              onChange={(e) => set("meta_title", e.target.value)}
            />
          </Field>
          <Field label="Meta description">
            <TextArea
              value={form.meta_description}
              onChange={(e) => set("meta_description", e.target.value)}
            />
          </Field>
        </div>
      </Card>

      {/* Sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-3 px-4 py-3">
          <Button variant="ghost" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button onClick={() => void onSave()} disabled={saving}>
            {saving && <Spinner className="size-4" />}
            {isNew ? "Create property" : "Save changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function intOrNull(value: string): number | null {
  const n = toNumberOrNull(value);
  return n == null ? null : Math.round(n);
}

function move<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr;
  const next = arr.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function updatePricing(
  setPricing: React.Dispatch<React.SetStateAction<PricingDraft[]>>,
  key: string,
  patch: Partial<Omit<PricingDraft, "key">>,
) {
  setPricing((prev) =>
    prev.map((c) => (c.key === key ? { ...c, ...patch } : c)),
  );
}

function updateItem(
  setPricing: React.Dispatch<React.SetStateAction<PricingDraft[]>>,
  catKey: string,
  itemKey: string,
  patch: Partial<Omit<PricingItemDraft, "key">>,
) {
  setPricing((prev) =>
    prev.map((c) =>
      c.key === catKey
        ? {
            ...c,
            items: c.items.map((it) =>
              it.key === itemKey ? { ...it, ...patch } : it,
            ),
          }
        : c,
    ),
  );
}

function IconBtn({
  children,
  label,
  onClick,
  disabled,
  danger,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={
        "grid size-9 shrink-0 place-items-center rounded-lg border border-line-strong text-muted transition-colors disabled:opacity-40 " +
        (danger ? "hover:bg-red-500/10 hover:text-red-600" : "hover:bg-elevated hover:text-fg")
      }
    >
      {children}
    </button>
  );
}
