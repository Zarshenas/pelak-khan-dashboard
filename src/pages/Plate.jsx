import { Helmet } from "react-helmet-async"

import { CONFIG } from "src/config-global"

import PelakView from "../sections/Pelak/view/plate-view"

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`پلاک - ${CONFIG.appName}`}</title>
      </Helmet>

      <PelakView />
    </>
  )
}
