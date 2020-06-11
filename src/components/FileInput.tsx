import React from "react"
import styled from "@emotion/styled"
import { useDropzone, DropzoneOptions } from "react-dropzone"
import { FcFolder } from "react-icons/fc"
import { SIZE, COLOR } from "../constants"

type FileInputProps = DropzoneOptions

export const FileInput: React.FC<FileInputProps> = (props) => {
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  } = useDropzone(props)

  return (
    <DropzoneRoot {...getRootProps({ isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      <FcFolder size={36} />
      <DropzoneText>棚卸ファイルを<br/>選択またはドラッグ</DropzoneText>
    </DropzoneRoot>
  )
}


const WIDTH = SIZE.width - SIZE.margin.big

type Accept = {
  isDragAccept?: boolean
  isDragReject?: boolean
}

const DropzoneText = styled.span`
  display: inline-block;
  margin-top: 0.2em;
  margin-bottom: -0.4em;
  user-select: none;
  text-align: center;
`

const DropzoneRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: ${WIDTH}px;
  min-height: ${WIDTH / SIZE.ratio}px;
  border: 2px dashed ${COLOR.gray.dark};
  border-radius: 10px;
  background-color: #fafafa;
  cursor: pointer;
  outline: none;

  ${(p: Accept) => p.isDragAccept
    ? `
      box-shadow: 0 0 0 0.2em ${COLOR.primary.default};
      border: 1px solid ${COLOR.primary.dark};
    ` : ""
  }

  ${(p: Accept) => p.isDragReject
    ? `
      opacity: 0.3;
    ` : ""
  }
`
