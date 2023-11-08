'use client'
import React from 'react'

const PinCode = () => {
  return (
    <div className="max-w-xs flex items-center justify-between px-4 py-1 m-4 ring-1 ring-gray-200 rounded-md  ">
    <input
      type="number"
      className="w-full outline-none"
    //   value={
    //     pinInput > 999999 ? pinInput.toString().slice(0, 5) : pinInput
    //   }
    //   onChange={(e) => setPinInput(e.target.value)}
    //   placeholder={pinCode}
    />
    <button
    //   onClick={fetchPin}
      className="text-Secondary  p-2  rounded-lg"
    >
      Apply
    </button>
  </div>
  )
}

export default PinCode