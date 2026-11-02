import type { Post } from "./types";
import { post as alanAdiKimin } from "@/content/blog/alan-adi-kimin-adina-olmali";
import { post as alanAdiDolarsa } from "@/content/blog/alan-adi-suresi-dolarsa-ne-olur";
import { post as dershaneFiyat } from "@/content/blog/dershane-web-sitesi-ne-kadar-tutar";
import { post as etutGerekli } from "@/content/blog/etut-merkezi-icin-web-sitesi-gerekli-mi";
import { post as haritalar } from "@/content/blog/google-haritalar-web-sitesi-butonu-acilmiyor";
import { post as kontrolListesi } from "@/content/blog/kurs-web-sitesinde-olmasi-gerekenler";
import { post as sifreVermiyor } from "@/content/blog/siteyi-yapan-kisi-sifreleri-vermiyor";
import { post as ssl } from "@/content/blog/ssl-sertifikasi-dolarsa-ne-olur";
import { post as sablon } from "@/content/blog/hazir-sablon-mu-ozel-tasarim-mi";
import { post as tasimaFiyat } from "@/content/blog/web-sitesi-tasima-ne-kadar-tutar";
import { post as tasimakMantikli } from "@/content/blog/siteyi-yeniden-yaptirmadan-tasimak";
import { post as ucuz } from "@/content/blog/ucuz-web-sitesi-neden-pahaliya-cikar";
import { post as yillik } from "@/content/blog/web-sitesi-yillik-maliyeti";

/** Newest first. Add a post by creating its file in content/blog and listing it here. */
export const posts: Post[] = [
  ucuz,
  yillik,
  sablon,
  tasimaFiyat,
  tasimakMantikli,
  etutGerekli,
  dershaneFiyat,
  alanAdiKimin,
  alanAdiDolarsa,
  ssl,
  haritalar,
  sifreVermiyor,
  kontrolListesi,
].sort((a, b) => b.published.localeCompare(a.published));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelated(post: Post): Post[] {
  return post.related.map((s) => getPost(s)).filter((p): p is Post => Boolean(p));
}

export const dateTr = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
