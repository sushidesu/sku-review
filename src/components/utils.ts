import XLSX from "xlsx"

const read = (file: File) => {
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)

  return new Promise<string | ArrayBuffer | null>(resolve => {
    reader.onload = e => {
      resolve(e?.target?.result)
    }
  })
}

export const readSheet = async (file: File, index: number = 0) => {
  const buffer = await read(file)

  const workbook = XLSX.read(buffer, {type: 'array'})
  const sheetName = workbook.SheetNames[index]
  const sheet = workbook.Sheets[sheetName]

  return XLSX.utils.sheet_to_json<Array<string | number>>(sheet, {header: 1})
}

export const sum = (array: Array<Array<any>>, index: number) => {
  return array.reduce((prev, row) => {
    const value = row[index]
    if (typeof value === "number") {
      return prev + value
    } else {
      return prev
    }
  }, 0)
}
