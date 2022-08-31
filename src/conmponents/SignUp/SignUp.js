import Input from "../../common/Input";
import { useFormik } from "formik";
import * as yup from "yup";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { signupUser } from "../../Services/SignupServices";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth, useAuthActions } from "../../providers/AuthProvider";
import { useQuery } from "../../HOOKS/UseQuery";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
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

  password: yup.string().required("Password is required"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //   "8 Char, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special"
  // ),

  passwordConfirm: yup
    .string()
    .required("Password Confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignupForm = ({ history }) => {
  const setAuth = useAuthActions();
  const auth = useAuth();
  const query = useQuery();
  const redirect = query.get("redirect") || "/";
  const [error, setError] = useState(null);
  useEffect(() => {
    if (auth) history.push(redirect);
  }, [redirect.userData]);

  const onSubmit = async (values) => {
    const { name, email, phoneNumber, password } = values;
    // console.log(values);
    const userData = {
      name,
      email,
      phoneNumber,
      password,
    };
    try {
      const { data } = await signupUser(userData);
      setAuth(data);
      // localStorage.setItem("authState", JSON.stringify(data));
      setError(null);
      history.push("/");
      console.log(data);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

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
          {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}
          <Link to={`/login?redirect=${redirect}`}>
            <p className="signupStatus">already Login?</p>
          </Link>
        </form>
      </section>
    </div>
  );
};

export default withRouter(SignupForm);
