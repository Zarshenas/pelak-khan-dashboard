import { useState  } from "react"

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
import { signupSchema } from "src/utils/form-schemas"
import { register } from "src/api/Auth"
import toast, { Toaster } from "react-hot-toast"


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ----------------------------------------------------------------------

export function SignUpView() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)

//   const handleSignIn = useCallback(() => {
//     router.replace("/")
//   }, [router])


  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values , { setErrors, setSubmitting }) => {
      try {
        const response = await register({
          first_name:values.firstName,
          last_name:values.lastName,
          username:values.username,
          email:values.email,
          password:values.password
        })
        if (response.status === 201) {
            toast.success("حساب کاربری شما با موفقیت ساخته شد")
            await sleep(500);
            router.replace("/")
          }
      } catch (error) {
        if (error.response && error.response.data) {
          setErrors(error.response.data)
        }else{
            formik.setStatus('مشکلی پیش آمده لطفا دوباره تلاش کنید');
          }
        }
        finally{
          setSubmitting(false);
        }
      }
        
        
    })

  const renderForm = (
    <form dir="rtl" onSubmit={formik.handleSubmit}>
        <TextField
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        fullWidth
        name="firstName"
        placeholder="نام"
        dir="rtl"
        sx={{ mb: 1}}
        value={formik.values.firstName}
      />
      <TextField
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        fullWidth
        name="lastName"
        placeholder="نام خانوادگی"
        dir="rtl"
        sx={{ mb: 1}}
        value={formik.values.lastName}

      />

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
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        fullWidth
        name="email"
        placeholder="ایمیل"
        dir="rtl"
        sx={{ mb: 1}}
        value={formik.values.email}
      />

      <TextField
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        fullWidth
        name="password"
        placeholder="پسورد"
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
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        disabled={!formik.isValid}
      >
                       ثبت نام  
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
        <Typography variant="h5">ثبت نام</Typography>
        <Typography variant="body2" color="text.secondary">
              حساب کاربری دارید؟
          <Link href="sign-in" variant="subtitle2" sx={{ mr: 0.5 }}>
          ورود
          </Link>
        </Typography>
      </Box>

      {renderForm}

      
    </>
  )
}
