import React from "react";
import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { 
  Camera, 
  User, 
  LogOut, 
  Calendar, 
  Shield,
  Leaf,
  ShoppingBasket,
  User2
} from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile, logout } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen pt-20 pb-10 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Profile Header with Glassmorphism */}
          <div className="text-center relative p-8 rounded-3xl bg-white/30 backdrop-blur-lg border border-white/50 shadow-lg transition-all duration-500 hover:bg-white/40 hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-3xl"></div>
            <div className="relative">
              <div className="relative mx-auto size-28 mb-6">
                <div className="size-28 rounded-full overflow-hidden ring-4 ring-white/80 transition-all duration-500 hover:ring-green-200 group">
                  <img
                    src={selectedImg || authUser.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 p-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/25 group/camera"
                >
                  <Camera className="w-5 h-5 transition-transform duration-300 group-hover/camera:rotate-12" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {authUser?.fullName}
              </h1>
              <div className="flex items-center justify-center gap-2 mt-3">
                <div className="p-1.5 rounded-lg bg-green-100/50">
                  <Leaf className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-600 font-medium">{authUser?.role}</span>
              </div>
            </div>
          </div>

          {/* Main Content Grid with Glassmorphism */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Personal Information Section */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-3xl blur-xl transition-all duration-500 group-hover:blur-2xl"></div>
              <div className="relative bg-white/60 backdrop-blur-lg rounded-3xl p-8 border border-white/50 shadow-lg transition-all duration-500 hover:bg-white/70">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-xl bg-green-100/50 transition-all duration-500 group-hover:bg-green-100">
                    <User2 className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
                </div>

                {/* Personal Info Content */}
          <div className="space-y-6">
                  <div className="space-y-2 transition-all duration-300">
                    <label className="text-sm font-medium text-gray-600">Full Name</label>
                    <div className="p-4 rounded-xl bg-white/50 backdrop-blur border border-white/60 transition-all duration-300 hover:bg-white/70 hover:shadow-md transform hover:-translate-y-0.5">
                      {authUser?.fullName}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <div className="p-4 rounded-xl bg-white/50 backdrop-blur border border-white/60 transition-all duration-300 hover:bg-white/70 hover:shadow-md transform hover:-translate-y-0.5">
                      {authUser?.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information Section */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-green-400/10 rounded-3xl blur-xl transition-all duration-500 group-hover:blur-2xl"></div>
              <div className="relative bg-white/60 backdrop-blur-lg rounded-3xl p-8 border border-white/50 shadow-lg transition-all duration-500 hover:bg-white/70">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-xl bg-green-100/50 transition-all duration-500 group-hover:bg-green-100">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Account Information</h2>
                </div>

                {/* Account Info Content */}
                <div className="bg-white/50 backdrop-blur rounded-2xl border border-white/60 p-6 space-y-4 transition-all duration-300">
                  <div className="flex items-center justify-between py-3 border-b border-green-100/50 transition-all duration-300 hover:translate-x-2">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-green-100/50">
                        <Calendar className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-600">Member Since</span>
                    </div>
                    <span className="text-gray-800 font-medium">
                      {new Date(authUser?.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-green-100/50 transition-all duration-300 hover:translate-x-2">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-green-100/50">
                        <Shield className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-600">Account Type</span>
                    </div>
                    <span className="text-gray-800 font-medium capitalize">{authUser?.role}</span>
                  </div>

                  <div className="flex items-center justify-between py-3 transition-all duration-300 hover:translate-x-2">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-green-100/50">
                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-gray-600">Status</span>
                    </div>
                    <span className="text-green-500 font-medium">Active</span>
                  </div>
                </div>

                {/* Activity Stats */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="group/card relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-2xl blur-sm transition-all duration-500 group-hover/card:blur-md"></div>
                    <div className="relative p-6 rounded-2xl bg-white/60 backdrop-blur border border-white/50 text-center transition-all duration-500 hover:bg-white/70 hover:shadow-lg">
                      <div className="size-14 rounded-2xl bg-green-100/50 flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover/card:bg-green-100 group-hover/card:rotate-6">
                        <ShoppingBasket className="w-7 h-7 text-green-600 transition-all duration-500 group-hover/card:scale-110" />
                      </div>
                      <div className="transform transition-all duration-500 group-hover/card:-translate-y-1">
                        <div className="text-3xl font-bold text-gray-800">0</div>
                        <div className="text-sm font-medium text-gray-600 mt-1">Orders</div>
                        <div className="text-xs text-gray-500 mt-1">Total Orders Placed</div>
                      </div>
                    </div>
                  </div>

                  <div className="group/card relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-2xl blur-sm transition-all duration-500 group-hover/card:blur-md"></div>
                    <div className="relative p-6 rounded-2xl bg-white/60 backdrop-blur border border-white/50 text-center transition-all duration-500 hover:bg-white/70 hover:shadow-lg">
                      <div className="size-14 rounded-2xl bg-green-100/50 flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover/card:bg-green-100 group-hover/card:rotate-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-green-600 transition-all duration-500 group-hover/card:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </div>
                      <div className="transform transition-all duration-500 group-hover/card:-translate-y-1">
                        <div className="text-3xl font-bold text-gray-800">0</div>
                        <div className="text-sm font-medium text-gray-600 mt-1">Reviews</div>
                        <div className="text-xs text-gray-500 mt-1">Product Reviews Given</div>
                      </div>
              </div>
            </div>
          </div>

                {/* Logout Button */}
                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleLogout}
                    className="group relative overflow-hidden px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-2">
                      <LogOut className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" />
                      <span>Logout</span>
                    </div>
                  </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Info Fields - Add hover effects */}
      <style jsx>{`
        .info-field {
          transition: all 0.3s ease;
        }
        .info-field:hover {
          transform: translateX(8px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;