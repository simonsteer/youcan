import React, { useLayoutEffect, useRef } from 'react'
import get from 'lodash/get'

interface Dimensions {
  width: number
  height: number
}

const useOnResize = (onResize: (dimensions: Dimensions) => void) => {
  const ref = useRef(null)
  const { width, height } = getTargetDimensions(ref)

  useLayoutEffect(() => {
    const target = ref.current
    if (!target) {
      return
    }

    onResize({ width, height })
    target.addEventListener('resize', () => onResize({ width, height }))
    return () => target.removeEventListener('resize', onResize)
  }, [ref, onResize, width, height])

  return (
    <object
      ref={ref}
      type="text/html"
      style={{
        display: 'block',
        opacity: 0,
        position: 'absolute',
        height: '100%',
        width: '100%',
        pointerEvents: 'none',
        zIndex: -1,
      }}
      data="about:blank"
      aria-hidden={true}
      aria-label="resize-listener"
      tabIndex={-1}
    />
  )
}

export default useOnResize

const getTargetDimensions = (ref: React.MutableRefObject<any>) => ({
  width: get(ref, 'current.scrollWidth') || 0,
  height: get(ref, 'current.scrollHeight') || 0,
})
