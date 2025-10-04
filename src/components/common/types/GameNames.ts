export const GameNames = {
    VALORANT: "Valorant",
    LEAGUEOFLEGENDS: "League of Legends",
    DOTA2: "Dota 2"
} as const;

export type GameName = (typeof GameNames) [keyof typeof GameNames];