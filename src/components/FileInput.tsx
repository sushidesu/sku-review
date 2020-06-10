import React from "react"
import styled from "@emotion/styled"
import Dropzone, { DropzoneProps } from "react-dropzone"
import { SIZE } from "../constants"

type FileInputProps = DropzoneProps

export const FileInput: React.FC<FileInputProps> = (props) =>  (
  <Dropzone {...props}>
    {({ getRootProps, getInputProps }) => (
      <DropzoneRoot {...getRootProps()}>
        <input {...getInputProps()} />
        <p>ファイルを選択またはドラッグ</p>
      </DropzoneRoot>
    )}
  </Dropzone>
)

const WIDTH = SIZE.width - SIZE.margin.big

const DropzoneRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: ${WIDTH}px;
  min-height: ${WIDTH / SIZE.ratio}px;
  border: 2px dashed #bdbdbd;
  border-radius: 10px;
  background-color: #fafafa;
  cursor: pointer;
  outline: none;
`
