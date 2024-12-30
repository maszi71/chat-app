import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  MessageSquare,
  Mail,
  Lock,
  EyeOff,
  Eye,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";





const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const { login, isLogginingIng } = useAuthStore();

    const validateForm = () => {
      if (formData.email === '') return toast.error("Email is required");
      if(!/^\S+@\S+\.\S+$/.test(formData.email)) return toast.error("Invalid Email format");
      if (formData.password === '') return toast.error("Password is required");
      return true
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const isValidate = validateForm(formData)
      if(isValidate === true) login(formData)
      
     // const isValidate = validateForm(formData)
    //  if(isValidate === true) signup(formData)
    };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
    {/* left side */}
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
            <p className="text-base-content/60">
              Sign in to your account
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full pl-10"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "password" : "text"}
                placeholder="*******"
                className="input input-bordered w-full pl-10"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-base-content/40" />
                ) : (
                  <Eye className="w-5 h-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>
          <button className="btn btn-primary w-full" disabled={isLogginingIng}>
            {isLogginingIng ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <div className="text-center">
          <p className="text-base-content/60">
            Already have an account ?{" "}
            <Link to="/signup" className="link link-primary">
             Don&apos;t have an account
            </Link>
          </p>
        </div>
      </div>
    </div>
    {/* right side */}
    <AuthImagePattern
      title="Join our community"
      subtitle="Connect with friends , share moments , and stay in touch with your loved ones"
    />
  </div>
  )
}

export default Login
