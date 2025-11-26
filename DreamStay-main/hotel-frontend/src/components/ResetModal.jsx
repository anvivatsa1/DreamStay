import { useState } from "react";

export default function ResetModal({ email, code, onClose, onConfirm }) {
  const [inputCode, setInputCode] = useState("");
  const [newPass, setNewPass] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-2xl w-[420px] shadow-xl text-center">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">
          Reset Password for {email}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          (Demo reset code:{" "}
          <span className="text-indigo-500 font-semibold">{code}</span>)
        </p>
        <input
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          placeholder="Enter reset code"
          className="w-full border p-3 rounded-lg mb-3 text-center"
        />
        <input
          type="password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          placeholder="New password"
          className="w-full border p-3 rounded-lg mb-4 text-center"
        />
        <div className="flex gap-3">
          <button
            onClick={() => onConfirm(inputCode, newPass)}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Confirm
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
