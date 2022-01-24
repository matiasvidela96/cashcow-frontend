import React, { useCallback, useEffect, useState } from 'react'
import { Flex, Image, Text, Tag } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'

const ImageContainer = styled.div`
  position: relative;
  padding-bottom: 100%;
  height: 0;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  overflow: hidden;
  cursor: pointer;
`

const NftImage = styled.div`
  transition: transform .3s ease,-webkit-transform .3s ease;
  transform-origin: center;
  background-size: auto 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  &:hover{
    transform: scale(1.04);
  }
`
const Divider = styled.div`
    height: 1px;
    min-width: unset;
    background-image: url(../images/line.jpg);
    background-repeat: repeat-x;
    position: relative;
    background-size: contain;
    background-position: 50%;
`

const ItemTitle = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #694f4e;
`

const StakeItem = ({data}) => {
  const TranslateString = useI18n()
  const { isDark } = useTheme()

  const ItemContainer = styled.div`
    min-width: 230px;
    max-width: calc(25% - 30px);
    flex: 1;
    margin: 30px 15px 0;
    border-radius: 16px;
    background: ${!isDark ? 'white' : '#27262c'};
    box-shadow: 0px 2px 12px -8px ${!isDark ? 'rgba(25, 19, 38, 0.7)' : 'rgba(203, 203, 203, 0.7)'}, 0px 1px 1px ${!isDark ? 'rgba(25, 19, 38, 0.05)' : 'rgba(203, 203, 203, 0.05)'};
    position: relative;
  `
  const StakeBtn = styled(Tag)`
    border-color: ${!isDark ? '#fad551' : '#101820'};
    background-color: ${!isDark ? '#fad551' : '#101820'};
    color: ${!isDark ? '#361B72' : 'white'};
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 16px 12px;
    font-size: 18px;
    margin-bottom: 12px;
    border-radius: 12px;
    transition: transform .3s ease,-webkit-transform .3s ease;
    &:hover {
      transform: scale(1.04);
    }
  `

  const UpgradeBtn = styled(Tag)`
    border-color: ${!isDark ? '#fad551' : '#101820'};
    background-color: ${!isDark ? 'rgba(250,213,81,.2)' : 'rgba(16,24,32,.2)'};
    color: ${!isDark ? '#361B72' : 'white'};
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 16px 12px;
    font-size: 18px;
    border-radius: 12px;
    transition: transform .3s ease,-webkit-transform .3s ease;
    &:hover {
      transform: scale(1.04);
    }
  `

  const [nftInfo, setNFTInfo] = useState({tokenName: '', tokenId: '', imgUrl: '', isAIR: false})

  const fetchNft = useCallback(async ()=>{
    if (!data || !data.tokenId)
        return;

    const res = await fetch(data.tokenHash)
    const json = await res.json()

    let imageUrl = json.image;
    if (!data.isAIR) {
        imageUrl = imageUrl.slice(7)
    }

    setNFTInfo({tokenName: json.name, tokenId: data.tokenId, imgUrl: imageUrl, isAIR: data.isAIR});
  }, [data])

  useEffect(() => {
      fetchNft()
  },[fetchNft])

  return (
    <ItemContainer style={{background : isDark ? '#27262c' : ''}}>
      <Flex flexDirection="column">
        <ImageContainer>
          <NftImage style={{backgroundImage: `url(${nftInfo.imgUrl})`}}/>
        </ImageContainer>
        <Divider />
        <Flex flexDirection="column" style={{padding: '24px'}}>
          <Text fontSize="24px" style={{textAlign: 'center'}}>{nftInfo.tokenName}</Text>
          <Text>Position HashRate</Text>
          <Text fontSize="24px" mb="24px">{nftInfo.isAIR ? 10 : 1}</Text>
          <StakeBtn>Stake</StakeBtn>
          <UpgradeBtn>Upgrade HashRate</UpgradeBtn>
        </Flex>
      </Flex>
    </ItemContainer>
  )
}

export default StakeItem