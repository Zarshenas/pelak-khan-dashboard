import * as yup from 'yup';

export const signupSchema = yup.object({
  firstName: yup.string('نام خود را وارد کنید').required('نام الزامی است'),
  lastName: yup.string('نام خانوادگی خود را وارد کنید').required('نام خانوادگی الزامی است'),
  username: yup.string()
  .required('نام کاربری الزامی است') // Username is required
  .matches(/^[a-zA-Z0-9_]+$/, 'نام کاربری فقط می‌تواند شامل حروف، اعداد و (_) باشد') // Only letters, numbers, and underscore
  .min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد') // Minimum length
  .max(20, 'نام کاربری باید کمتر از ۲۰ کاراکتر باشد'), // Maximum length
  email: yup
    .string('ایمیل خود را وارد کنید')
    .required('ایمیل الزامی است') 
    .email('آدرس ایمیل نامعتبر است'),
  password: yup
    .string('رمزعبور را وارد کنید')
    .min(8, 'رمزعبور باید حداقل 8 کاراکتر باشد')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      'رمز عبور باید حداقل شامل یک حرف بزرگ، یک حرف کوچک، یک عدد باشد'
    ) 
    .required('رمزعبور'),
});


export const signinSchema = yup.object({
  username: yup.string()
  .required('نام کاربری الزامی است') // Username is required
  .min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد') // Minimum length
  .max(20, 'نام کاربری باید کمتر از ۲۰ کاراکتر باشد'), // Maximum length
  password: yup
    .string('رمزعبور را وارد کنید')
    .required(' رمزعبور الزامی است'),
});
