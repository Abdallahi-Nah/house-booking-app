import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log("form data : ", formData);
  const handleForm = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      setError("");
      setLoading(true);
      const res = await axios.post("/api/auth/signup", formData);
      console.log("res : ", res);
      if (res.status === 201) {
        setLoading(false);
        navigate("/sign-in");
      }
    } catch (error) {
      setLoading(false);
      setError("user already exist");
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg focus:outline-none"
          id="username"
          onChange={(e) => handleForm(e)}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg focus:outline-none"
          id="email"
          onChange={(e) => handleForm(e)}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg focus:outline-none"
          id="password"
          onChange={(e) => handleForm(e)}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 cursor-pointer">
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account ?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error !== "" && <p className="mt-3 text-red-700">{error}</p>}
    </div>
  );
};

export default SignUp;
