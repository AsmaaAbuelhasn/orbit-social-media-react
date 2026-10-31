
import { useState } from "react";
import { Button, Input, toast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function ChangePassword() {
  const { token } = useContext(AuthContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function changePassword() {
    return axios.patch(
      "https://route-posts.routemisr.com/users/change-password",
      {
        password: currentPassword,
        newPassword: newPassword,
      },
      {
        headers: {
          token,
        },
      }
    );
  }

  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,

    onSuccess: () => {
      toast.success("Password changed successfully!");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },

    onError: (error: any) => {
      toast.danger(
        error.response?.data?.message ||
          "Failed to change password"
      );
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.danger("Please fill in all fields");
      return;
    }

    if (newPassword.length < 8) {
      toast.danger("Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.danger("Passwords do not match");
      return;
    }

    mutate();
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
            <FaLock size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Change Password
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Keep your account secure.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Current Password
            </label>

            <Input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e)=>setCurrentPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              New Password
            </label>

            <Input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
              required
              className="w-full"
            />
            
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Confirm New Password
            </label>

            <Input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="rounded-xl bg-violet-50 p-4 text-sm text-violet-700">
            Your new password should contain at least 8 characters.
          </div>

          <Button
            type="submit"
            className="w-full bg-violet-600 font-semibold text-white hover:bg-violet-700"
            isPending={isPending}
          >
            {isPending ? "Updating..." : "Update Password"}
          </Button>

        </form>
      </div>
    </div>
  );
}
