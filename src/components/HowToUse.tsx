/** @jsx jsx */
import { css, jsx } from "@emotion/core"

export const HowToUse = () => (
  <div css={style}>
    <h2>棚卸ファイルのダウンロード方法</h2>
    <ol>
      <li>{"在庫管理システム > マスター管理 > 棚卸管理"}</li>
      <li>{"「店舗」を選択して「ダウンロード」をクリック"}</li>
    </ol>
  </div>
)

const style = css`
  font-size: 16px;
  text-align: center;

  & > h2 {
    margin: 2.4em 0 0.8em 0;
    font-size: 1em;
    color: #4a4a4a;
  }
  & > ol {
    margin: 0;
    padding: 0;
    & > li {
      margin: 0.6em 0 0 0;
      font-size: 0.8em;
      // color: #b5b5b5;
      color: #7a7a7a;
    }
  }
`
