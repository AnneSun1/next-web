"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X, Grid3X3 } from "lucide-react"

interface MasonryGalleryProps {
  images: string[]
  title: string
}

export function MasonryGallery({ images, title }: MasonryGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  const displayImages = images.slice(0, 5)
  const remainingCount = Math.max(0, images.length - 5)

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <div className="w-full">
      {/* Masonry Grid */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-96 rounded-lg overflow-hidden">
        {/* Main large image */}
        <div className="col-span-2 row-span-2 relative group cursor-pointer">
          <img
            src={displayImages[0] || "/placeholder.svg"}
            alt={`${title} - Main view`}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            onClick={() => {
              setSelectedImageIndex(0)
              setIsGalleryOpen(true)
            }}
          />
        </div>

        {/* Top right images */}
        {displayImages[1] && (
          <div className="relative group cursor-pointer">
            <img
              src={displayImages[1] || "/placeholder.svg"}
              alt={`${title} - View 2`}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              onClick={() => {
                setSelectedImageIndex(1)
                setIsGalleryOpen(true)
              }}
            />
          </div>
        )}

        {displayImages[2] && (
          <div className="relative group cursor-pointer">
            <img
              src={displayImages[2] || "/placeholder.svg"}
              alt={`${title} - View 3`}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              onClick={() => {
                setSelectedImageIndex(2)
                setIsGalleryOpen(true)
              }}
            />
          </div>
        )}

        {/* Bottom right images */}
        {displayImages[3] && (
          <div className="relative group cursor-pointer">
            <img
              src={displayImages[3] || "/placeholder.svg"}
              alt={`${title} - View 4`}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              onClick={() => {
                setSelectedImageIndex(3)
                setIsGalleryOpen(true)
              }}
            />
          </div>
        )}

        {displayImages[4] && (
          <div className="relative group cursor-pointer">
            <img
              src={displayImages[4] || "/placeholder.svg"}
              alt={`${title} - View 5`}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              onClick={() => {
                setSelectedImageIndex(4)
                setIsGalleryOpen(true)
              }}
            />
            {/* Show all photos button overlay */}
            {remainingCount > 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Button
                  variant="secondary"
                  className="bg-white text-black hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsGalleryOpen(true)
                  }}
                >
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  Show all photos
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Show all photos button (if no overlay) */}
      {remainingCount === 0 && images.length > 5 && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setIsGalleryOpen(true)}
            className="bg-background border-border text-foreground hover:bg-muted"
          >
            <Grid3X3 className="h-4 w-4 mr-2" />
            Show all {images.length} photos
          </Button>
        </div>
      )}

      {/* Full Gallery Modal */}
      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="max-w-6xl w-full h-[90vh] p-0 bg-black">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setIsGalleryOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 rounded text-sm">
              {selectedImageIndex + 1} / {images.length}
            </div>

            {/* Previous button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            {/* Next button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Main image */}
            <img
              src={images[selectedImageIndex] || "/placeholder.svg"}
              alt={`${title} - Image ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/50 p-2 rounded max-w-full overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                    index === selectedImageIndex ? "border-white" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${title} - Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
