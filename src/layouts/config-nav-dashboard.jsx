// import { Label } from "src/components/label/label"
import { SvgColor } from "src/components/svg-color/svg-color"
import DirectionsCarTwoToneIcon from '@mui/icons-material/DirectionsCarTwoTone';
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
    title: "پروفایل",
    path: "/dashboard/profile",
    icon: icon("ic-user")
  },
  {
    title: "کاربران",
    path: "/dashboard/users",
    icon: icon("ic-user")
  },
  {
    title: "پلاک",
    path: "/dashboard/plate",
    icon: icon("ic-blog")
  },
  {
    title: "ماشین ها",
    path: "/dashboard/cars",
    icon: <DirectionsCarTwoToneIcon/>
  },
  {
    title: "مجوز ها",
    path: "/dashboard/permisions",
    icon: icon("ic-disabled")
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
