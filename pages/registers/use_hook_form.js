import { useForm } from "react-hook-form";

export default function UseHookForm(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="bg-gray-50 h-screen flex flex-col items-center gap-4">
        <h2 className="mx-auto">Register Form</h2>

        <div className="flex flex-col">
          <label className="text-sm" htmlFor="username">
            Username
          </label>
          <input
            className="border rounded"
            type="text"
            id="username"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm" htmlFor="password">
            Password
          </label>
          <input
            className="border rounded"
            type="password"
            id="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="border rounded"
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: true,
              validate: (val) => {
                if (watch("password") != val) {
                  return "Your passwords do no match";
                }
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row gap-4">
            <label htmlFor="male">
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                {...register("gender", { required: true })}
              />
              <span className="pl-4">male</span>
            </label>
            <label htmlFor="female">
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                {...register("gender", {
                  required: true,
                })}
              />
              <span className="pl-4">female</span>
            </label>
          </div>
          {errors.gender && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <button type="submit" className="border bg-blue-400 rounded px-4 py-2">
          Submit
        </button>
      </div>
    </form>
  );
}
