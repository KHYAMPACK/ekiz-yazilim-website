/**
 * Outreach builder: turns leads + site reports into ready-to-send messages.
 * You send each message yourself (WhatsApp link opens the chat with the text filled in).
 *
 *   node scripts/leads/outreach.mjs                      (reads leads/leads-ankara.csv)
 *   node scripts/leads/outreach.mjs --leads leads/x.csv --limit 40 --include-chains
 *
 * Output: leads/outreach.csv (git-ignored), best leads first.
 * Message texts live in docs/outreach-mesajlari.md; keep the two in sync.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { phoneInfo } from "./find-leads.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const OPT_OUT = "İstemezseniz yazmanız yeterli, tekrar rahatsız etmem.";

function splitCsvLine(line) {
  const cells = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (q) {
      if (ch === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (ch === '"') q = false;
      else cur += ch;
    } else if (ch === '"') q = true;
    else if (ch === ",") {
      cells.push(cur);
      cur = "";
    } else cur += ch;
  }
  cells.push(cur);
  return cells;
}

function readCsv(file) {
  const lines = fs.readFileSync(file, "utf8").replace(/^﻿/, "").split(/\r?\n/).filter((l) => l.trim());
  const head = splitCsvLine(lines[0]);
  return lines.slice(1).map((l) => Object.fromEntries(splitCsvLine(l).map((v, i) => [head[i], v])));
}

const csvCell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
const lowerFirst = (t) => (/^[A-ZÇĞİÖŞÜ]{2}/.test(t) ? t : t.charAt(0).toLocaleLowerCase("tr") + t.slice(1));
const slug = (host) => host.replace(/^www\./, "").replace(/[^a-z0-9.-]/gi, "-");

function parseArgs(argv) {
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      flags[argv[i].slice(2)] = argv[i + 1] === undefined || argv[i + 1].startsWith("--") ? true : argv[++i];
    }
  }
  return flags;
}

function loadReport(url, reportsDir) {
  try {
    const host = new URL(url).hostname;
    const base = path.join(reportsDir, slug(host));
    if (!fs.existsSync(`${base}.json`)) return null;
    return { data: JSON.parse(fs.readFileSync(`${base}.json`, "utf8")), pdf: `${base}.pdf` };
  } catch {
    return null;
  }
}

const messages = {
  report: (name, finding) =>
    `Merhaba, ben Mert, Ekiz Yazılım. ${name} sitesine bakarken şunu fark ettim: ${finding}.\n` +
    `Ziyaretçiler ve Google açısından önemli olduğu için kısa bir rapor hazırladım, ekte. Karşılığında bir şey istemiyorum.\n` +
    `Düzeltmeye yardımcı olmamı isterseniz yazın. ${OPT_OUT}`,
  nosite: (name) =>
    `Merhaba, ben Mert, Ekiz Yazılım. ${name} için Google'da arayan velilerin sizi bulabileceği bir site taslağı hazırlayabilirim. İsterseniz taslağı gönderirim, beğenmezseniz hiçbir yükümlülük yok.\n` +
    OPT_OUT,
  demo: (name) =>
    `Merhaba, ben Mert, Ekiz Yazılım. LGS hazırlık kurumları için öğrenci takip uygulaması (Scholares) geliştiriyoruz: deneme analizi, yoklama ve velilere anlık bildirim tek yerde. ` +
    `${name} için kısa bir demo göstermek isterim. Ücretli pilotla başlıyoruz, kapsam yazılı.\n${OPT_OUT}`,
};

function main() {
  const flags = parseArgs(process.argv.slice(2));
  const leadsFile = path.resolve(root, String(flags.leads ?? "leads/leads-ankara.csv"));
  const reportsDir = path.resolve(root, String(flags.reports ?? "reports"));
  const out = path.resolve(root, String(flags.out ?? "leads/outreach.csv"));
  const limit = flags.limit ? Number(flags.limit) : Infinity;

  const leads = readCsv(leadsFile).filter((r) => flags["include-chains"] || r.kind !== "chain");
  const rows = [];

  for (const lead of leads) {
    const phone = phoneInfo(lead.phone);
    // Short greeting name: drop SEO tails after " - ", "|" or "/" and keep at most 4 words.
    const name = lead.name.replace(/\s+[-|–/]\s+.*$/, "").trim().split(/\s+/).slice(0, 4).join(" ");
    const rep = lead.url ? loadReport(lead.url, reportsDir) : null;
    const top = rep?.data.result.top?.find((f) => ["critical", "high", "medium"].includes(f.severity));

    let template, priority, finding = "";
    if (lead.kind === "chain") {
      // Branches of a franchise share one site they cannot change: pitch the app, not the site report.
      template = "demo";
      priority = "C";
    } else if (lead.url && top) {
      template = "report";
      finding = lowerFirst(top.title);
      priority = top.severity === "medium" ? "B" : "A";
    } else if (!lead.url) {
      template = "nosite";
      priority = "B";
    } else {
      template = "demo";
      priority = "C";
    }

    const message = messages[template](name, finding);
    const channel = phone.isMobile ? "whatsapp" : lead.phone ? "call" : "visit";
    rows.push({
      priority,
      name: lead.name,
      channel,
      phone: lead.phone,
      template,
      finding,
      message,
      wa_link: phone.isMobile ? `https://wa.me/${phone.e164}?text=${encodeURIComponent(message)}` : "",
      pdf: rep && fs.existsSync(rep.pdf) ? rep.pdf : "",
      maps: lead.maps,
      reviews: Number(lead.reviews) || 0,
      status: "",
      notes: "",
    });
  }

  rows.sort((a, b) => a.priority.localeCompare(b.priority) || b.reviews - a.reviews);
  const chosen = rows.slice(0, limit);

  const cols = ["priority", "name", "channel", "phone", "template", "finding", "wa_link", "pdf", "maps", "message", "status", "notes"];
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, "﻿" + [cols.join(","), ...chosen.map((r) => cols.map((c) => csvCell(r[c])).join(","))].join("\n"));

  const n = (f) => chosen.filter(f).length;
  console.log(
    `${chosen.length} leads → ${out}\n` +
      `  A (urgent finding): ${n((r) => r.priority === "A")}   B: ${n((r) => r.priority === "B")}   C (demo pitch): ${n((r) => r.priority === "C")}\n` +
      `  WhatsApp: ${n((r) => r.channel === "whatsapp")}   call: ${n((r) => r.channel === "call")}   visit only: ${n((r) => r.channel === "visit")}\n` +
      `  with report PDF attached: ${n((r) => r.pdf)}`,
  );
}

main();
