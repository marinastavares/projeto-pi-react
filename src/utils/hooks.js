import { useState } from 'react'

export const useModal = (initialMode = false) => {
  const [modalOpen, setModalOpen] = useState(initialMode)
  // eslint-disable-next-line no-shadow
  const toggle = () => setModalOpen((modalOpen) => !modalOpen)
  return [modalOpen, toggle]
}
