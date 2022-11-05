import React from "react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../../../assets/images/login/login.svg";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";

const Login = () => {
  const { loginUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    loginUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        const currentUser = {
          email: user.email,
        };
        console.log(currentUser);
        fetch("https://genius-car-server-gules.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            //local storage is the easiest but not the best place to store token
            localStorage.setItem("token", data.token);
            navigate(from, { replace: true });
          });

        //
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="hero my-20">
      <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
        <div className=" text-center lg:text-left">
          <img className="w-3/4" src={login} alt="" />
        </div>
        <form
          onSubmit={handleLogin}
          className="  card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
        >
          <h1 className="text-5xl text-center  font-bold">Login now!</h1>
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
            <p className="mt-3 text-center">
              New to Genius Car ?{" "}
              <Link className="text-orange-600 font-semibold" to="/signup">
                Sign Up
              </Link>{" "}
            </p>
          </div>
          <div></div>
        </form>
      </div>
    </div>
  );
};

export default Login;
