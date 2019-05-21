import React, { useState } from 'react'
import View from '../View'

// TODO: WHY IS POSITION BEING RESET ON SECOND DRAG?

interface DraggableProps {
  children?: React.ReactNode
  title: string
}

const Draggable = ({ children, title }: DraggableProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [lastPosition, setLastPosition] = useState(position)
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
        onMouseMove={({ clientX: x, clientY: y }: any) => {
          if (isDragging) {
            setPosition({
              x: x - lastPosition.x,
              y: y - lastPosition.y,
            })
          }
        }}
        onMouseDown={({ clientX: x, clientY: y }: any) => {
          setLastPosition({ x, y })
          setIsDragging(true)
        }}
        onMouseOut={({ clientX: x, clientY: y }: any) => {
          setIsDragging(false)
        }}
        onMouseUp={({ clientX: x, clientY: y }: any) => {
          setIsDragging(false)
        }}
      >
        {title}
      </View>
      {children}
    </View>
  )
}

export default Draggable
