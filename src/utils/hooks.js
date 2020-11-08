import { useState, useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'react-simple-snackbar'

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

export const usePrevious = (value) => {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

const options = {
  position: 'bottom-right',
  style: {
    fontFamily: 'Nunito',
    fontSize: '20px',
    textAlign: 'left',
    backgroundColor: '#3751FF',
    color: '#DDE2FF',
  },
  closeStyle: {
    color: '#DDE2FF',
    fontSize: '16px',
  },
}

export const useOnSuccessCall = (action, onSuccess, message) => {
  const isLoading = useSelector((state) => !!state.loading[action])
  const error = useSelector((state) => !!state.error[action])
  const errorMessage = useSelector((state) => state.error[action])
  const wasLoading = usePrevious(isLoading)
  const [openSnackbar] = useSnackbar(options)

  useEffect(() => {
    if (!isLoading && wasLoading && !error) {
      if (message) {
        openSnackbar(message)
      }
      onSuccess()
    }
  })
  return [isLoading, errorMessage]
}

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (err) {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (err) {
      setStoredValue()
    }
  }

  const cleanLocalStorage = () => {
    window.localStorage.removeItem(key)
  }

  return [storedValue, setValue, cleanLocalStorage]
}
