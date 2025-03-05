import React from "react";
import { Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedFarm } from "../features/farms/farmSlice";

const { Option } = Select;

const FarmDropdown = () => {
  const dispatch = useDispatch();
  const { farms, selectedFarm } = useSelector((state) => state.farm);

  const handleChange = (farmId) => {
    const farm = farms.find((f) => f.id === farmId);
    dispatch(setSelectedFarm(farm));
  };
console.log(farms)
  return (
    <Select
      placeholder="Selecciona una granja"
      onChange={handleChange}
      value={selectedFarm ? selectedFarm.id : undefined}
      // style={{ width: 300 }}
    >
      {farms.map((farm) => (
        <Option key={farm.id} value={farm.id}>
          Granja {farm.name}, code: {farm.invitation_code}
        </Option>
      ))}
    </Select>
  );
};

export default FarmDropdown;
