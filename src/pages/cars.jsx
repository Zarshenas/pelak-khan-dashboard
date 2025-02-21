import { Helmet } from "react-helmet-async"

import { CONFIG } from "src/config-global"

import CarView from "../sections/cars/view/car-view"

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`ماشین ها - ${CONFIG.appName}`}</title>
      </Helmet>

      <CarView />
    </>
  )
}
