import React, { useCallback, useRef } from "react"
import { readSheet } from "./Utils"
import { COLUMNS } from "../constants"

export default () => {
  const fileInput = useRef<HTMLInputElement>(null)

  const submit = useCallback(async () => {
    const file = fileInput?.current?.files?.item(0)
    if (file) {
      const sheet = await readSheet(file)
      const sku = sheet
        .filter(row => !isNaN(row[COLUMNS.STOCK]) && row[COLUMNS.STOCK] > 0)
        .length
      console.log(sku)
    }

  }, [])

  return (
    <div>
      <h1>sku-review</h1>
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
