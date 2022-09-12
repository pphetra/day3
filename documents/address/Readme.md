# ตัวอย่างการทำ dependent drop down จังหวัด อำเภอ ตำบล

## สร้าง file /pages/address/index.js

```
import { useForm } from "react-hook-form";

export default function Address() {
  // useform
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
        <h1>Address</h1>

        <button type="submit" className="border bg-blue-400 rounded px-4 py-2">
          Submit
        </button>
      </div>
    </form>
  );
}
```

## เนื่องจาก file ข้อมูลมีขนาดใหญ่ เราจะทำการ config prettier ให้ ignore การ format file กลุ่มนี้

สร้าง file .prettierignore

```
data/districts.json
data/subdistricts.json
data/provinces.json
```

## สร้าง file เก็บข้อมูลจังหวัด, อำเภอ, ตำบล ไว้ใต้ /data

- [provinces.json](https://raw.githubusercontent.com/Cerberus/Thailand-Address/master/provinces.json)
- [districts.json](https://raw.githubusercontent.com/Cerberus/Thailand-Address/master/districts.json)
- [subdistricts.json](https://raw.githubusercontent.com/Cerberus/Thailand-Address/master/subDistricts.json)

## import เข้ามาใน pages/address/index.js

ืnote: กรณี import file ที่ไม่ใช่ javascript จะต้องระบุนามสกุล

```
import provinces from "/data/provinces.json";
import districts from "/data/districts.json";
import subdistricts from "/data/subdistricts.json";
```

## ทำ select dropdown ของ province

```
        <div className="flex flex-col">
          <label className="text-sm" htmlFor="province">
            จังหวัด
          </label>
          <select id="province" {...register("provinceId")}>
            <option value="">กรุณาระบุ</option>
            {provinces.map((province) => (
              <option key={province.PROVINCE_ID} value={province.PROVINCE_ID}>
                {province.PROVINCE_NAME}
              </option>
            ))}
          </select>
        </div>
```

## ทำ select dropdown ของ district

เนื่องจากค่า districts ที่แสดง ต้องถูก filter ด้วยค่า provinceId ที่ได้เลือกไว้ ดังนั้นจึงต้องทำการ watch ค่า provinceId ด้วยคำสั่ง
ืnote: ค่า watch จะเปลี่ยนไปตามที่ user เลือก

```
const provinceId = watch("provinceId");
```

และทำการ render select district เฉพาะค่าที่ filter ด้วย provinceId ที่ watch อยู่

```
        <div className="flex flex-col">
          <label className="text-sm" htmlFor="district">
            อำเภอ
          </label>
          <select id="district" {...register("districtId")}>
            <option value="">กรุณาระบุ</option>
            {districts
              .filter((district) => district.PROVINCE_ID == provinceId)
              .map((district) => (
                <option key={district.DISTRICT_ID} value={district.DISTRICT_ID}>
                  {district.DISTRICT_NAME}
                </option>
              ))}
          </select>
        </div>
```

ถ้าลองกด submit ดู จะเห็นว่า กรณีที่เลือกอำเภอแล้วทำการเปลี่ยนค่าจังหวัด ค่าอำเภอจะไม่ถูก reset
เราจะใช้ react useEffect เข้ามาติดตามการเปลี่ยนแปลง provinceId และทุกครั้งที่มีการเปลี่ยนแปลง เราจะทำการ set ค่า provinceid ให้เท่ากับ ""

เพิ่ม setValue เข้าไปใน useForm

```
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
```

เนื่องจากการติดตามการเปลี่ยนแปลง ต้องมีการเปรียบเทียบค่า ดังนั้นเราต้องทำการ initialize form value ด้วย

```
const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    provinceId: "",
    districtId: "",
  });

```

สั่ง useEffect เพื่อติดตามการเปลี่ยนแปลงของ provinceId

```
  useEffect(() => {
    // set districtId to empty string
    setValue("districtId", "");
  }, [provinceId, setValue]);
```

## เพิ่ม field ตำบล

```
  ...
  } = useForm({
    provinceId: "",
    districtId: "",
    subdistrictId: "",
  });
  ...

  const districtId = watch("districtId");

  ...

  useEffect(() => {
    // set subdistrictId to empty string
    setValue("subdistrictId", "");
  }, [districtId, setValue]);

  ...

        <div className="flex flex-col">
          <label className="text-sm" htmlFor="subdistrict">
            ตำบล
          </label>
          <select id="subdistrict" {...register("subdistrictId")}>
            <option value="">กรุณาระบุ</option>
            {subdistricts
              .filter((subdistrict) => subdistrict.DISTRICT_ID == districtId)
              .map((subdistrict) => (
                <option
                  key={subdistrict.SUB_DISTRICT_ID}
                  value={subdistrict.SUB_DISTRICT_ID}
                >
                  {subdistrict.SUB_DISTRICT_NAME}
                </option>
              ))}
          </select>
        </div>
```

## แปลงค่า id ให้กลายเป็น code ก่อน submit

เราจะทำขั้นตอนนี้ในจังหวะ submit

```
  const submit = (data) => {
    const province = provinces.filter(
      (p) => p.PROVINCE_ID == data.provinceId
    )[0];
    const district = districts.filter(
      (d) => d.DISTRICT_ID == data.districtId
    )[0];
    const subdistrict = subdistricts.filter(
      (s) => s.SUB_DISTRICT_ID == data.subdistrictId
    )[0];

    alert(
      JSON.stringify({
        provinceCode: province.PROVINCE_CODE,
        districtCode: district.DISTRICT_CODE,
        subdistrictCode: subdistrict.SUB_DISTRICT_CODE,
      })
    );
  };
```
