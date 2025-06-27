"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, Building2, TrendingUp, Calendar, Users } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Illustration and Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Logo */}
        <div className="absolute top-8 left-8 flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white font-bold text-lg">
            N
          </div>
          <span className="text-xl font-bold text-gray-800">Nova Vacations</span>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-32 left-12">
          <Card className="bg-white shadow-lg border-0 w-48">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-xs text-gray-500">New Property</div>
              </div>
              <div className="text-2xl font-bold text-gray-800">24</div>
              <div className="text-xs text-gray-500">Active Listings</div>
            </CardContent>
          </Card>
        </div>

        {/* Central Character Illustration */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            {/* Character placeholder - in a real app, you'd use an actual illustration */}
            <div className="w-64 h-80 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-6xl font-bold opacity-20">
              🏖️
            </div>

            {/* Floating vacation-themed elements */}
            <div className="absolute -top-8 -right-8">
              <Card className="bg-white shadow-lg border-0 w-32">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Calendar className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-gray-600">Bookings</span>
                  </div>
                  <div className="text-lg font-bold text-gray-800">156</div>
                </CardContent>
              </Card>
            </div>

            <div className="absolute -bottom-4 -left-8">
              <Card className="bg-white shadow-lg border-0 w-36">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-gray-600">Revenue</span>
                  </div>
                  <div className="text-lg font-bold text-gray-800">$89.2k</div>
                  <div className="text-xs text-green-500">↗ 12.5%</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="absolute bottom-8 left-12">
          <div className="flex space-x-4">
            <div className="w-16 h-20 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-full opacity-60"></div>
            <div className="w-12 h-16 bg-gradient-to-t from-purple-400 to-purple-300 rounded-t-full opacity-40"></div>
          </div>
        </div>

        <div className="absolute bottom-16 right-16">
          <Card className="bg-white shadow-lg border-0 w-40">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-gray-600">Active Guests</span>
              </div>
              <div className="text-xl font-bold text-gray-800">42</div>
              <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                <div className="bg-blue-500 h-1 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white font-bold text-lg">
              N
            </div>
            <span className="text-xl font-bold text-gray-800">Nova Vacations</span>
          </div>

          {/* Welcome Header */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Nova Vacations! 👋</h1>
            <p className="text-gray-600">Please sign-in to your account and start managing your vacation rentals</p>
          </div>

          {/* Demo Credentials */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-700">
              <strong>Demo:</strong> admin@novavacations.com / Password: admin
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@novavacations.com"
                className="mt-1 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  className="h-12 pr-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-gray-300"
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>
              <Link href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-500 font-medium">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium text-base"
            >
              {isLoading ? "Signing in..." : "Log In"}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              New to our platform?{" "}
              <Link href="/register" className="text-purple-600 hover:text-purple-500 font-medium">
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Buy Now Button (bottom right) */}
        <div className="hidden lg:block absolute bottom-8 right-8">
          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg shadow-lg">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  )
}
