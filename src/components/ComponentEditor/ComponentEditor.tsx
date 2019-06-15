import React, { useState } from 'react'
import CSSEditor from './CSSEditor'
import Flex from '../Flex'

const ComponentEditor = () => {
  const [componentStyle, setComponentStyle] = useState({})

  return (
    <Flex center flex={1} height="100vh" overflow="scroll">
      <CSSEditor
        onChange={nextStyle => setComponentStyle({ ...componentStyle, ...nextStyle })
        }
      />
      <Flex mergeStyleProps={false} {...componentStyle} />
    </Flex>
  )
}

export default ComponentEditor
