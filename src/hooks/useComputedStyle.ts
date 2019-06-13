import { useRef, MutableRefObject } from 'react'

enum UseComputedStyle {
  MutableRefObject,
  CSSStyleDeclaration,
}

const useComputedStyle = () => {
  const ref = useRef(null)
  const target = ref.current
  return target === null
    ? [null, null]
    : [target, window.getComputedStyle(target)]
}

export default useComputedStyle
