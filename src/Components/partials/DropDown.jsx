import React from "react";

function DropDown({ func, options, title }) {
  return (
    <div className="w-full sm:w-[200px] my-3">
      <select
        defaultValue="0"
        onChange={func}
        className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-[#7C6CE6] transition-all duration-300"
      >
        <option value="0" disabled>
          {title}
        </option>
        {options.map((o, i) => (
          <option key={i} value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropDown;
