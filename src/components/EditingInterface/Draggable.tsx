import React, { useState } from 'react'
import View from '../View'

interface DraggableProps {
  children?: React.ReactNode
}

const Draggable = ({ children }: DraggableProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  return (
    <View
      style={{
        pointerEvents: 'all',
        background: 'white',
        position: 'absolute',
      }}
      inlineStyle={{ top: `${position.y}px`, left: `${position.x}px` }}
    >
      <View
        style={{
          width: '100%',
          height: '20px',
          background: 'rgb(240,240,240)',
        }}
        onMouseMove={({ clientX, clientY }: any) => {
          if (isDragging) {
            setPosition({
              x: clientX - 8,
              y: clientY - 8,
            })
          }
        }}
        onMouseDown={() => {
          setIsDragging(true)
        }}
        onMouseUp={() => {
          setIsDragging(false)
        }}
        onMouseOut={() => {
          setIsDragging(false)
        }}
      >
        Title
      </View>
      {children}
    </View>
  )
}

export default Draggable
