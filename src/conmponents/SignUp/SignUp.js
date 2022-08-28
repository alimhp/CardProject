import Input from "../../common/Input";
import { useFormik } from "formik";
import * as yup from "yup";
import "./SignUp.css";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
};

const onSubmit = (values) => {
  console.log(values);
  // axios
  //   .post("http://localhost:3001/users", values)
  //   .then((res) => console.log(res.data))
  //   .catch((err) => console.log(err))
};

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(6, "Name lenght is not valid"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required "),

  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[0-9]{11}$/, "Invalid Phone Number"),

  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "8 Char, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special"
    ),

  passwordConfirm: yup
    .string()
    .required("Password Confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignupForm = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="formContainer">
      <section className="submitSection">
        <form onSubmit={formik.handleSubmit} className="submitForm">
          <Input formik={formik} name="name" label="Name" />
          <Input formik={formik} name="email" label="Email" type="email" />
          <Input
            formik={formik}
            name="phoneNumber"
            label="Phone Number"
            type="tel"
          />
          <Input
            formik={formik}
            name="password"
            label="Password"
            type="password"
          />
          <Input
            formik={formik}
            name="passwordConfirm"
            label="Password Confirmation"
            type="password"
          />
          <button
            type="submit"
            disabled={!formik.isValid}
            className="submitBtn"
          >
            submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default SignupForm;