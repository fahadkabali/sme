"use client"
import React from 'react';
import { useEffect } from 'react'
import * as aframe from 'aframe';
import { Entity, Scene } from 'aframe-react';

// Reusable Product Model Component
const ProductModel = ({ productImageUrl }) => {
  return (
    <Entity
      geometry={{ primitive: 'box', width: 2, height: 2, depth: 2 }}
      material={{ src: `#product-texture-${productImageUrl}` }}
      position={{ x: 0, y: 1.5, z: -4 }}
      look-at-camera
    />
  );
};

// Reusable Product Description Component
const ProductDescription = ({ productDescription }) => {
  return (
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
  );
};

export default function ProductShowcase({ productImageUrl, productDescription }) {
  // Register the look-at-camera component once on component mount
  useEffect(() => {
    aframe.registerComponent('look-at-camera', {
      update: function () {
        this.el.object3D.lookAt(this.cameraEl.object3D.position);
      },
    });
  }, []);

  return (
    <Scene>
      <a-assets>
        <img id={`product-texture-${productImageUrl}`} src={productImageUrl} />
      </a-assets>

      <ProductModel productImageUrl={productImageUrl} />
      <ProductDescription productDescription={productDescription} />

      <a-camera position={{ x: 0, y: 1.6, z: 0 }} />
    </Scene>
  );
}