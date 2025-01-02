import { useState, useEffect } from 'react'
import Image from 'next/image'

interface ImagePreviewProps {
  src: string
  alt: string
  onClose: () => void
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 transition-opacity duration-300"
      onClick={onClose}
    >
      <div className={`transform transition-all duration-300 ${
        isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}>
        <div className="relative w-[90vw] h-[90vh]">
          <Image
            src={src}
            alt={alt}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
            onLoadingComplete={() => setIsAnimating(false)}
          />
        </div>
      </div>
      <button
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        onClick={onClose}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export default ImagePreview 