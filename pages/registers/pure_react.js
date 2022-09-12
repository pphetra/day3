import React, { useState } from "react";

export default function PureReact() {
  const [errors, setErrors] = useState({});

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const validate = () => {
    const errors = {};
    const isValid = true;
    if (!state.username) {
      errors.username = "Username is required";
      isValid = false;
    }
    if (!state.password) {
      errors.password = "Password is required";
      isValid = false;
    }
    if (state.password && state.confirmPassword != state.password) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    if (!state.gender) {
      errors.gender = "Gender is required";
      isValid = false;
    }

    if (!isValid) {
      setErrors(errors);
    }

    return isValid;
  };

  const submit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(JSON.stringify(state));
    }
  };

  return (
    <div className="bg-gray-50 h-screen flex flex-col items-center gap-4">
      <h2 className="mx-auto">Register Form</h2>

      <div className="flex flex-col">
        <label className="text-sm" htmlFor="username">
          Username
        </label>
        <input
          className="border rounded"
          type="text"
          name="username"
          id="username"
          value={state.username}
          onChange={(e) => {
            setState({ ...state, username: e.target.value });
            setErrors({ ...errors, username: "" });
          }}
        />
        {errors.username && (
          <div className="text-red-500">{errors.username}</div>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm" htmlFor="password">
          Password
        </label>
        <input
          className="border rounded"
          type="password"
          name="password"
          id="password"
          value={state.password}
          onChange={(e) => {
            setState({ ...state, password: e.target.value });
            setErrors({ ...errors, password: "" });
          }}
        />
        {errors.password && (
          <div className="text-red-500">{errors.password}</div>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          className="border rounded"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={state.confirmPassword}
          onChange={(e) => {
            setState({ ...state, confirmPassword: e.target.value });
            setErrors({ ...errors, confirmPassword: "" });
          }}
        />
        {errors.confirmPassword && (
          <div className="text-red-500">{errors.confirmPassword}</div>
        )}
      </div>

      <div className="flex flex-col">
        <div
          className="flex flex-row gap-4"
          onChange={(e) => {
            setState({ ...state, gender: e.target.value });
            setErrors({ ...errors, gender: "" });
          }}
        >
          <label htmlFor="male">
            <input type="radio" name="gender" id="male" value="male" />
            <span className="pl-4">male</span>
          </label>
          <label htmlFor="female">
            <input type="radio" name="gender" id="female" value="female" />
            <span className="pl-4">female</span>
          </label>
        </div>
      </div>

      <form onSubmit={submit}>
        <button type="submit" className="border bg-blue-400 rounded px-4 py-2">
          Submit
        </button>
      </form>
    </div>
  );
}
