import { useEffect, useRef } from 'react'

interface Dimensions {
  width: number
  height: number
}

const useOnResize = (onResize: (dimensions: Dimensions) => void) => {
  const ref = useRef(null)
  const { width, height } = getTargetDimensions(ref)

  useEffect(() => {
    const target = ref.current
    if (!target) {
      return
    }
    onResize({ width, height })
    target.addEventListener('resize', () => onResize({ width, height }))
    return () => target.removeEventListener('resize', onResize)
  }, [ref, onResize, width, height])

  return ref
}

export default useOnResize

const getTargetDimensions = (ref: React.MutableRefObject<any>) => {
  const target = ref.current
  if (!target) {
    return { width: 0, height: 0 }
  }
  return {
    width: parseInt(window.getComputedStyle(target).width),
    height: parseInt(window.getComputedStyle(target).height),
  }
}
