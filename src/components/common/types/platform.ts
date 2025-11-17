export const Platform = {
  PC: "PC",
  PS5: "PS5",
  XBOX: "XBOX",
  SWITCH: "SWITCH",
  CONSOLE: "CONSOLE",
  MOBILE: "MOBILE",
} as const;

export type Platform = (typeof Platform)[keyof typeof Platform];
