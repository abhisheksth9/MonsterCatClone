import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import '../style/Carousel.css'
import { useState, useEffect, useCallback } from 'react'

export default function EmblaCarousel({ images }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])
  
  const DotButton = ({ selected, onClick }) => (
    <button
      className={`embla__dot ${selected ? 'is-selected' : ''}`}
      type="button"
      onClick={onClick}
    />
  )

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)

    return () => emblaApi.off('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <>
    <div className="page-logo">
      <img src="/logo/Monstercat.png" alt="Logo" />
    </div>

    <div className="embla" ref={emblaRef}>  
      <div className="embla__container">
        {images.map((image, index) => (
          <div className="embla__slide" key={index}>
            <div
              className={`carousel-card ${
                index === selectedIndex ? 'carousel-card-active' : ''
              }`}
            >
              <img className="blur-background" src={image.image} alt=''/>

              <img className="card-foreground" src={image.image} alt="" />

              <div className="detail">
                  <div className="release-detail">
                    <p className='release'><i><span style={{ color: image.color }}>{image.album}</span> - Released {image.releaseDate}</i></p>
                  </div>
              </div>
              <div className="card-overlay">
                <h2 className="card-title truncated-details">{image.title}</h2>
                <h2 className="card-artist truncated-details">{image.artist}</h2>
                <button className='view-release' style={{ backgroundColor: image.color}}>VIEW RELEASE</button>
                <button className='listen'>LISTEN ON PLAYER</button>
              </div>
              
            </div>
            
          </div>
        ))}
      </div>
      <div className="embla__prev" onClick={scrollPrev}>
        &lsaquo;
      </div>
      <div className="embla__next" onClick={scrollNext}>
        &rsaquo;
      </div>
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <div key={index} className="embla__dot-container">
              <DotButton
                selected={index === selectedIndex}
                onClick={() => scrollTo(index)}
              />
              <div
                className={`music-info ${index === selectedIndex ? "active" : ""}`}
                onClick={() => scrollTo(index)}
              >
                <p className='music-info-title truncated-text'>{images[index].title}</p>
                <p className='music_info-artist truncated-text'>{images[index].artist}</p>
              </div>
            </div>
          ))}
        </div>

    </div>
    </>

  )
}
