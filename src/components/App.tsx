import React, { useCallback, useState } from "react"
import { readSheet } from "./utils"
import { COLUMNS } from "../constants"
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
    <div>
      <h1>sku-review</h1>

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
  )
}
