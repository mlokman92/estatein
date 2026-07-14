import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "../lib/supabase";
import { fromTable } from "../lib/db";
import { Button, Card, Field, Spinner, TextArea, TextInput } from "../components/ui";

export default function SiteContentEditor() {
  const { key } = useParams();
  const isNew = !key;
  const navigate = useNavigate();

  const [newKey, setNewKey] = useState("");
  const [jsonText, setJsonText] = useState(isNew ? "{\n  \n}" : "");
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNew) return;
    let active = true;
    void (async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("value")
        .eq("key", key)
        .single();
      if (!active) return;
      if (error || !data) {
        setError(error?.message ?? "Key not found");
      } else {
        setJsonText(JSON.stringify(data.value ?? {}, null, 2));
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [isNew, key]);

  async function onSave() {
    setError(null);
    const finalKey = (isNew ? newKey : key)?.trim();
    if (!finalKey) return setError("Key is required.");

    let value: unknown;
    try {
      value = JSON.parse(jsonText || "{}");
    } catch {
      return setError("Value is not valid JSON.");
    }

    setSaving(true);
    const { error } = await fromTable("site_content").upsert(
      { key: finalKey, value, updated_at: new Date().toISOString() },
      { onConflict: "key" },
    );
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate("/content");
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
          onClick={() => navigate("/content")}
          className="grid size-9 place-items-center rounded-lg border border-line-strong text-muted hover:text-fg"
          aria-label="Back"
        >
          <ArrowLeft className="size-4" />
        </button>
        <h1 className="text-2xl font-semibold">
          {isNew ? "New content key" : key}
        </h1>
      </div>

      {error && <Card className="border-red-500/30 text-red-600">{error}</Card>}

      <Card>
        <div className="flex flex-col gap-4">
          {isNew && (
            <Field label="Key" required hint="e.g. home.hero, global.cta">
              <TextInput
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="section.block"
              />
            </Field>
          )}
          <Field label="Value (JSON)" hint="The copy for this block, as a JSON object">
            <TextArea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="min-h-80 font-mono text-xs"
              spellCheck={false}
            />
          </Field>
        </div>
      </Card>

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-3 px-4 py-3">
          <Button variant="ghost" onClick={() => navigate("/content")}>
            Cancel
          </Button>
          <Button onClick={() => void onSave()} disabled={saving}>
            {saving && <Spinner className="size-4" />}
            {isNew ? "Create key" : "Save changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
