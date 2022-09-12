# หน้าจอลงทะเบียน โดยใช้ React อย่างเดียว (ไม่ใช้ library)

## create file /pages/registers/pure_react.js

```
import React from "react";

export default function PureReact() {
  const submit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gray-50 h-screen flex flex-col items-center gap-4">
      <h2 className="mx-auto">Register Form</h2>
      <form onSubmit={submit}>
        <button type="submit" className="border bg-blue-400 rounded px-4 py-2">
          Submit
        </button>
      </form>
    </div>
  );
}

```

## field username

```
      <div className="flex flex-col">
        <label className="text-sm">Username</label>
        <input
          className="border rounded"
          type="text"
          name="username"
          id="username"
        />
      </div>
```

## สร้าง state สำหรับเก็บ form data

ค่า params ที่ส่งให้ useState คือ initial value ของ state

```
  const [state, setState] = useState({
    username: "",
  });
```

## ร้อย field username เข้ากับ state

### before

```
      <div className="flex flex-col">
        <label className="text-sm">Username</label>
        <input
          className="border rounded"
          type="text"
          name="username"
          id="username"
        />
      </div>
```

### after

```
      <div className="flex flex-col">
        <label className="text-sm" htmlFor="username">Username</label>
        <input
          className="border rounded"
          type="text"
          name="username"
          id="username"
          value={state.username}
          onChange={(e) => setState({ ...state, username: e.target.value })}
        />
      </div>
```

### แก้ไข submit function เพื่อดูผลลัพท์

```
  const submit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(state));
  };
```

## เพิ่ม field password

```
      <div className="flex flex-col">
        <label className="text-sm" htmlFor="password">Password</label>
        <input
          className="border rounded"
          type="password"
          name="password"
          id="password"
          value={state.password}
          onChange={(e) => setState({ ...state, password: e.target.value })}
        />
      </div>
```

## เพิ่ม field confirm password

```
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
          onChange={(e) =>
            setState({ ...state, confirmPassword: e.target.value })
          }
        />
      </div>
```

## สร้าง state สำหรับเก็บผลลัพท์การ Validate

```
  const [errors, setErrors] = useState({});
```

## สร้าง function validate

```
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

    if (!isValid) {
      setErrors(errors);
    }

    return isValid;
  };

```

## เจาะช่องแสดง error หลัง input ทุกอัน

### username

```
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
          onChange={(e) => setState({ ...state, username: e.target.value })}
        />
        {errors.username && (
          <div className="text-red-500">{errors.username}</div>
        )}
      </div>
```

### password

```
        {errors.password && (
          <div className="text-red-500">{errors.password}</div>
        )}
```

### confirm password

```
        {errors.confirmPassword && (
          <div className="text-red-500">{errors.confirmPassword}</div>
        )}
```

## clear message ที่แสดง error เมื่อ user ทำการเปลี่ยนแปลงค่าใน field

การ clear ค่าทำโดยการ set errors state ที่ key ที่มีชื่อตรงกับ fieldname ให้เป็นค่าว่าง หรือ undefined

### username field

#### เปลี่ยนจาก

```
          onChange={(e) => setState({ ...state, username: e.target.value })}
```

#### เป็น

```
          onChange={(e) => {
            setState({ ...state, username: e.target.value });
            setErrors({ ...errors, username: "" });
          }}
```

### password field

```
          onChange={(e) => {
            setState({ ...state, password: e.target.value });
            setErrors({ ...errors, password: "" });
          }}
```

### confirm password field

```
          onChange={(e) => {
            setState({ ...state, confirmPassword: e.target.value });
            setErrors({ ...errors, confirmPassword: "" });
          }}
```

## เพิ่ม field gender

```
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
```

### อย่าลืมแก้ validation function เพิ่มการตรวจสอบ gender ด้วย

```
    if (!state.gender) {
      errors.gender = "Gender is required";
      isValid = false;
    }
```
