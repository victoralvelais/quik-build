import React, { useEffect, useRef } from 'react'

const Clouds: React.FC = () => {
  const cloudCanvasRef = useRef<SVGSVGElement>(null)
  const clouds: Cloud[] = []
  const cloudCount = 8

  class Cloud {
    element: SVGPathElement
    size: number
    x: number
    y: number
    speed: number

    constructor(svgNS: string) {
      this.element = createCloud(svgNS)
      this.size = Math.random() * 0.3 + 0.2
      this.x = Math.random() * window.innerWidth
      this.y = Math.random() * window.innerHeight
      this.speed = (Math.random() * 0.2 + 0.05) * (Math.random() < 0.5 ? 1 : -1)
      this.element.setAttribute("transform", `translate(${this.x},${this.y}) scale(${this.size})`)
    }

    update() {
      this.x += this.speed
      if (this.x > window.innerWidth + 100) this.x = -100
      if (this.x < -100) this.x = window.innerWidth + 100
      this.element.setAttribute("transform", `translate(${this.x},${this.y}) scale(${this.size})`)
    }
  }

  function createCloud(svgNS: string): SVGPathElement {
    const cloud = document.createElementNS(svgNS, "path")
    cloud.setAttribute("d", "M725.1 216.2C725.5 214.5 725.7 212.8 725.7 211.1C725.7 198.5 715.5 188.3 702.9 188.3C698.7 188.3 694.7 189.5 691.3 191.5C685.9 185.4 678 181.5 669.1 181.5C668.4 181.5 667.7 181.5 667 181.6C659.7 170.1 646.9 162.4 632.3 162.4C631.6 162.4 631 162.4 630.3 162.5C625 146 609.5 134.1 591.3 134.1C584.5 134.1 578 135.8 572.4 138.7C569.3 125.6 557.6 115.9 543.6 115.9C539.7 115.9 536 116.7 532.6 118C524.3 102.7 508.1 92.3 489.5 92.3C488.3 92.3 487.1 92.4001 486 92.4001C486.7 91.1001 483.8 82.6 476.4 77.2C469.3 72 457.6 70.0001 456 71.8001C445.2 63.7001 432 58.6 417.7 57.6C413.4 34.9 393.5 17.8 369.6 17.8C347.8 17.8 329.4 32 323 51.6C314.8 48.4 305.9 46.7001 296.6 46.7001C267.9 46.7001 243 63.3 231.1 87.5C225.6 85.4 219.6 84.2 213.4 84.2C192.4 84.2 174.4 97.5001 167.5 116.1C166.5 116 165.5 115.9 164.4 115.9C150.3 115.9 138.5 125.8 135.5 139C117.8 143.5 104 157.5 99.7999 175.3C97.8999 174.7 95.9999 174.3 93.8999 174.3C85.8999 174.3 79.0999 179.5 76.5999 186.6C75.5999 186.5 74.5999 186.4 73.4999 186.4C57.0999 186.4 43.8999 199.7 43.8999 216C30.8999 216 20.3999 222 20.3999 229.4C20.3999 236.8 30.8999 242.8 43.8999 242.8C48.6999 242.8 53.0999 242 56.8999 240.6C61.5999 243.8 67.3999 245.7 73.5999 245.7C83.4999 245.7 92.2999 240.8 97.6999 233.3C100.1 233.9 102.7 234.3 105.3 234.3C111.8 234.3 117.8 232.2 122.7 228.6C130 232.9 138.6 235.4 147.7 235.4C148.7 235.4 149.7 235.4 150.7 235.3C155.5 245.1 165.6 251.8 177.3 251.8C187.3 251.8 196.2 246.8 201.6 239.2C207.5 242.5 214.3 244.4 221.5 244.4C237.3 244.4 251 235.5 257.9 222.4C271 242.1 293.4 255.2 318.8 255.2C333.4 255.2 346.9 250.9 358.3 243.6C365.2 249 373.9 252.2 383.4 252.2C399.7 252.2 413.8 242.6 420.4 228.8C425.2 230.4 430.4 231.2 435.7 231.2C444.1 231.2 451.9 229.1 458.8 225.4C464.2 231.6 472.2 235.5 481.1 235.5C486.5 235.5 491.6 234 496 231.5C497 240.7 504.8 247.9 514.3 247.9C522 247.9 528.6 243.2 531.3 236.5C539.7 238.4 548.8 239.4 558.3 239.4C574.7 239.4 589.8 236.3 602.3 231.1C609.8 239.4 620.6 244.5 632.7 244.5C641.3 244.5 649.2 241.9 655.8 237.4C659.9 239.6 664.6 240.8 669.5 240.8C678.3 240.8 686.3 236.9 691.7 230.8C694.3 232.3 697.2 233.4 700.3 233.8C703.4 239.1 712.2 242.9 722.6 242.9C735.6 242.9 746.1 236.9 746.1 229.5C745.7 222.7 736.7 217 725.1 216.2Z")
    cloud.setAttribute("fill", "url(#cloudGradient)")
    return cloud
  }

  function initClouds() {
    const svgNS = "http://www.w3.org/2000/svg"
    const cloudCanvas = cloudCanvasRef.current
    if (!cloudCanvas) return

    // Add gradient definition
    const defs = document.createElementNS(svgNS, "defs")
    const gradient = document.createElementNS(svgNS, "linearGradient")
    gradient.setAttribute("id", "cloudGradient")
    gradient.setAttribute("x1", "0%")
    gradient.setAttribute("y1", "0%")
    gradient.setAttribute("x2", "0%")
    gradient.setAttribute("y2", "100%")

    const stop1 = document.createElementNS(svgNS, "stop")
    stop1.setAttribute("offset", "0%")
    stop1.setAttribute("style", "stop-color:#888888;stop-opacity:0.12")

    const stop2 = document.createElementNS(svgNS, "stop")
    stop2.setAttribute("offset", "100%")
    stop2.setAttribute("style", "stop-color:#888888;stop-opacity:0")

    gradient.appendChild(stop1)
    gradient.appendChild(stop2)
    defs.appendChild(gradient)
    cloudCanvas.appendChild(defs)

    // Create clouds
    for (let i = 0; i < cloudCount; i++) {
      const cloud = new Cloud(svgNS)
      clouds.push(cloud)
      cloudCanvas.appendChild(cloud.element)
    }
  }

  function animateClouds() {
    clouds.forEach(cloud => cloud.update())
    requestAnimationFrame(animateClouds)
  }

  function resizeHandler() {
    const cloudCanvas = cloudCanvasRef.current
    if (!cloudCanvas) return

    cloudCanvas.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`)
    clouds.forEach(cloud => {
      cloud.x = Math.random() * window.innerWidth
      cloud.y = Math.random() * window.innerHeight
    })
  }

  useEffect(() => {
    initClouds()
    animateClouds()
    window.addEventListener('resize', resizeHandler)
    resizeHandler()

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  return (
    <svg
      ref={cloudCanvasRef}
      id="cloudCanvas"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  )
}

export default Clouds
