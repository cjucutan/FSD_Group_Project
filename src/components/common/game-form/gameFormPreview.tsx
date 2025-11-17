import { Genre } from "../types/genre";
import { Platform } from "../types/platform";

export function GameFormPreview() {
  
  return (
    <section className="grid place-content-center p-10" aria-labelledby="quick-game-entry-title">
      <div className="max-w-md w-full space-y-4">
        <div className="rounded-2xl border p-4 text-white bg-linear-to-br from-sky-800 via-blue-900 to-indigo-950">
          <h2 id="quick-game-entry-title" className="text-center text-xl font-bold underline mb-2">
            Quick Game Entry
          </h2>
          <p className="text-center text-slate-200 mb-4">
            Start here, then finish on the full form. Your entries will be retained.
          </p>

          <div className="space-y-3">
            <div>
              <label htmlFor="qe-game" className="block font-semibold underline p-1">Game *</label>
              <input
                id="qe-game"
                type="text"
                className="w-full rounded-xl bg-white/10 border border-white/20 p-2 placeholder-white/60"
                placeholder="Dota 2"
              />
            </div>

            <div>
              <label htmlFor="qe-platform" className="block font-semibold underline p-1">Platform</label>
              <select id="qe-platform" className="w-full rounded-xl bg-white/10 border border-white/20 p-2">
                {Object.values(Platform).map(p => (
                  <option key={p} value={p}>{p}</option>
                                    ))}
              </select>
            </div>

            <div>
              <label htmlFor="qe-genre" className="block font-semibold underline p-1">Genre</label>
              <select id="qe-genre" className="w-full rounded-xl bg-white/10 border border-white/20 p-2">
                {Object.values(Genre).map(g => (
                  <option key={g} value={g}>{g}</option>
                                    ))}
              </select>
              
            </div>
          </div>

          <div className="mt-4 text-center">
            <button className="rounded-2xl border px-4 py-2 hover:bg-white/10">
              Complete form →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
