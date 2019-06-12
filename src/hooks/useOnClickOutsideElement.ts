import { useEffect, useRef } from 'react'

const useOnClickOutsideElement = (callback: () => void) => {
  const ref = useRef(null)
  useEffect(() => {
    const handler: EventListener = e => {
      if (!ref || !ref.current) {
        return
      }

      if (!ref.current.contains(e.target)) {
        callback()
      }
      e.stopPropagation()
    }
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [ref, callback])
  return ref
}

export default useOnClickOutsideElement
