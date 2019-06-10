import React, {
  cloneElement,
  ReactElement,
} from 'react'
import get from 'lodash/get'
import Expandable, {
  ExpandableProps,
  ExpandableRenderProps,
} from './Expandable'

export interface AccordionMenuProps {
  children: React.ReactNode
  title?: ExpandableProps['title']
  onOpen?: ExpandableProps['onOpen']
  onClose?: ExpandableProps['onClose']
  onChangeContentHeight?: ExpandableProps['onChangeContentHeight']
  zIndex?: number
}

const AccordionMenu = ({
  children,
  title,
  onOpen,
  onClose,
  zIndex,
}: AccordionMenuProps) => {
  const transformedChildren = ({
    setContentHeight,
    contentHeight,
  }: ExpandableRenderProps) =>
    React.Children.map(children, child => {
      const type: string | 'AccordionMenu' =
        get(child, 'type.name') || get(child, 'type')
      return type === 'AccordionMenu'
        ? cloneElement(child as ReactElement<AccordionMenuProps>, {
            onOpen: (diff: number) => setContentHeight(contentHeight + diff),
            onClose: (diff: number) => setContentHeight(contentHeight + diff),
          })
        : child
    })

  return (
    <Expandable
      zIndex={zIndex}
      title={title}
      onOpen={onOpen}
      onClose={onClose}
    >
      {transformedChildren}
    </Expandable>
  )
}

export default AccordionMenu
