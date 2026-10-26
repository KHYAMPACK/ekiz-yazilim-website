/** Sample-data app views for /egitim and the homepage hero. Swap for real screenshots when available. */

const TILES = [
  { label: "Ortalama net", value: "63,0" },
  { label: "En yüksek net", value: "81,7" },
  { label: "Katılan", value: "28" },
] as const;

const BARS = [38, 52, 46, 64, 58, 76, 70] as const;

const SUBJECTS = [
  { name: "Türkçe", net: "15,8", pct: 79 },
  { name: "Matematik", net: "12,4", pct: 62 },
  { name: "Fen", net: "13,1", pct: 66 },
  { name: "İnkılap", net: "7,2", pct: 72 },
  { name: "Din", net: "8,0", pct: 80 },
  { name: "İngilizce", net: "6,5", pct: 65 },
] as const;

const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum"] as const;
const WEEK = [
  ["MAT", "TRK", "FEN", "MAT", "MAT"],
  ["TRK", "MAT", "MAT", "TRK", "FEN"],
  ["FEN", "FEN", "TRK", "İNG", "TRK"],
  ["İNG", "İNK", "DİN", "FEN", "İNG"],
] as const;

const STUDENTS = [
  { ini: "AŞ", name: "Ada Ş.", present: true },
  { ini: "BT", name: "Baran T.", present: false },
  { ini: "DK", name: "Defne K.", present: true },
  { ini: "ET", name: "Ece T.", present: true },
] as const;

const NOTIFS = [
  { title: "Elif 1. Derse Katıldı", sub: "Cuma · Matematik", time: "Şimdi", hot: true },
  { title: "Deneme 7 Sonucu Yayınlandı", sub: "68,5 Net · Sınıf Sırası 4", time: "Şimdi", hot: false },
  { title: "Haftalık Özet Hazır", sub: "12 ders işlendi", time: "Bugün", hot: false },
  { title: "Yarın: Deneme Sınavı", sub: "8. Sınıf · Takvim hatırlatması", time: "Bugün", hot: false },
] as const;

function Frame({
  title,
  sub,
  pill,
  children,
}: {
  title: string;
  sub: string;
  pill?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-sc-border bg-sc-surface text-sc-text">
      <div className="flex items-center gap-1.5 px-4 pt-3.5">
        <span className="size-2 rounded-full bg-sc-border" aria-hidden />
        <span className="size-2 rounded-full bg-sc-border" aria-hidden />
        <span className="size-2 rounded-full bg-sc-border" aria-hidden />
        <span className="ml-auto rounded-full bg-sc-surface-2 px-2.5 py-0.5 text-[10px] tracking-wide text-sc-muted">
          Örnek veri
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-2xl leading-tight tracking-tight text-sc-text">
              {title}
            </p>
            <p className="mt-0.5 text-xs text-sc-muted">{sub}</p>
          </div>
          {pill && (
            <span className="shrink-0 rounded-full bg-sc-surface-2 px-2.5 py-1 text-[11px] font-medium text-sc-text">
              {pill}
            </span>
          )}
        </div>
        {children}
      </div>
    </figure>
  );
}

