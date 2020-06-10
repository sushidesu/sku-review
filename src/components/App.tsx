import React, { useCallback, useState } from "react"
import styled from "@emotion/styled"
import { readSheet } from "./utils"
import { COLUMNS, SIZE } from "../constants"
import { ReviewResult } from "./ReviewResult"
import { FileInput } from "./FileInput"
import { Loading } from "./Loading"

type Status = "default" | "loading" | "done"

export default () => {
  const [status, setStatus] = useState<Status>("default")
  const [result, setResult] = useState<number | null>(null)

  const submit = useCallback(async (files: File[]) => {
    const file = files[0]
    if (file) {
      setStatus("loading")
      const sheet = await readSheet(file)
      const sku = sheet
        .filter(row => !isNaN(row[COLUMNS.STOCK]) && row[COLUMNS.STOCK] > 0)
        .length
      setResult(sku)
      setStatus("done")
    }
  }, [setResult, setStatus])

  const clear = useCallback(() => {
    setStatus("default")
    setResult(null)
  }, [setStatus])

  return (
    <Wrapper>
      <h1 className="title">SK∪･ω･∪</h1>

      <div className="container">
        {status === "done"
          && <>
            <ReviewResult sku={result} />
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
