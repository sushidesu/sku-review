import React, { useCallback, useState } from "react"
import { readSheet } from "./utils"
import { COLUMNS } from "../constants"
import { ReviewResult } from "./ReviewResult"
import { FileInput } from "./FileInput"

export default () => {
  const [result, setResult] = useState<number | null>(null)

  const submit = useCallback(async (files: File[]) => {
    const file = files[0]
    if (file) {
      const sheet = await readSheet(file)
      const sku = sheet
        .filter(row => !isNaN(row[COLUMNS.STOCK]) && row[COLUMNS.STOCK] > 0)
        .length
      setResult(sku)
    }

  }, [setResult])

  return (
    <div>
      <h1>sku-review</h1>

      <ReviewResult sku={result} />

      <FileInput
        accept=".xls"
        onDrop={submit}
      />
    </div>
  )
}
