import { useState } from "react"

import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import LoadingButton from "@mui/lab/LoadingButton"
import InputAdornment from "@mui/material/InputAdornment"

import { useRouter } from "src/routes/hooks"

import { Iconify } from "src/components/iconify/iconify"
import { useFormik } from "formik"
import { signinSchema } from "src/utils/form-schemas"
import  { Toaster } from "react-hot-toast"
import { useAuth } from "src/context/AuthContext"


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter()
 const {  loginUn  } = useAuth();
  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: signinSchema,
    onSubmit: async (values , { setErrors, setSubmitting }) => {
      try {
        loginUn(values)
      }catch (error) {
        if (error.response && error.response.data) {
          setErrors(error.response.data)
        }else{
            formik.setStatus('مشکلی پیش آمده لطفا دوباره تلاش کنید');
          }
        }finally {
        setSubmitting(false);
      }
      }
        
        
    })

  const renderForm = (
    <form dir="rtl" onSubmit={formik.handleSubmit}>
     <TextField
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
               error={formik.touched.username && Boolean(formik.errors.username)}
               helperText={formik.touched.username && formik.errors.username}
             fullWidth
             name="username"
             placeholder="نام کاربری"
             dir="rtl"
             sx={{ mb: 1}}
             value={formik.values.username}
           />
      

      <TextField
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        fullWidth
        name="password"
        placeholder="رمزعبور"
        dir="rtl"
        InputLabelProps={{ shrink: true }}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                <Iconify
                  icon={
                    showPassword ? "solar:eye-bold" : "solar:eye-closed-bold"
                  }
        value={formik.values.password}
                />
              </IconButton>
            </InputAdornment>
          )
        }}
        sx={{ mb: 1}}
      />
{/* <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        رمز عبور خود را فراموش کرده اید؟
      </Link> */}
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        disabled={!formik.isValid}
      >
        ورود
      </LoadingButton>
    </form>
  )

  return (
    <>
      <Box
        gap={1.5}
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ mb: 5 }}
      >
        <Toaster/>
        <Typography variant="h5">ورود</Typography>
        <Typography variant="body2" color="text.secondary">
              حساب کاربری ندارید؟
          <Link href="sign-up" variant="subtitle2" sx={{ mr: 0.5 }}>
               ثبت نام     
          </Link>
        </Typography>
      </Box>

      {renderForm}

      
    </>
  )
}
