import { useEffect, useMemo, useState } from "react";

type Listing = {
  id: string;
  title: string;        
  platform: "PC" | "PS5" | "Xbox" | "Switch";
  price: number;
  note?: string;
};

const SEED: Listing[] = [
  { id: "l1", title: "Hades", platform: "Switch", price: 25, note: "Cart only" },
  { id: "l2", title: "Elden Ring", platform: "PS5", price: 40, note: "Great condition" },
  { id: "l3", title: "Stardew Valley", platform: "PC", price: 12, note: "Gift code" },
];

type Props = {
  searchQuery: string;             
  setSearchQuery: (v: string) => void;
};

export function CartridgeCartPage({ searchQuery, setSearchQuery }: Props) {
  const [listings, setListings] = useState<Listing[]>(() => {
    const saved = sessionStorage.getItem("cc_listings");
    return saved ? JSON.parse(saved) : SEED;
  });

  useEffect(() => {
    sessionStorage.setItem("cc_listings", JSON.stringify(listings));
  }, [listings]);

  const addListing = (l: Omit<Listing, "id">) => {
    const id = crypto.randomUUID();
    setListings(prev => [{ id, ...l }, ...prev]);
  };

  const removeListing = (id: string) => {
    setListings(prev => prev.filter(x => x.id !== id));
  };

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return listings;
    return listings.filter(l =>
      [l.title, l.platform, String(l.price), l.note ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [listings, searchQuery]);

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
              placeholder="Try 'PS5', 'Switch', 'Elden Ring'…"
            />
            <p className="text-slate-200 text-sm mt-1">
              This search is shared across pages (Assignment T.3).
            </p>
          </div>
        </header>

        <ListingForm onAdd={addListing} />

        <ul className="grid gap-3">
          {filtered.map((l) => (
            <li
              key={l.id}
              className="rounded-2xl border bg-white p-4 bg-linear-to-br from-sky-800 via-blue-900 to-indigo-950 text-white"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg underline">{l.title}</h3>
                  <p className="text-sm opacity-90">Platform: {l.platform} • ${l.price}</p>
                  {l.note && <p className="text-sm mt-1">{l.note}</p>}
                </div>
                <button
                  onClick={() => removeListing(l.id)}
                  className="rounded-2xl border px-3 py-1 hover:bg-white/10"
                  aria-label={`Remove ${l.title}`}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="text-center text-slate-600">No listings match your search.</li>
          )}
        </ul>
      </div>
    </section>
  );
}

function ListingForm({ onAdd }: { onAdd: (l: Omit<Listing, "id">) => void }) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState<Listing["platform"]>("PC");
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
            onChange={(e) => setPlatform(e.target.value as Listing["platform"])}
            className="w-full rounded-xl bg-white/10 border border-white/20 p-2"
          >
            <option>PC</option>
            <option>PS5</option>
            <option>Xbox</option>
            <option>Switch</option>
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
