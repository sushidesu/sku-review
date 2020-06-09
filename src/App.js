import React, { useCallback, useRef } from "react"
import { readSheet } from "./components/utils"
import { COLUMNS } from "./constants"

export default () => {
  const fileInput = useRef(null)

  const submit = useCallback(async () => {
    const file = fileInput?.current?.files[0]
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
