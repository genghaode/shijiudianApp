export const format_currency = (value) => {
  value = parseFloat(value).toFixed(2).toString()

  const [i, f] = value.split('.')

  return i.split('').reverse().map((x, i) => {
    return (i + 1) % 3 === 0 ? ',' + x : x
  }).reverse().join('') + '.' + f
}