export function ExamView() {
  return (
    <Frame title="Deneme Sonuçları" sub="8. Sınıf · Deneme 7" pill="Sınıf özeti">
      <div className="grid grid-cols-3 gap-2">
        {TILES.map((t) => (
          <div key={t.label} className="rounded-xl bg-sc-surface-2 px-3 py-2.5">
            <p className="text-[10px] text-sc-muted">{t.label}</p>
            <p className="mt-0.5 text-xl font-medium tracking-tight text-sc-text">{t.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-sc-surface-2/60 p-3">
        <p className="mb-2 text-[11px] text-sc-muted">
          Denemelere göre sınıf ortalaması (net)
        </p>
        <div
          className="flex h-28 items-end gap-2"
          role="img"
          aria-label="Sınıf ortalaması denemelerle yükseliyor"
        >
          {BARS.map((h, i) => (
            <span
              key={i}
              className={`flex-1 rounded-md ${i === BARS.length - 1 ? "bg-sc-accent" : "bg-[#6f4a38]"}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="mt-1.5 flex gap-2 text-[10px] text-sc-muted">
          {BARS.map((_, i) => (
            <span key={i} className="flex-1 text-center">
              D{i + 1}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {SUBJECTS.map((s) => (
          <div key={s.name}>
            <div className="flex justify-between text-[11px] text-sc-text">
              <span>{s.name}</span>
              <b className="font-medium">{s.net}</b>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-sc-surface-2">
              <div
                className="h-full rounded-full bg-sc-accent"
                style={{ width: `${s.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function AttendanceView() {
  return (
    <Frame title="Yoklama" sub="8-A · Haftalık ders programı" pill="Bu hafta">
      <div className="grid grid-cols-[1.2rem_repeat(5,1fr)] gap-1 text-center text-[10px]">
        <span />
        {DAYS.map((d) => (
          <span key={d} className="text-sc-muted">
            {d}
          </span>
        ))}
        {WEEK.map((row, r) => (
          <div key={r} className="contents">
            <span className="self-center text-sc-muted">{r + 1}</span>
            {row.map((c, i) => (
              <span
                key={i}
                className={`rounded-md py-1 font-medium ${
                  r === 0 && i === 4
                    ? "bg-sc-accent text-sc-on-accent"
                    : "bg-sc-surface-2 text-sc-text"
                }`}
              >
                {c}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-xl bg-sc-surface-2 px-3 py-2.5 text-xs">
        <strong className="font-medium text-sc-text">Cuma · 1. Ders · Matematik</strong>
        <span className="text-sc-muted">
          26 Var · <span className="font-medium text-sc-accent-text">2 Yok</span>
        </span>
      </div>
      <ul className="grid gap-1.5">
        {STUDENTS.map((s) => (
          <li
            key={s.name}
            className="flex items-center gap-3 rounded-xl border border-sc-border px-3 py-1.5 text-sm"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sc-surface-2 text-[10px] font-medium text-sc-text">
              {s.ini}
            </span>
            <span className="flex-1 text-sc-text">{s.name}</span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                s.present
                  ? "bg-sc-surface-2 text-sc-muted"
                  : "bg-sc-accent text-sc-on-accent"
              }`}
            >
              {s.present ? "Var" : "Yok"}
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export function ParentView() {
  return (
    <Frame title="Veli Uygulaması" sub="Kurumunuzun adı ve renkleriyle">
      <div className="mx-auto flex w-full max-w-[17rem] flex-1 flex-col gap-2 rounded-2xl border border-sc-border bg-sc-bg p-3">
        <div className="flex items-center justify-between text-xs">
          <strong className="font-medium text-sc-text">Hafta</strong>
          <span className="text-sc-muted">Elif A. · 8-A</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-sc-surface-2 px-2.5 py-2">
            <p className="text-[10px] text-sc-muted">Ders katılımı</p>
            <p className="text-base font-medium text-sc-text">%100</p>
          </div>
          <div className="rounded-xl bg-sc-surface-2 px-2.5 py-2">
            <p className="text-[10px] text-sc-muted">Son deneme</p>
            <p className="text-base font-medium text-sc-text">68,5 net</p>
          </div>
        </div>
        {NOTIFS.map((n) => (
          <div
            key={n.title}
            className={`flex items-start gap-2 rounded-xl border px-2.5 py-2 ${
              n.hot
                ? "border-sc-accent/50 bg-sc-accent/10"
                : "border-sc-border bg-sc-surface"
            }`}
          >
            <span
              className={`mt-1 size-1.5 shrink-0 rounded-full ${n.hot ? "bg-sc-accent" : "bg-sc-border"}`}
              aria-hidden
            />
            <span className="min-w-0 flex-1">
              <b className="block text-[12px] leading-tight font-medium text-sc-text">
                {n.title}
              </b>
              <span className="text-[11px] text-sc-muted">{n.sub}</span>
            </span>
            <time className="shrink-0 text-[10px] text-sc-muted">{n.time}</time>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export default function EgitimMockups() {
  return (
    <div className="mt-12 grid gap-4 lg:grid-cols-3">
      <ExamView />
      <AttendanceView />
      <ParentView />
    </div>
  );
}
