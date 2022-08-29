import Input from "../../common/Input";
import { useFormik } from "formik";
import * as yup from "yup";
import "./Login.css";
import { Link, withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { loginUser } from "../../Services/LoginService";
import { useAuthActions } from "../../providers/AuthProvider";

const initialValues = {
  email: "",
  password: "",
};

// const onSubmit = (values) => {
//   console.log(values);
//   // axios
//   //   .post("http://localhost:3001/users", values)
//   //   .then((res) => console.log(res.data))
//   //   .catch((err) => console.log(err))
// };

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required "),

  password: yup.string().required("Password is required"),
});

const LoginForm = ({ history }) => {
  const setAuth = useAuthActions();
  const [error, setError] = useState(null);
  const onSubmit = async (values) => {
    console.log(values);
    try {
      const { data } = await loginUser(values);
      setAuth(data);
      localStorage.setItem("authState", JSON.stringify(data));
      setError(null);
      history.push("/");
    } catch (error) {
      if (error.response && error.response.data.message)
        setError(error.response.data.message);
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
      <section className="loginSection">
        <form onSubmit={formik.handleSubmit} className="loginForm">
          <Input formik={formik} name="email" label="Email" type="email" />
          <Input
            formik={formik}
            name="password"
            label="Password"
            type="password"
          />
          <button type="submit" disabled={!formik.isValid} className="loginBtn">
            login
          </button>
          {error && (
            <p style={{ color: "red", fontSize: "13px", padding: "10px" }}>
              {error}
            </p>
          )}
          <Link to="/Signin">
            <p className="signupStatus">Not signup yet ?</p>
          </Link>
        </form>
      </section>
    </div>
  );
};

export default withRouter(LoginForm);
