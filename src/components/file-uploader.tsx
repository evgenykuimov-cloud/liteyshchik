"use client";

import { useRef, useState } from "react";
import { FileUp, X } from "lucide-react";

const accept = ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip,.dwg,.dxf";

export function FileUploader({ onChange }: { onChange: (files: File[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const update = (next: File[]) => { setFiles(next); onChange(next); };
  return (
    <div>
      <div onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); update([...files, ...Array.from(event.dataTransfer.files)]); }} className="border border-dashed border-[var(--border-strong)] p-5 text-center">
        <FileUp className="mx-auto text-[var(--accent)]" />
        <p className="mt-2 text-sm">Перетащите файлы или выберите на устройстве</p>
        <p className="mt-1 text-xs text-[var(--foreground-muted)]">PDF, DOC, XLS, изображения, ZIP, DWG, DXF · до 10 МБ на файл</p>
        <button type="button" onClick={() => inputRef.current?.click()} className="btn-secondary mt-4">Выбрать файлы</button>
        <input ref={inputRef} type="file" multiple accept={accept} className="sr-only" onChange={(event) => update([...files, ...Array.from(event.target.files ?? [])])} />
      </div>
      {files.length > 0 && <ul className="mt-3 grid gap-2">{files.map((file, index) => <li key={`${file.name}-${index}`} className="flex items-center justify-between border border-[var(--border)] p-3 text-xs"><span className="truncate">{file.name} · {(file.size / 1024 / 1024).toFixed(2)} МБ</span><button type="button" onClick={() => update(files.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Удалить ${file.name}`}><X size={17} /></button></li>)}</ul>}
    </div>
  );
}
