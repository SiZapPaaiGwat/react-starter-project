export function insertStyle (styleString) {
  let style = document.createElement('style')
  style.appendChild(document.createTextNode(styleString))
  document.head.appendChild(style)
  return style.sheet
}
