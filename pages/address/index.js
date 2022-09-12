import { useForm } from "react-hook-form";
import provinces from "/data/provinces.json";
import districts from "/data/districts.json";
import subdistricts from "/data/subdistricts.json";
import { useEffect } from "react";

export default function Address() {
  // useform
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    provinceId: "",
    districtId: "",
    subdistrictId: "",
  });

  const provinceId = watch("provinceId");
  const districtId = watch("districtId");

  useEffect(() => {
    // set districtId to empty string
    setValue("districtId", "");
  }, [provinceId, setValue]);

  useEffect(() => {
    // set subdistrictId to empty string
    setValue("subdistrictId", "");
  }, [districtId, setValue]);

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
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="bg-gray-50 h-screen flex flex-col items-center gap-4">
        <h1>Address</h1>

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

        <button type="submit" className="border bg-blue-400 rounded px-4 py-2">
          Submit
        </button>
      </div>
    </form>
  );
}
