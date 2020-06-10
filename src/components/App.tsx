import React, { useCallback, useState } from "react"
import styled from "@emotion/styled"
import { readSheet } from "./utils"
import { COLUMNS, SIZE } from "../constants"
import { ReviewResult, ReviewResultProps } from "./ReviewResult"
import { FileInput } from "./FileInput"
import { Loading } from "./Loading"

type Status = "default" | "loading" | "done"

export default () => {
  const [status, setStatus] = useState<Status>("done")
  const [result, setResult] = useState<ReviewResultProps>({ sku: 1345, totalInventory: 5430, totalCost: 13345600 })

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

  const clear = useCallback(() => {
    setStatus("default")
    setResult({ sku:null, totalInventory: null, totalCost: null })
  }, [setStatus])

  return (
    <Wrapper>
      <h1 className="title">SK∪･ω･∪</h1>

      <div className="container">
        {status === "done"
          && <>
            <ReviewResult
              {...result}
            />
            <button onClick={clear}>clear</button>
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
  width: ${SIZE.width}px;
  min-height: ${SIZE.width * SIZE.ratio}px;
  border-radius: 16px;
  padding: 20px;

  .title {
    font-size: 1.4em;
    margin: 1.4em 0 0 0;
  }

  .container {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.4em;
  }
`
