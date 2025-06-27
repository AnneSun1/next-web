"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, MapPin } from "lucide-react"
import Link from "next/link"

export default function Custom404Page() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-8 bottom-8">
          <div className="flex space-x-4">
            <div className="w-16 h-20 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-full opacity-60"></div>
            <div className="w-12 h-16 bg-gradient-to-t from-purple-400 to-purple-300 rounded-t-full opacity-40"></div>
          </div>
        </div>

        <div className="absolute right-8 bottom-8">
          <div className="flex space-x-2">
            <div className="w-12 h-16 bg-gradient-to-t from-purple-400 to-purple-300 rounded-t-full opacity-40"></div>
            <div className="w-16 h-20 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-full opacity-60"></div>
            <div className="w-10 h-14 bg-gradient-to-t from-purple-300 to-purple-200 rounded-t-full opacity-30"></div>
          </div>
        </div>
      </div>

      <div className="text-center z-10 px-8 max-w-2xl mx-auto">
        <div className="text-8xl md:text-9xl font-bold text-white mb-4 tracking-wider">404</div>

        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4 flex items-center justify-center gap-2">
          Oops! Vacation Not Found
          <span className="text-yellow-400">🏖️</span>
        </h1>

        <p className="text-gray-300 text-lg mb-12 max-w-md mx-auto">
          Looks like this vacation destination doesn't exist. Let's get you back to planning your perfect getaway!
        </p>

        {/* Vacation-themed illustration */}
        <div className="mb-12 relative">
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="text-5xl animate-bounce delay-0">🌴</div>
            <div className="text-6xl animate-bounce delay-200">🏨</div>
            <div className="text-5xl animate-bounce delay-400">🌊</div>
          </div>

          <div className="absolute -top-4 left-1/4 text-3xl animate-float">🛫</div>
          <div className="absolute -top-2 right-1/4 text-2xl animate-float delay-1000">🗺️</div>
          <div className="absolute top-8 left-1/6 text-2xl animate-float delay-500">⛱️</div>
          <div className="absolute top-6 right-1/6 text-2xl animate-float delay-1500">🍹</div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="border-purple-400 text-purple-300 hover:bg-purple-500 hover:text-white px-8 py-3 text-lg"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </Button>

          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-3 text-lg">
              <Home className="h-5 w-5 mr-2" />
              Dashboard
            </Button>
          </Link>
        </div>

        <div className="text-gray-400 text-sm">
          <p className="mb-4">Start your vacation planning journey:</p>
          <div className="flex items-center justify-center space-x-4">
            <Link href="/properties" className="text-purple-400 hover:text-purple-300 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              View Properties
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="/reservations" className="text-purple-400 hover:text-purple-300 flex items-center">
              <Home className="h-4 w-4 mr-1" />
              My Reservations
            </Link>
          </div>
        </div>
      </div>

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
