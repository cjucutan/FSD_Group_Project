import { useState } from "react";
import { useMarketplace } from "../../../hooks/useMarketplace";
import type { MarketPlatform, MarketCondition } from "../types/marketplace";

const platforms: MarketPlatform[] = ["Any", "PC", "PS5", "Xbox", "Switch"];
const conditions: MarketCondition[] = ["New", "Used", "Digital"];

export function CartridgeCartPage() {
  const { filters, setFilters, items, loading, toggleSaved, addItem, removeItem } = useMarketplace();

  return (
    <section className="grid place-content-center p-10" aria-labelledby="cartridge-cart-title">
      <div className="max-w-xl w-full space-y-6">
        <header className="rounded-2xl border p-4 text-white bg-linear-to-br from-sky-800 via-blue-900 to-indigo-950">
          <h2 id="cartridge-cart-title" className="text-center text-xl font-bold underline mb-2">
            Cartridge Cart — Marketplace
          </h2>

          <div className="mt-3">
            <label htmlFor="cc-search" className="block font-semibold underline p-1">
              Search listings
            </label>
            <input
              id="cc-search"
              type="text"
              value={filters.q ?? ""}
              onChange={(e) => setFilters(f => ({ ...f, q: e.target.value }))}
              className="w-full rounded-xl bg-white/10 border border-white/20 p-2 placeholder-white/60"
              placeholder="Try 'PS5', 'Switch', 'Elden Ring'…"
            />
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <select
                aria-label="Platform filter"
                value={filters.platform ?? "Any"}
                onChange={(e) => setFilters(f => ({ ...f, platform: e.target.value as MarketPlatform }))}
                className="w-full rounded-xl bg-white/10 border border-white/20 p-2"
              >
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>

              <select
                aria-label="Condition filter"
                value={filters.condition ?? "Any"}
                onChange={(e) => setFilters(f => ({ ...f, condition: e.target.value as MarketCondition }))}
                className="w-full rounded-xl bg-white/10 border border-white/20 p-2"
              >
                <option value="Any">Any</option>
                {conditions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              <input
                aria-label="Max price"
                type="number"
                min={0}
                value={filters.maxPrice ?? ""}
                onChange={(e) =>
                  setFilters(f => ({ ...f, maxPrice: e.target.value ? Number(e.target.value) : null }))
                }
                className="w-full rounded-xl bg-white/10 border border-white/20 p-2 placeholder-white/60"
                placeholder="Max price"
              />
            </div>

            <div className="mt-3 flex gap-2">
              <button
                className={`rounded-2xl border px-3 py-1 ${filters.savedOnly ? "bg-white/10" : ""}`}
                onClick={() => setFilters(f => ({ ...f, savedOnly: !f.savedOnly }))}
                title="Show saved only"
              >
                ★ Saved
              </button>

              <select
                aria-label="Sort"
                value={filters.sort ?? "recent"}
                onChange={(e) => setFilters(f => ({ ...f, sort: e.target.value as "recent" | "priceAsc" | "priceDesc" }))}
                className="rounded-2xl border px-3 py-1 bg-white/10"
              >
                <option value="recent">Recent</option>
                <option value="priceAsc">Price: Low → High</option>
                <option value="priceDesc">Price: High → Low</option>
              </select>
            </div>
          </div>
        </header>

        <ListingForm onAdd={(payload) => {
          addItem({
            title: payload.title,
            platform: payload.platform,
            price: payload.price,
            condition: payload.condition ?? "Used",
            seller: payload.seller || "you",
            image: payload.image || "../../data/images/games.jpg",
            description: payload.note || "",
            saved: false,
          });
        }} />

        {loading ? (
          <p className="text-center text-slate-600">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-center text-slate-600">No listings match your filters.</p>
        ) : (
          <ul className="grid gap-3">
            {items.map((l) => (
              <li
                key={l.id}
                className="rounded-2xl border p-0 overflow-hidden bg-white"
              >
                <img
                  src={l.image}
                  alt={l.title}
                  className="w-full aspect-video object-cover"
                  loading="lazy"
                />
                <div className="p-4 bg-linear-to-br from-sky-800 via-blue-900 to-indigo-950 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg underline">{l.title}</h3>
                      <p className="text-sm opacity-90">
                        Platform: {l.platform} • ${l.price} • {l.condition}
                      </p>
                      {l.description && <p className="text-sm mt-1">{l.description}</p>}
                      <p className="text-xs opacity-75 mt-1">Seller: {l.seller}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => toggleSaved(l.id)}
                        className={`rounded-2xl border px-3 py-1 hover:bg-white/10 ${l.saved ? "bg-white/10" : ""}`}
                        aria-label={l.saved ? "Unsave" : "Save"}
                      >
                        {l.saved ? "Saved ★" : "Save ☆"}
                      </button>

                      <button
                        onClick={() => removeItem(l.id)}
                        className="rounded-2xl border px-3 py-1 hover:bg-white/10"
                        aria-label={`Remove ${l.title}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

type SimpleForm = {
  title: string;
  platform: MarketPlatform extends "Any" ? never : Exclude<MarketPlatform, "Any">;
  price: number;
  note?: string;
  condition?: MarketCondition;
  seller?: string;
  image?: string;
};

function ListingForm({ onAdd }: { onAdd: (l: SimpleForm) => void }) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState<Exclude<MarketPlatform, "Any">>("PC");
  const [price, setPrice] = useState<number | "">("");
  const [note, setNote] = useState("");
  const [condition, setCondition] = useState<MarketCondition>("Used");

  const canAdd = title.trim() && typeof price === "number";

  return (
    <div className="rounded-2xl border p-4 text-white bg-linear-to-br from-sky-800 via-blue-900 to-indigo-950">
      <h3 className="text-lg font-bold underline mb-2 text-center">Add a Listing</h3>

      <div className="space-y-3">
        <div>
          <label htmlFor="lf-title" className="block font-semibold underline p-1">Title *</label>
          <input
            id="lf-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl bg-white/10 border border-white/20 p-2 placeholder-white/60"
            placeholder="Game name (e.g., Hades)"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="lf-platform" className="block font-semibold underline p-1">Platform</label>
            <select
              id="lf-platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Exclude<MarketPlatform, "Any">)}
              className="w-full rounded-xl bg-white/10 border border-white/20 p-2"
            >
              <option>PC</option>
              <option>PS5</option>
              <option>Xbox</option>
              <option>Switch</option>
            </select>
          </div>

          <div>
            <label htmlFor="lf-condition" className="block font-semibold underline p-1">Condition</label>
            <select
              id="lf-condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value as MarketCondition)}
              className="w-full rounded-xl bg-white/10 border border-white/20 p-2"
            >
              <option>Used</option>
              <option>New</option>
              <option>Digital</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="lf-price" className="block font-semibold underline p-1">Price *</label>
          <input
            id="lf-price"
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full rounded-xl bg-white/10 border border-white/20 p-2 placeholder-white/60"
            placeholder="25"
            required
          />
        </div>

        <div>
          <label htmlFor="lf-note" className="block font-semibold underline p-1">Note</label>
          <input
            id="lf-note"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-xl bg-white/10 border border-white/20 p-2 placeholder-white/60"
            placeholder="Condition, extras, etc."
          />
        </div>
      </div>

      <div className="mt-4 text-center">
        <button
          className="rounded-2xl border px-4 py-2 hover:bg-white/10 disabled:opacity-50"
          onClick={() => {
            if (!canAdd) return;
            onAdd({
              title: title.trim(),
              platform,
              price: Number(price),
              note: note.trim() || undefined,
              condition,
            });
            setTitle("");
            setPlatform("PC");
            setPrice("");
            setNote("");
            setCondition("Used");
          }}
          disabled={!canAdd}
        >
          Add Listing
        </button>
      </div>
    </div>
  );
}
