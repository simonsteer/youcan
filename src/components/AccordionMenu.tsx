import React, { Fragment, cloneElement, ReactElement } from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import Expandable, { ExpandableProps, ExpandableRenderProps } from './Expandable';
import Flex from './Flex';
import { COLORS } from './constants';

export interface AccordionMenuProps {
  children: React.ReactNode
  title: string
  onOpen?: ExpandableProps['onOpen']
  onClose?: ExpandableProps['onClose']
  onChangeContentHeight?: ExpandableProps['onChangeContentHeight']
}

const AccordionMenu = ({ children, title, onChangeContentHeight = () => {}, onOpen = () => {}, onClose = () => {} }: AccordionMenuProps) => {
  const transformedChildren = ({ setContentHeight, contentHeight }: ExpandableRenderProps) =>
    React.Children.map(children, child => {
      const type: string | 'AccordionMenu' = get(child, 'type.name') || get(child, 'type')
      return type === 'AccordionMenu'
        ? cloneElement(child as ReactElement<AccordionMenuProps>, {
            onOpen: (diff: number) => setContentHeight(contentHeight + diff),
            onClose: (diff: number) => setContentHeight(contentHeight + diff),
            onChangeContentHeight: (diff: number) => setContentHeight(contentHeight + diff),
          })
        : child
    })

  return <Expandable closedHeight={48} onChangeContentHeight={onChangeContentHeight} onOpen={onOpen} onClose={onClose}>
    {expandable => (
      <Fragment>
        <Title
          as="h3"
          height="48px"
          flex={1}
          justify="between"
          align="center"
          onClick={expandable.toggleIsOpen}
        >
          {title}
        </Title>
        {transformedChildren(expandable)}
      </Fragment>
    )}
  </Expandable>
}

export default AccordionMenu

const Title = styled(Flex)`
  cursor: pointer;
  color: ${COLORS.white};
`
