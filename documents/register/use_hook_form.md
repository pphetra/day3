# Use react-hook-form library

## install

```
npm install react-hook-form
```

## สร้าง file /pages/register/use_hook_form.js

ืfield ใน form นี้ยังไม่ได้มีการร้อยเข้ากับ state

```
export default function UseHookForm(props) {
  const submit = (e) => {
    e.preventDefault();
    alert(JSON.stringify({}));
  };

  return (
    <form onSubmit={submit}>
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
          />
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
          />
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
          />
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row gap-4">
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

        <button type="submit" className="border bg-blue-400 rounded px-4 py-2">
          Submit
        </button>
      </div>
    </form>
  );
}

```

## สร้าง form state ด้วยคำสั่ง useForm

```
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const submit = (data) => {
    alert(JSON.stringify(data));
  };
```

## เปลี่ยน function submit ให้รับ data ตรงๆจาก form state ผ่าน function handleSubmit

### submit function

```
  const submit = (data) => {
    alert(JSON.stringify(data));
  };
```

### แก้ไข html form onSubmit event โดยเอา handleSubmit มาครอบ submit เดิม

```
<form onSubmit={handleSubmit(submit)}>
```

## ทำการร้อย field username เข้ากับ form state

ืnote: ตัว ...register จะทำการร้อยค่า value, onChange, onBlur ให้เรา

```
          <input
            className="border rounded"
            type="text"
            id="username"
            {...register("username", { required: true })}
          />
```

## ร้อย password field เข้ากับ form state

```
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
        </div>
```

## ร้อย confirm password field เข้ากับ form state

```
        <div className="flex flex-col">
          <label className="text-sm" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="border rounded"
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", { required: true })}
          />
        </div>
```

## ร้อย gender radio group เข้ากับ form state

```
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
                {...register("gender", { required: true })}
              />
              <span className="pl-4">female</span>
            </label>
```

## แสดง error กรณีที่ไม่ผ่าน validation

### username

```
{errors.username && <span className="text-red-500">This field is required</span>}
```

### password

```
{errors.password && <span className="text-red-500">This field is required</span>}
```

### confirm password

```
{errors.confirmPassword && <span className="text-red-500">This field is required</span>}
```

### gender

```
{errors.gender && (
  <span className="text-red-500">This field is required</span>
)}
```

## custom validation สำหรับ confirm password

### ตอน register confirm password จะทำการ set custom validate function

```
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
```
