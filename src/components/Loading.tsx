import React, { ComponentClass } from "react"
import { SyncLoader } from "react-spinners"
import { COLOR } from "../constants"

type LengthType = number | string;

type Props = {
  color?: string
  size?: LengthType
  margin?: LengthType
}
type Override = ComponentClass<Props, any>

const FixedSyncLoader = SyncLoader as Override

export const Loading = () => (
  <FixedSyncLoader
    color={COLOR.primary.default}
    size={20}
    margin={4}
  />
)
