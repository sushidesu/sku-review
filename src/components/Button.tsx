import React from "react"
import styled from "@emotion/styled"
import { COLOR } from "../constants"

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">

type ButtonConfig = {
  icon?: React.ReactElement
  variant?: "text" | "outlined"
}

export const Button: React.FC<ButtonProps & ButtonConfig> = ({ children, icon, ...rest }) => (
  <StyledButton {...rest}>
    {icon ? <Icon>{icon}</Icon> : null}
    <span>{children}</span>
  </StyledButton>
)

const StyledButton = styled.button`
  background-color: transparent;
  ${(props: ButtonConfig) => props.variant === "outlined"
    ? `
      border: 1.4px solid ${COLOR.gray.default};
      &:hover {
        border: 1.4px solid ${COLOR.gray.dark};
      }
    `
    : `
      border: none;
      &:hover {
        background-color: #efefef;
      }
    `
  }
  color: ${COLOR.gray.contrast};
  padding: 12px 16px;
  font-size: 16px;
  line-height: 16px;
  cursor: pointer;
  border-radius: 6px;
  outline: none;

  &:active {
    position: relative;
    top: 1.2px;
  }
`

const Icon = styled.span`
  font-size: 0.9em;
  margin-right: 0.4em;
`
