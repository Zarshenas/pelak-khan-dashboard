import { Helmet } from "react-helmet-async"

import { CONFIG } from "src/config-global"

import { ProfileView } from "../sections/profile/view/profile-view"

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`پروفایل - ${CONFIG.appName}`}</title>
      </Helmet>

      <ProfileView />
    </>
  )
}
