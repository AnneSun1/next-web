"use client"

import { Button } from "@/components/ui/button"
import { Home, Search, MapPin, Compass } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Left side decorative elements */}
        <div className="absolute left-8 bottom-8">
          <div className="flex space-x-4">
            <div className="w-16 h-20 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-full opacity-60"></div>
            <div className="w-12 h-16 bg-gradient-to-t from-purple-400 to-purple-300 rounded-t-full opacity-40"></div>
          </div>
        </div>

        {/* Right side decorative elements */}
        <div className="absolute right-8 bottom-8">
          <div className="flex space-x-2">
            <div className="w-12 h-16 bg-gradient-to-t from-purple-400 to-purple-300 rounded-t-full opacity-40"></div>
            <div className="w-16 h-20 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-full opacity-60"></div>
            <div className="w-10 h-14 bg-gradient-to-t from-purple-300 to-purple-200 rounded-t-full opacity-30"></div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-purple-400 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-purple-300 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-purple-500 rounded-full opacity-60 animate-pulse delay-500"></div>
      </div>

      <div className="text-center z-10 px-8 max-w-2xl mx-auto">
        {/* 404 Large Text */}
        <div className="text-8xl md:text-9xl font-bold text-white mb-4 tracking-wider">404</div>

        {/* Page Not Found Heading */}
        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4 flex items-center justify-center gap-2">
          Page Not Found
          <span className="text-yellow-400">⚠️</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg mb-12 max-w-md mx-auto">
          We couldn't find the page you are looking for. It might have been moved or doesn't exist.
        </p>

        {/* Vacation-themed illustration replacement */}
        <div className="mb-12 relative">
          {/* Central vacation-themed icon cluster */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            {/* Beach/vacation icons */}
            <div className="text-6xl animate-bounce delay-0">🏖️</div>
            <div className="text-7xl animate-bounce delay-200">🏝️</div>
            <div className="text-6xl animate-bounce delay-400">🌴</div>
          </div>

          {/* Floating vacation elements */}
          <div className="absolute -top-4 left-1/4 text-3xl animate-float">✈️</div>
          <div className="absolute -top-2 right-1/4 text-2xl animate-float delay-1000">🧳</div>
          <div className="absolute top-8 left-1/6 text-2xl animate-float delay-500">🌊</div>
          <div className="absolute top-6 right-1/6 text-2xl animate-float delay-1500">☀️</div>

          {/* Nova Vacations logo in the center */}
          <div className="flex items-center justify-center space-x-3 mt-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white font-bold text-xl">
              N
            </div>
            <span className="text-xl font-bold text-white">Nova Vacations</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-3 text-lg">
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </Link>

          <Link href="/properties">
            <Button
              variant="outline"
              className="border-purple-400 text-purple-300 hover:bg-purple-500 hover:text-white px-8 py-3 text-lg bg-transparent"
            >
              <MapPin className="h-5 w-5 mr-2" />
              Browse Properties
            </Button>
          </Link>
        </div>

        {/* Search suggestion */}
        <div className="text-gray-400 text-sm">
          <p className="mb-4">Looking for something specific?</p>
          <div className="flex items-center justify-center space-x-4">
            <Link href="/dashboard" className="text-purple-400 hover:text-purple-300 flex items-center">
              <Compass className="h-4 w-4 mr-1" />
              Dashboard
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="/properties" className="text-purple-400 hover:text-purple-300 flex items-center">
              <Search className="h-4 w-4 mr-1" />
              Properties
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="/reservations" className="text-purple-400 hover:text-purple-300 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              Reservations
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom right action button */}
      <div className="absolute bottom-8 right-8">
        <Link href="/properties">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg shadow-lg">
            Explore Properties
          </Button>
        </Link>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
