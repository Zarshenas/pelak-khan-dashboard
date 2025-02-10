// import { Label } from "src/components/label/label"
import { SvgColor } from "src/components/svg-color/svg-color"

// ----------------------------------------------------------------------

const icon = name => (
  <SvgColor
    width="100%"
    height="100%"
    src={`/assets/icons/navbar/${name}.svg`}
  />
)

export const navData = [
  // {
  //   title: "Dashboard",
  //   path: "/",
  //   icon: icon("ic-analytics")
  // },
  {
    title: "کاربران",
    path: "/user",
    icon: icon("ic-user")
  },
  // {
  //   title: "Product",
  //   path: "/products",
  //   icon: icon("ic-cart"),
  //   info: (
  //     <Label color="error" variant="inverted">
  //       +3
  //     </Label>
  //   )
  // },
  // {
  //   title: "Blog",
  //   path: "/blog",
  //   icon: icon("ic-blog")
  // },
  {
    title: "ورود",
    path: "/sign-in",
    icon: icon("ic-lock")
  },
  {
    title: "ثبت نام",
    path: "/sign-up",
    icon: icon("ic-lock")
  }
  // {
  //   title: "Not found",
  //   path: "/404",
  //   icon: icon("ic-disabled")
  // }
]
