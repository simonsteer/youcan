import React, { useState } from 'react'
import View from './View'
import Flex from './Flex'
import Text from './Text'

interface TabContainerProps {
  tabs: { label: string; component: React.ReactNode }[]
}

const TabContainer = ({ tabs }: TabContainerProps) => {
  const [currentTab, setCurrentTab] = useState(tabs[0])

  return (
    <View style={{ width: '100%' }}>
      <Flex style={{ width: '100%' }}>
        {tabs.map(tab => (
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: '11px',
              padding: '10px 0px',
              backgroundColor:
                tab.label === currentTab.label ? 'grey' : 'white',
            }}
            onClick={() => {
              setCurrentTab(tab)
              console.log('clicked')
            }}
          >
            {tab.label}
          </Text>
        ))}
      </Flex>
      {currentTab.component}
    </View>
  )
}

export default TabContainer
