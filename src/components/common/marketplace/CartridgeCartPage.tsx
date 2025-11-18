import { useState } from "react";
import { useMarketplace } from "../../../hooks/useMarketplace";

export function CartridgeCartPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { listings, loading, error, add, remove } = useMarketplace(searchQuery);

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-white/10 border border-white/20 p-2 placeholder-white/60"
              placeholder="Try 'PS5', 'SWITCH', 'Elden Ring'…"
            />
            {loading && <p className="text-slate-200 text-sm mt-1">Loading…</p>}
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
          </div>
        </header>

        <ListingForm onAdd={add} />

        <ul className="grid gap-3">
          {listings.map((l) => (
            <li key={l.id} className="rounded-2xl border p-4 bg-linear-to-br from-sky-800 via-blue-900 to-indigo-950 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg underline">{l.title}</h3>
                  <p className="text-sm opacity-90">Platform: {l.platform} • ${l.price}</p>
                  {l.note && <p className="text-sm mt-1">{l.note}</p>}
                </div>
                <button
                  onClick={() => remove(l.id)}
                  className="rounded-2xl border px-3 py-1 hover:bg-white/10"
                  aria-label={`Remove ${l.title}`}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
          {listings.length === 0 && !loading && (
            <li className="text-center text-slate-400">No listings match your search.</li>
          )}
        </ul>
      </div>
    </section>
  );
}

function ListingForm({ onAdd }: { onAdd: (l: { title: string; platform: string; price: number; note?: string }) => void }) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState<string>("PC");
  const [price, setPrice] = useState<number | "">("");
  const [note, setNote] = useState("");

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

        <div>
          <label htmlFor="lf-platform" className="block font-semibold underline p-1">Platform</label>
          <select
            id="lf-platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full rounded-xl bg-white/10 border border-white/20 p-2"
          >
            <option value="PC">PC</option>
            <option value="PS5">PS5</option>
            <option value="XBOX">Xbox</option>
            <option value="SWITCH">Switch</option>
          </select>
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
          onClick={() =>
            canAdd &&
            onAdd({
              title: title.trim(),
              platform,
              price: Number(price),
              note: note.trim() || undefined,
            })
          }
          disabled={!canAdd}
        >
          Add Listing
        </button>
      </div>
    </div>
  );
}
