import React, { useCallback, useRef, useState } from "react"
import { readSheet } from "./Utils"
import { COLUMNS } from "../constants"
import { ReviewResult } from "./ReviewResult"

export default () => {
  const fileInput = useRef<HTMLInputElement>(null)
  const [result, setResult] = useState<number | null>(null)

  const submit = useCallback(async () => {
    const file = fileInput?.current?.files?.item(0)
    if (file) {
      const sheet = await readSheet(file)
      const sku = sheet
        .filter(row => !isNaN(row[COLUMNS.STOCK]) && row[COLUMNS.STOCK] > 0)
        .length
      setResult(sku)
    }

  }, [fileInput, setResult])

  return (
    <div>
      <h1>sku-review</h1>

      <ReviewResult sku={result} />

      <input
        type="file"
        ref={fileInput}
      />
      <button
        onClick={submit}
      >start</button>
    </div>
  )
}
