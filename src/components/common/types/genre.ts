export const Genre = {
    ACTION: "Action",
    ADVENTURE: "Adventure",
    RPG: "RPG",
    STRATEGY: "Strategy",
    SIMULATION: "Simulation",
    SPORTS: "Sports",
    PUZZLE: "Puzzle",
    HORROR: "Horror",
    PLATFORMER: "Platformer",
    SHOOTER: "Shooter",
    RACING: "Racing",
    FIGHTING: "Fighting",
    MMO: "MMO",
    SANDBOX: "Sandbox",
    SURVIVAL: "Survival",
    RHYTHM: "Rhythm",
    EDUCATIONAL: "Educational",
    CASUAL: "Casual",
    INDIE: "Indie",
    MOBA: "MOBA",
    FPS: "FPS"
} as const;

export type Genre = (typeof Genre)[keyof typeof Genre];

