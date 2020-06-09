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

  return XLSX.utils.sheet_to_json<[]>(sheet, {header: 1})
}
