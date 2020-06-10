import React, { useCallback, useState } from "react"
import styled from "@emotion/styled"
import { readSheet } from "./utils"
import { COLUMNS, SIZE } from "../constants"
import { ReviewResult, ReviewResultProps } from "./ReviewResult"
import { FileInput } from "./FileInput"
import { Loading } from "./Loading"
import { Button } from "./Button"
import { FcIdea, FcSynchronize, FcCheckmark } from "react-icons/fc"

type Status = "default" | "loading" | "done"

export default () => {
  const [status, setStatus] = useState<Status>("default")
  const [result, setResult] = useState<ReviewResultProps>({ sku: 1345, totalInventory: 5430, totalCost: 13345600 })
  const [copied, setCopied] = useState(false)

  const submit = useCallback(async (files: File[]) => {
    const file = files[0]
    if (file) {
      setStatus("loading")
      const sheet = await readSheet(file)
      const itemRows = sheet.filter(row => !isNaN(row[COLUMNS.STOCK]) && row[COLUMNS.STOCK] > 0)

      const sku = itemRows.length
      const totalInventory = itemRows.reduce((prev, row) => prev + row[COLUMNS.STOCK], 0)
      const totalCost = itemRows.reduce((prev, row) => prev + row[COLUMNS.PRICE], 0)
      setResult({ sku, totalInventory, totalCost })
      setStatus("done")
    }
  }, [setResult, setStatus])

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(
        `SKU:\t${result.sku?.toLocaleString()}\n`
        + `総在庫数:\t${result.totalInventory?.toLocaleString()} 個\n`
        + `合計金額:\t${result.totalCost?.toLocaleString()} 円`
      )
      setCopied(true)
    } catch (error) {
      window.alert(`コピーに失敗しました。\n${error}`)
    }
  }, [result, setCopied])

  const clear = useCallback(() => {
    setStatus("default")
    setResult({ sku:null, totalInventory: null, totalCost: null })
  }, [setStatus, setResult])

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
          && <FileInput
            accept=".xls"
            onDrop={submit}
          />
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
