import React from 'react'
import { Flex, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { getNumberSuffix } from 'utils/formatBalance';

const MyRate = () => {
  const TranslateString = useI18n()
  return (
    <Flex flexDirection="column">
      <Text style={{textAlign: 'left'}}>{TranslateString(10011, 'My Mining HashRate')}</Text>
      <Flex mt="12px">
        <Text color="secondary" fontSize="24px" pr="3px" ml="6px">
          {getNumberSuffix(0, 0)}
        </Text>
      </Flex>
    </Flex>
  )
}

export default MyRate