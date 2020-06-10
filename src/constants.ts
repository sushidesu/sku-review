
export const COLUMNS = {
  ITEM_NUMBER: 0,
  JAN: 1,
  NAME: 2,
  PLACE: 3,
  STOCK: 4,
  WHOLESALE_PRICE: 5,
  PRICE: 6,
}

export const SIZE = {
  width: 330,
  ratio: 1.414,
  margin: {
    big: 24,
    small: 8,
  }
}

type ColorTypes = "gray" | "primary"
type Color = {
  [key in ColorTypes]: {
    default: string
    dark: string
    contrast: string
  }
}

export const COLOR: Color = {
  gray: {
    default: "#dedede",
    dark: "#bdbdbd",
    contrast: "#333",
  },
  primary: {
    default: "#fab348",
    dark: "#f0874a",
    contrast: "#333",
  },
}
