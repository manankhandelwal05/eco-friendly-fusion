
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Leaf, Mail, Lock, User, Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { toast } from "sonner";

// Role type definition
type UserRole = "user" | "staff" | "admin";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (email && password) {
        toast.success(`Logged in successfully as ${selectedRole}`);
        
        // Navigate based on role
        if (selectedRole === "user") {
          navigate("/user/dashboard");
        } else if (selectedRole === "staff") {
          navigate("/staff/dashboard");
        } else if (selectedRole === "admin") {
          navigate("/admin/dashboard");
        }
      } else {
        toast.error("Please enter your email and password");
      }
    }, 1500);
  };

  // Role selection cards
  const roleOptions: { id: UserRole; title: string; description: string; icon: React.ReactNode; features: string[] }[] = [
    {
      id: "user",
      title: "User Portal",
      description: "Access your eco-friendly dashboard and track your sustainability metrics",
      icon: <User className="size-5" />,
      features: [
        "Upload waste photos and request pickups",
        "Track eco-points and rewards",
        "View recycling history",
        "Join community events"
      ]
    },
    {
      id: "staff",
      title: "Staff Portal",
      description: "Manage resources and monitor environmental impact metrics",
      icon: <Users className="size-5" />,
      features: [
        "Accept and manage waste pickups",
        "Verify waste collections with OTP",
        "Track daily earnings and collections",
        "Manage pickup schedules"
      ]
    },
    {
      id: "admin",
      title: "Admin Portal",
      description: "Configure system-wide sustainability policies and analyze impact data",
      icon: <ShieldCheck className="size-5" />,
      features: [
        "Manage users and staff accounts",
        "View comprehensive analytics",
        "Configure system settings",
        "Monitor all waste collections"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-emerald-100 bg-cover bg-center" 
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')" }}>
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8 animate-fade-in">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="size-10 rounded-full bg-green-600 text-white grid place-items-center">
              <Leaf className="size-5" />
            </div>
            <span className="font-semibold text-2xl text-green-700">EcoSystem</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2 text-green-800">Sustainable Management System</h1>
          <p className="text-green-700">
            Powering a greener future through efficient resource management
          </p>
        </div>

        <GlassCard className="animate-scale-in bg-white/80 backdrop-blur-sm">
          {!selectedRole ? (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-center mb-4 text-green-700">Select Your Portal</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {roleOptions.map((role) => (
                  <div 
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className="border border-green-200 rounded-lg p-4 cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="size-12 rounded-full bg-green-100 grid place-items-center mb-3 text-green-600">
                        {role.icon}
                      </div>
                      <h3 className="font-medium text-green-700">{role.title}</h3>
                      <p className="text-sm text-green-600 mt-1">{role.description}</p>
                      
                      <div className="mt-4 pt-3 border-t border-green-100 w-full">
                        <p className="text-sm font-medium text-green-700 mb-2">Features:</p>
                        <ul className="text-xs text-left space-y-1.5">
                          {role.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-green-500 mr-1.5">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>For demonstration purposes, you can log in with any email and password.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-green-700">
                  {selectedRole === "user" ? "User Login" : 
                   selectedRole === "staff" ? "Staff Login" : "Admin Login"}
                </h2>
                <button 
                  type="button" 
                  onClick={() => setSelectedRole("")}
                  className="text-sm text-green-600 hover:underline"
                >
                  Change Portal
                </button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-green-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-green-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-green-200 focus-visible:ring-green-500"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-green-700">Password</Label>
                  <Link
                    to="/auth/forgot-password"
                    className="text-sm text-green-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-green-500" />
                  <Input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-green-200 focus-visible:ring-green-500"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-green-500"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    disabled={isLoading}
                  >
                    {isPasswordVisible ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" className="text-green-600 border-green-400 data-[state=checked]:bg-green-600 data-[state=checked]:text-white" />
                <Label htmlFor="remember" className="text-sm font-normal text-green-700">
                  Remember me for 30 days
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>

              <div className="text-center mt-6">
                <p className="text-sm text-green-700">
                  Don't have an account?{" "}
                  <Link
                    to="/auth/register"
                    className="text-green-600 hover:underline font-medium"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default Login;
