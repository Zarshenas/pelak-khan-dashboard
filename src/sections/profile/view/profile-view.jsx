
import { Box, Button, InputLabel, TextField } from "@mui/material"
import Typography from "@mui/material/Typography"
import { useFormik } from "formik"

import toast, { Toaster } from "react-hot-toast"
import { DashboardContent } from "src/layouts/dashboard"
import { useEffect, useState } from "react"
import { changePasswordSchema } from "../../../utils/form-schemas"
import { changeUserPassword, userProfile } from "../../../api/Users"

// ----------------------------------------------------------------------

export function ProfileView() {
  const [user, setUser] = useState({});
  useEffect(()=>{
    const getUserProfile = async ()=>{
      console.log("object");
      try {
        const response = await userProfile();
        console.log(response);
        if (response.status === 200) {
          setUser(response.data)
        }
      } catch (error) {
        if (error.response && error.response.data) {
            toast.error(error.response.data.detail)
      }
    }
  }
  getUserProfile()
},[])
  const formik = useFormik({
      initialValues: {
        oldPassword:'',
        newPassword: '',
        confirmPassword: '',
      },
      validationSchema: changePasswordSchema,
      onSubmit: async (values , { setErrors, setSubmitting }) => {
        try {
          console.log(values);
          const response = await changeUserPassword({
            old_password:values.oldPassword,
            new_password:values.newPassword,
            retype_new_password:values.confirmPassword,

          });
          if (response.status === 200) {
            toast.success("رمز عبور با موفقیت تغییر یافت")
          }
        }catch (error) {
          if (error.response && error.response.data) {
            toast.error(error.response.data.detail)
            setErrors(error.response.data)
          }else{
              formik.setStatus('مشکلی پیش آمده لطفا دوباره تلاش کنید');
            }
          }finally {
          setSubmitting(false);
        }
        }
      })
  return (
    <DashboardContent>
      <Typography variant="h4"  sx={{ mb: 5 }}>
        پروفایل
      </Typography>
      <Box sx={{display:"flex", justifyContent:"space-evenly" , alignContent:"center"}}>
        <Box width="50%">
        <Typography variant="h5" sx={{ mb: 5 }}>
          تغییر رمز عبور
        </Typography>
        <form dir="rtl" onSubmit={formik.handleSubmit}>
          <InputLabel >رمز عبور قدیمی</InputLabel>
        <TextField
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                fullWidth
                name="oldPassword"
                placeholder=" رمز عبور قدیمی"
                dir="rtl"
                sx={{ my: 1}}
                value={formik.values.oldPassword}
              />
           <InputLabel> رمز عبور جدید</InputLabel>
        <TextField
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                helperText={formik.touched.newPassword && formik.errors.newPassword}
                fullWidth
                name="newPassword"
                placeholder="رمز عبور جدید"
                dir="rtl"
                sx={{ my: 1}}
                value={formik.values.password}
              />
          <InputLabel >تایید رمز عبور</InputLabel>

        <TextField
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                fullWidth
                name="confirmPassword"
                placeholder="تایید رمز عبور"
                dir="rtl"
                sx={{ my: 1}}
                value={formik.values.confirmPassword}
              />
              <Button type="submit" sx={{backgroundColor:"#1877f2", color:"white"}}>ثبت</Button>
        </form>
        </Box>
        <Box>
          <Typography variant="body1" color="initial">
            نام :{user.first_name?user.first_name:" "}
          </Typography>
          <Typography variant="body1" color="initial">
            نام خانوادگی:{user.last_name?user.last_name:" "}
          </Typography>
          <Typography variant="body1" color="initial">
            نقش   :  {user.role?user.role:"  "}
          </Typography>
          <Typography variant="body1" color="initial">
            نام کاربری  :  {user.username?user.username:" "}
          </Typography>
        </Box>
      </Box>
      <Toaster/>


    </DashboardContent>
  )
}
