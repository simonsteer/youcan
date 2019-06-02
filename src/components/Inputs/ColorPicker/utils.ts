export const rgbToHex = (rgb: number[]) => `#${rgb.map((c: number) => {
  const hex = c.toString(16);
  return hex.length == 1 ? `0${hex}` : hex
})}`

export const hexToRgb = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result.length) {
    return null
  }

  return result.map(r => parseInt(r, 16))
}