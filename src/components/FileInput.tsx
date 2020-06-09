import React from "react"
import styled from "styled-components"
import Dropzone, { DropzoneProps } from "react-dropzone"

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

const DropzoneRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  max-width: 330px;
  min-height: 120px;
  border: 2px dashed #bdbdbd;
  border-radius: 10px;
  background-color: #fafafa;
  cursor: pointer;
  outline: none;
`
