import games from "../../data/games.json";

export function GameList() {
  const game = games[0];

  return (
    <section className="place-content-center p-10 grid ">
      <div className="max-w-md break-words ">
          <div className="text-center rounded-2xl border bg-white p-4 bg-linear-to-br from-sky-800 via-blue-900 to-indigo-950 text-white">
            {Object.entries(game).filter(([key]) => key !== "id").map(([detail, info]) => (
              <p key={detail}>
                <h4 className="p-6 underline font-bold ">{detail}</h4>
                <span>{info}</span>
              </p>
            ))}
          </div>
      </div>
    </section>
  );
}