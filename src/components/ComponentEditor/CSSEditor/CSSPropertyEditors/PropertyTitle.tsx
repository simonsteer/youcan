import React from 'react'
import { Paragraph, ParagraphProps } from '../../../Text'
import { COLORS } from '../../../constants'

const PropertyTitle = ({ children }: ParagraphProps) => (
  <Paragraph
    width="100px"
    padding="0 5px 0 0"
    justify="start"
    align="center"
    color={COLORS.white}
  >
    {children}
  </Paragraph>
)

export default PropertyTitle
