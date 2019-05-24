import { Style } from './types'
import merge from 'lodash/merge'
import kebabCase from 'lodash/kebabCase'

const flattenArray = (arr: any[]): any[] =>
  arr.reduce(
    (acc: any[], val) =>
      Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val),
    []
  )

const isNested = (key: string) => /^_/.test(key)
const isWebkit = (key: string) => /webkit/.test(key)
const isPseudo = (key: string) => /^_before|_after/.test(key)

const getNestedStylePrefix = (styleProp: string) => {
  if (isWebkit(styleProp)) {
    return '&::-'
  } else if (isPseudo(styleProp)) {
    return '::'
  } else {
    return '&:'
  }
}

const reduceWithNestedStyles = (styleMap: { [key: string]: any }) => {
  let styles = ''
  for (const styleProp in styleMap) {
    const cleanedKey = kebabCase(styleProp)
    if (!isNested(styleProp)) {
      styles = styles.concat(`${cleanedKey}:${styleMap[styleProp]};\n`)
    } else {
      const nestedStylePrefix = getNestedStylePrefix(styleProp)
      const nestedStyleKey = `${nestedStylePrefix}${cleanedKey}`
      styles = styles.concat(`${nestedStyleKey} {
        ${reduceWithNestedStyles(styleMap[styleProp])}
      }\n`)
    }
  }
  return styles.concat()
}

export const reduceStyles: (style: any) => string = (style: Style) =>
  reduceWithNestedStyles(
    Array.isArray(style) ? flattenArray(style).reduce(merge) : style
  )
