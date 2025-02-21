import { Helmet } from "react-helmet-async"

import { CONFIG } from "src/config-global"

import PermisionView from "../sections/permisions/view/permision-view"

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`مجوز ها - ${CONFIG.appName}`}</title>
      </Helmet>

      <PermisionView />
    </>
  )
}
