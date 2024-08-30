"use client"
import React from 'react';
import { useEffect } from 'react'
import * as aframe from 'aframe';
import { Entity, Scene, DetailedHTMLProps } from 'aframe-react';

interface PositionProps {
  position: { x: number; y: number; z: number; };
}

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
      <a-entity position={{ x: 0, y: 1.6, z: 0 }} />

    </Scene>
  );
}