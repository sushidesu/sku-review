import React from "react"
import styled from "@emotion/styled"

export type ReviewResultProps = {
  sku: number | null
  totalInventory: number | null
  totalCost: number | null
}

export const ReviewResult: React.FC<ReviewResultProps> = ({ sku, totalInventory, totalCost }) => (
  <Wrapper>
    <Item>
      <Highlight>{ sku?.toLocaleString() }</Highlight>
      <Description>SKU</Description>
    </Item>
    <Item>
      <Highlight>{ totalInventory?.toLocaleString() }<Unit>個</Unit></Highlight>
      <Description>在庫数</Description>
    </Item>
    <Item>
      <Highlight>{ totalCost?.toLocaleString() }<Unit>円</Unit></Highlight>
      <Description>合計金額</Description>
    </Item>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Item = styled.div`
  margin: 12px 0;
  text-align: center;
  font-size: 14px;
`

const Highlight = styled.p`
  margin: 0 auto;
  font-size: 3.4em;
  line-height: 1.16em;
  letter-spacing: -0.04em;
  font-weight: bold;
  color: #000;
`

const Unit = styled.span`
  line-height: inherit;
  font-size: 0.48em;
  margin-left: 0.3em;
`

const Description = styled.span`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #666;
`
