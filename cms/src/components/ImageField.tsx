import { useRef, useState } from "react";
import { ImageOff, Upload } from "lucide-react";
import { uploadImage, errorMessage } from "../lib/storage";
import { resolveImg } from "../lib/utils";
import { Spinner, TextInput, cn } from "./ui";

export function ImageField({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const preview = resolveImg(value);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={cn("flex gap-3", className)}>
      <div className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-[var(--radius-btn)] border border-line-strong bg-bg">
        {preview ? (
          <img src={preview} alt="" className="size-full object-cover" />
        ) : (
          <ImageOff className="size-6 text-muted" />
        )}
        {busy && (
          <div className="absolute inset-0 grid place-items-center bg-bg/70">
            <Spinner />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <TextInput
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/photo.jpg or https://…"
        />
        <div className="flex items-center gap-3">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onFile}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-1.5 text-sm text-purple-light hover:underline disabled:opacity-50"
          >
            <Upload className="size-4" />
            Upload
          </button>
          {error && <span className="text-xs text-red-600">{error}</span>}
        </div>
      </div>
    </div>
  );
}
