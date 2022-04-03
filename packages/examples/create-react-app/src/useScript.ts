import { useEffect, useRef } from 'react'


export const useScript = (url: string, onLoad: (e: any) => void) => {
  const callbackRef = useRef<(e: any) => void>()
  callbackRef.current = onLoad
  useEffect(() => {
    const script = document.createElement('script')

    script.src = url
    script.async = true
    script.crossOrigin = 'anonymous'
    script.onload = (e) => {
      callbackRef?.current?.(e)
    }
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [url])
}