import React, { Fragment, RefForwardingComponent, ReactNode } from 'react'
import styled from 'styled-components'
import Expandable, { ExpandableProps } from '../Expandable'
import Flex from '../Flex'
import { COLORS } from '../constants';

export interface MenuItemProps {
  title: string
  children: ExpandableProps['children'] | ReactNode
}

const MenuItem = ({ title, children }: MenuItemProps) => {
  return <Expandable closedHeight={48}>{expandable => (
          <Fragment>
    <Title as="h3" height="48px" flex={1} justify="between" align="center" onClick={expandable.toggleIsOpen}>{title}</Title>
      {typeof children === 'function' ? children(expandable) : children}
</Fragment>
  )}
  </Expandable>
}

export default MenuItem

const Title = styled(Flex)`
  cursor: pointer;
  color: ${COLORS.white};

`