export const Platform = {
  PC: "PC",
  PS5: "PS5",
  XBOX: "Xbox",
  SWITCH: "Switch",
  CONSOLE: "Console",
  MOBILE: "Mobile",
} as const;

export type Platform = (typeof Platform)[keyof typeof Platform];

