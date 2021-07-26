import React from "react";
import "./input.scss";
export function Input({ label,value,disabled,onChange, type, required }) {
  return (
    <div className="oneLineInput">
      <label htmlFor={label} className="h5 text-center">{label} </label>
      <div>
        <input type={type} name={label} onChange={(e)=>{ return onChange && onChange((prev)=>{
          console.log(prev);
          return{
            ...prev,
            [label]:e.target.value,
          }
        })}} value={value} disabled={disabled} required={required} />
      </div>
    </div>
  );
}
