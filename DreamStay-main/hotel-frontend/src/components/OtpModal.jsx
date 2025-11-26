import { useState } from "react";

export default function OtpModal({ email, code, onClose, onVerify }) {
  const [input, setInput] = useState("");
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-2xl w-[420px] shadow-xl text-center">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">
          OTP sent to {email}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          (Demo OTP: <span className="text-indigo-500 font-semibold">{code}</span>)
        </p>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter 6-digit code"
          className="w-full border p-3 rounded-lg mb-4 text-center"
        />
        <div className="flex gap-3">
          <button
            onClick={() => onVerify(input)}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Verify
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
