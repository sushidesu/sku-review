import React from "react"
import { SyncLoader } from "react-spinners"
import { COLOR } from "../constants"

export const Loading = () => (
  <SyncLoader
    color={COLOR.primary.default}
    size={20}
    margin={4}
  />
)
