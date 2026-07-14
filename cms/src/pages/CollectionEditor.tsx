import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { fromTable } from "../lib/db";
import { getCollection } from "../lib/collections";
import type { FieldConfig } from "../lib/collections";
import { toNumberOrNull } from "../lib/utils";
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

type RefOption = { id: string; label: string };

export default function CollectionEditor() {
  const { slug, id } = useParams();
  const cfg = getCollection(slug);
  const isNew = !id;
  const navigate = useNavigate();

  const [form, setForm] = useState<Record<string, string>>({});
  const [published, setPublished] = useState(true);
  const [sortOrder, setSortOrder] = useState("0");
  const [refOptions, setRefOptions] = useState<Record<string, RefOption[]>>({});

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Seed a blank form for new records.
  useEffect(() => {
    if (!cfg || !isNew) return;
    const initial: Record<string, string> = {};
    for (const f of cfg.fields) {
      initial[f.name] =
        f.defaultValue ?? (f.type === "select" ? (f.options?.[0] ?? "") : "");
    }
    setForm(initial);
  }, [cfg, isNew]);

  // Load reference-field option lists.
  useEffect(() => {
    if (!cfg) return;
    for (const f of cfg.fields) {
      if (f.type !== "reference" || !f.reference) continue;
      const ref = f.reference;
      void (async () => {
        const { data } = await fromTable(ref.table)
          .select(`id, ${ref.labelColumn}`)
          .order(ref.labelColumn, { ascending: true });
        const opts: RefOption[] = (data ?? []).map(
          (r: Record<string, unknown>) => ({
            id: String(r.id),
            label: String(r[ref.labelColumn] ?? r.id),
          }),
        );
        setRefOptions((prev) => ({ ...prev, [f.name]: opts }));
      })();
    }
  }, [cfg]);

  // Load an existing record.
  useEffect(() => {
    if (!cfg || isNew) return;
    let active = true;
    void (async () => {
      const { data, error } = await fromTable(cfg.table)
        .select("*")
        .eq("id", id)
        .single();
      if (!active) return;
      if (error || !data) {
        setError(error?.message ?? "Record not found");
        setLoading(false);
        return;
      }
      const next: Record<string, string> = {};
      for (const f of cfg.fields) {
        const v = (data as Record<string, unknown>)[f.name];
        if (f.type === "json") {
          next[f.name] = v == null ? "" : JSON.stringify(v, null, 2);
        } else {
          next[f.name] = v == null ? "" : String(v);
        }
      }
      setForm(next);
      setPublished(Boolean((data as Record<string, unknown>).is_published));
      setSortOrder(String((data as Record<string, unknown>).sort_order ?? 0));
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [cfg, id, isNew]);

  const setValue = useCallback(
    (name: string, value: string) =>
      setForm((prev) => ({ ...prev, [name]: value })),
    [],
  );

  if (!cfg) return <Card>Unknown collection.</Card>;

  async function onSave() {
    if (!cfg) return;
    setError(null);

    const payload: Record<string, unknown> = {
      is_published: published,
      sort_order: toNumberOrNull(sortOrder) ?? 0,
    };

    for (const f of cfg.fields) {
      const raw = form[f.name] ?? "";
      if (f.type === "number") {
        const n = toNumberOrNull(raw);
        if (f.required && n == null) return fail(`${f.label} is required.`);
        payload[f.name] = n;
      } else if (f.type === "json") {
        const t = raw.trim();
        if (t === "") {
          payload[f.name] = f.name === "links" ? [] : null;
        } else {
          try {
            payload[f.name] = JSON.parse(t);
          } catch {
            return fail(`${f.label} is not valid JSON.`);
          }
        }
      } else if (f.type === "reference") {
        payload[f.name] = raw.trim() === "" ? null : raw;
      } else {
        const t = raw.trim();
        if (f.required && t === "") return fail(`${f.label} is required.`);
        payload[f.name] = t === "" ? null : t;
      }
    }

    setSaving(true);
    if (isNew) {
      const { error } = await fromTable(cfg.table).insert(payload);
      if (error) return fail(error.message);
    } else {
      const { error } = await fromTable(cfg.table).update(payload).eq("id", id);
      if (error) return fail(error.message);
    }
    setSaving(false);
    navigate(`/c/${cfg.slug}`);
  }

  function fail(message: string) {
    setSaving(false);
    setError(message);
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
          onClick={() => navigate(`/c/${cfg.slug}`)}
          className="grid size-9 place-items-center rounded-lg border border-line-strong text-muted hover:text-fg"
          aria-label="Back"
        >
          <ArrowLeft className="size-4" />
        </button>
        <h1 className="text-2xl font-semibold">
          {isNew ? `New ${cfg.label.toLowerCase()}` : `Edit ${cfg.label.toLowerCase()}`}
        </h1>
      </div>

      {error && <Card className="border-red-500/30 text-red-600">{error}</Card>}

      <Card>
        <div className="flex flex-col gap-4">
          {cfg.fields.map((f) => (
            <FieldInput
              key={f.name}
              field={f}
              value={form[f.name] ?? ""}
              onChange={(v) => setValue(f.name, v)}
              refOptions={refOptions[f.name]}
            />
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex flex-wrap items-end gap-8">
          <Field label="Sort order" hint="Lower shows first">
            <TextInput
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-28"
            />
          </Field>
          <div className="pb-2">
            <Toggle checked={published} onChange={setPublished} label="Published" />
          </div>
        </div>
      </Card>

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-3 px-4 py-3">
          <Button variant="ghost" onClick={() => navigate(`/c/${cfg.slug}`)}>
            Cancel
          </Button>
          <Button onClick={() => void onSave()} disabled={saving}>
            {saving && <Spinner className="size-4" />}
            {isNew ? `Create ${cfg.label.toLowerCase()}` : "Save changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
  refOptions,
}: {
  field: FieldConfig;
  value: string;
  onChange: (value: string) => void;
  refOptions?: RefOption[];
}) {
  const common = { label: field.label, hint: field.hint, required: field.required };

  switch (field.type) {
    case "textarea":
      return (
        <Field {...common}>
          <TextArea value={value} onChange={(e) => onChange(e.target.value)} />
        </Field>
      );
    case "json":
      return (
        <Field {...common}>
          <TextArea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-28 font-mono text-xs"
            spellCheck={false}
          />
        </Field>
      );
    case "number":
      return (
        <Field {...common}>
          <TextInput
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-40"
          />
        </Field>
      );
    case "image":
      return (
        <Field {...common}>
          <ImageField value={value} onChange={onChange} />
        </Field>
      );
    case "select":
      return (
        <Field {...common}>
          <Select value={value} onChange={(e) => onChange(e.target.value)}>
            {field.options?.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </Select>
        </Field>
      );
    case "reference":
      return (
        <Field {...common}>
          <Select value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="">— none —</option>
            {(refOptions ?? []).map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
      );
    default:
      return (
        <Field {...common}>
          <TextInput value={value} onChange={(e) => onChange(e.target.value)} />
        </Field>
      );
  }
}
