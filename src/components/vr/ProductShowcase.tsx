"use client"

import { useEffect } from 'react'
import * as aframe from 'aframe'
import { Entity, Scene } from 'aframe-react'

interface ProductShowcaseProps {
  productImageUrl: string
  productDescription: string
}

export default function ProductShowcase({
  productImageUrl,
  productDescription,
}: ProductShowcaseProps) {
  useEffect(() => {
    aframe.registerComponent('look-at-camera', {
      update: function () {
        this.el.object3D.lookAt(this.cameraEl.object3D.position)
      },
    })
  }, [])

  return (
    <Scene>
      <a-assets>
        <img id="product-texture" src={productImageUrl} />
      </a-assets>

      <Entity
        geometry={{ primitive: 'box', width: 2, height: 2, depth: 2 }}
        material={{ src: '#product-texture' }}
        position={{ x: 0, y: 1.5, z: -4 }}
        look-at-camera
      />

      <Entity
        text={{
          value: productDescription,
          align: 'center',
          color: '#333',
          wrapCount: 40,
          width: 4,
        }}
        position={{ x: 0, y: 0.5, z: -4 }}
        look-at-camera
      />

      <a-camera position={{ x: 0, y: 1.6, z: 0 }} />
    </Scene>
  )
}