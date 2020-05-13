import { useState, useCallback, useEffect } from 'react'

export const useModal = (initialMode = false) => {
  const [modalOpen, setModalOpen] = useState(initialMode)
  // eslint-disable-next-line no-shadow
  const toggle = () => setModalOpen((modalOpen) => !modalOpen)
  return [modalOpen, toggle]
}

export const useResizer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  const handleSizeChange = useCallback(() => {
    return setIsMobile(window.innerWidth < 640)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleSizeChange)

    return () => {
      window.removeEventListener('resize', handleSizeChange)
    }
  }, [isMobile, handleSizeChange])

  return isMobile
}
