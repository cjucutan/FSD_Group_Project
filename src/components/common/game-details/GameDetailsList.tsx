import games from "../../data/games.json";

export function GameList() {
  return (
    <section>
      {games.map((game) => (
        <div>
          {Object.entries(game).filter(([key]) => key !== "id").map(([detail, info]) => (
            <p key={detail}>
              <span>{detail}: {info}</span>
            </p>
          ))}
        </div>
      ))}
    </section>
  );
}