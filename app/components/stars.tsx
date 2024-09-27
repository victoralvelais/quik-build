import React, { useEffect } from 'react'
import styles from '~/styles/stars.module.css'

const Stars: React.FC = () => {
  useEffect(() => {
    createStars()
  }, [])

  const createStars = () => {
    const starrysky = document.createElement('div')
    starrysky.className = styles.starrySky
    starrysky.id = 'starrySky'
    document.body.appendChild(starrysky)
    const starCount = 200

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div')
      star.className = styles.star
      star.style.width = `${Math.random() * 2}px`
      star.style.height = star.style.width
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`
      star.style.animationDelay = `${Math.random() * 5}s`
      starrysky.appendChild(star)
    }
  }

  return null
}

export default Stars