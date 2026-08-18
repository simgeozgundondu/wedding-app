export const wedding = {
  slug: "simge-fahrican",
  bride: "Simge",
  groom: "Fahrican",
  date: "14 Eylül 2026",
  dateDisplay: "14 EYLÜL 2026",
  time: "19:00",
  venue: "The Garden Wedding Hall",
  address: "Yıldız Posta Cad. No: 24, Beşiktaş / İstanbul",
  mapsQuery: "The Garden Wedding Hall, Beşiktaş, İstanbul",
  coverQuote: "Bir ömürlük hikâyenin ilk sayfasına hoş geldiniz.",
  heroQuoteLines: [
    "Bu özel günümüzde mutluluğumuzu",
    "sizlerle paylaşmaktan büyük mutluluk duyuyoruz.",
  ],
  storyLines: [
    "Her şey küçük bir tesadüfle başladı.",
    "Bugün ise birlikte yeni bir hikâyenin",
    "ilk sayfasını açıyoruz.",
  ],
};

export function getMapsUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
