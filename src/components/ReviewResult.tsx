import React from "react"

export const ReviewResult: React.FC<{ sku: number | null }> = ({ sku }) => (
  <div>
    sku: {sku}
  </div>
)
