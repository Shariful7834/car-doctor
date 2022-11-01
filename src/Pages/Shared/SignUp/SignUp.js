import React, { useContext } from "react";
import { Link } from "react-router-dom";
import login from "../../../assets/images/login/login.svg";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
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
          onSubmit={handleSignUp}
          className="  card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
        >
          <h1 className="text-5xl text-center  font-bold">Sign Up now!</h1>
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your name"
                name="name"
                className="input input-bordered"
                required
              />
            </div>
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
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                value="Sign Up"
              />
            </div>
            <p className="mt-3 text-center">
              Already have an Account?{" "}
              <Link className="text-orange-600 font-semibold" to="/login">
                Sign Up
              </Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
