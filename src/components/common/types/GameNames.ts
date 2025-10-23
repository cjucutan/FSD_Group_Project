export const GameNames = {
  HADES: "Hades",
  ELDENRING: "Elden Ring",
  STARDEWVALLEY: "Stardew Valley",
  MINECRAFT: "Minecraft",
  CYBERPUNK2077: "Cyberpunk 2077",
  TEARSOFTHEKINGDOM: "The Legend of Zelda: Tears of the Kingdom",
  BALDURSGATE3: "Baldur’s Gate 3",
  OVERWATCH2: "Overwatch 2",
  FORTNITE: "Fortnite",
  RESIDENTEVIL4REMAKE: "Resident Evil 4 Remake",
} as const;

export type GameName = (typeof GameNames)[keyof typeof GameNames];
