import type { Game } from "../../components/common/types/games";

let TEST_GAMES: Game[] = [
  { id: "1",  gameName: "Dota 2",          image: "/img/dota2.jpg",        detail: "Team-based MOBA.",               genre: "MOBA" as any,       ratings: "T",    platform: "PC" as any,     developer: "Valve",            user: "system" },
  { id: "2",  gameName: "Hades",           image: "/img/hades.jpg",        detail: "Action roguelike.",              genre: "Roguelike" as any,  ratings: "T",    platform: "PC" as any,     developer: "Supergiant",       user: "system" },
  { id: "3",  gameName: "God of War",      image: "/img/gow.jpg",          detail: "Mythic action adventure.",       genre: "Action" as any,     ratings: "M",    platform: "PS5" as any,    developer: "Santa Monica",     user: "system" },
  { id: "4",  gameName: "Halo Infinite",   image: "/img/halo.jpg",         detail: "Sci-fi shooter.",                genre: "Shooter" as any,    ratings: "T",    platform: "Xbox" as any,   developer: "343 Industries",   user: "system" },
  { id: "5",  gameName: "Mario Odyssey",   image: "/img/odyssey.jpg",      detail: "3D platformer.",                 genre: "Platformer" as any, ratings: "E10+", platform: "Switch" as any, developer: "Nintendo",         user: "system" },
  { id: "6",  gameName: "Stardew Valley",  image: "/img/stardew.jpg",      detail: "Farming life sim.",              genre: "Simulation" as any, ratings: "E10+", platform: "Switch" as any, developer: "ConcernedApe",     user: "system" },
  { id: "7",  gameName: "Elden Ring",      image: "/img/eldenring.jpg",    detail: "Open-world action RPG.",         genre: "RPG" as any,        ratings: "M",    platform: "PC" as any,     developer: "FromSoftware",     user: "system" },
  { id: "8",  gameName: "Spider-Man 2",    image: "/img/spiderman2.jpg",   detail: "Super-hero action.",             genre: "Action" as any,     ratings: "T",    platform: "PS5" as any,    developer: "Insomniac",        user: "system" },
  { id: "9",  gameName: "Forza Horizon 5", image: "/img/forza5.jpg",       detail: "Open-world racing.",             genre: "Racing" as any,     ratings: "E",    platform: "Xbox" as any,   developer: "Playground Games", user: "system" },
  { id: "10", gameName: "Splatoon 3",      image: "/img/splatoon3.jpg",    detail: "Colorful team shooter.",         genre: "Shooter" as any,    ratings: "E10+", platform: "Switch" as any, developer: "Nintendo",         user: "system" },
  { id: "11", gameName: "Baldur’s Gate 3", image: "/img/bg3.jpg",          detail: "Party-based CRPG.",              genre: "RPG" as any,        ratings: "M",    platform: "PC" as any,     developer: "Larian",           user: "system" },
  { id: "12", gameName: "Sea of Stars",    image: "/img/seaofstars.jpg",   detail: "Turn-based retro RPG.",          genre: "RPG" as any,        ratings: "E10+", platform: "Switch" as any, developer: "Sabotage Studio",  user: "system" }
];

export type SearchFilters = {
  query?: string;
  genres?: string[];
  platforms?: Array<Game["platform"]>;
};

async function getAll(): Promise<Game[]> {
  return [...TEST_GAMES];
}
async function create(game: Game): Promise<Game> {
  TEST_GAMES = [game, ...TEST_GAMES];
  return game;
}
async function update(id: string, patch: Partial<Game>): Promise<Game | null> {
  let updated: Game | null = null;
  TEST_GAMES = TEST_GAMES.map(g => {
    if (g.id !== id) return g;
    updated = { ...g, ...patch, id: g.id };
    return updated;
  });
  return updated;
}
async function remove(id: string): Promise<boolean> {
  const before = TEST_GAMES.length;
  TEST_GAMES = TEST_GAMES.filter(g => g.id !== id);
  return TEST_GAMES.length < before;
}
async function find(_filters: SearchFilters): Promise<Game[]> {
  const all = await getAll();
  return all;
}

export const searchRepo = { getAll, create, update, remove, find };
