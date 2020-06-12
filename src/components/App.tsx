import React, { useCallback, useState } from "react"
import styled from "@emotion/styled"
import { readSheet, sum } from "./utils"
import { COLUMNS, SIZE } from "../constants"
import { ReviewResult, ReviewResultProps } from "./ReviewResult"
import { FileInput } from "./FileInput"
import { Loading } from "./Loading"
import { Button } from "./Button"
import { HowToUse } from "./HowToUse"
import { FcIdea, FcSynchronize, FcCheckmark } from "react-icons/fc"

type Status = "default" | "loading" | "done"

export default () => {
  const [status, setStatus] = useState<Status>("default")
  const [result, setResult] = useState<ReviewResultProps>({ shopName: "Life Lab", sku: 300, totalInventory: 1000, totalCost: 12345 })
  const [copied, setCopied] = useState(false)

  const submit = useCallback(async (files: File[]) => {
    try {
      const file = files[0]
      if (file) {
        setStatus("loading")
        const sheet = await readSheet(file)
        if (sheet[0][0] !== "店舗名") throw Error("対応していないファイルです。")

        const shopNameCell = sheet[0][1]
        const shopName = typeof shopNameCell === "string" ? shopNameCell : null
        const itemRows = sheet.filter(row => {
          const stock = row[COLUMNS.STOCK]
          if (typeof stock === "number") {
            return !isNaN(stock) && stock > 0
          } else {
            return false
          }
        })

        const sku = itemRows.length
        const totalInventory = sum(itemRows, COLUMNS.STOCK)
        const totalCost = sum(itemRows, COLUMNS.PRICE)
        setResult({ sku, totalInventory, totalCost, shopName})
        setStatus("done")
      }
    } catch (error) {
      window.alert(error)
      setStatus("default")
    }
  }, [setResult, setStatus])

  const copy = useCallback(async () => {
    const text = `SKU:\t${result.sku?.toLocaleString()}\n`
      + `在庫数:\t${result.totalInventory?.toLocaleString()} 個\n`
      + `合計金額:\t${result.totalCost?.toLocaleString()} 円`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch (error) {
      window.prompt("「Ctrl+C」を押してコピーできます。", text)
      console.error(error)
    }
  }, [result, setCopied])

  const clear = useCallback(() => {
    setStatus("default")
    setResult({ sku:null, totalInventory: null, totalCost: null, shopName: null })
    setCopied(false)
  }, [setStatus, setResult, setCopied])

  return (
    <Wrapper>
      <h1 className="title">SK∪･ω･∪</h1>

      <div className="container">
        {status === "done"
          && <>
            <ReviewResult
              {...result}
            />
            <Buttons>
              <Button
                icon={<FcSynchronize />}
                onClick={clear}
              >リセット</Button>
              <Button
                variant="outlined"
                icon={copied ? <FcCheckmark /> : <FcIdea />}
                onClick={copy}
              >コピー</Button>
            </Buttons>
          </>
        }

        {status === "loading"
          && <Loading /> 
        }

        {status === "default"
          && <>
            <FileInput
              accept="application/vnd.ms-excel, .xls"
              onDrop={submit}
            />
            <HowToUse />
          </>
        }
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  
  background-color: #fff;
  box-shadow: 3px 6px 10px #d8e7ec;
  width: ${SIZE.width}px;
  min-height: ${SIZE.width * SIZE.ratio}px;
  border-radius: 16px;
  padding: 20px;

  .title {
    font-size: 1.4em;
    margin: 1em 0 0 0;
  }

  .container {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    width: 100%;
    margin-bottom: 0.4em;
  }
`

const Buttons = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin-top: 12px;

  & > button {
    min-width: 120px;
  }
`
