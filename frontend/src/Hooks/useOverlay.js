import { useState } from 'react'

export default function useOverlay() {
  const [overlayContent, setOverlayContent] = useState()
  const [overlayStatus, setOverlayStatus] = useState()

  console.log('overlayStatus', overlayStatus)

  return { overlayStatus, setOverlayStatus, overlayContent, setOverlayContent }
}
