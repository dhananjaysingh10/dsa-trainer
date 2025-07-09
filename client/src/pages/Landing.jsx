import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-300 via-yellow-100 to-white flex flex-col items-center justify-center px-4">
      {/* Header */}
      <header className="w-full max-w-4xl text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Welcome to <span className="text-amber-600">Contestify</span>
        </h1>
        <p className="text-lg text-gray-700">
          Compete with friends, sharpen your algorithmic skills, and climb the leaderboard!
        </p>
      </header>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-12">
        <Card>
          <CardContent className="flex flex-col items-center py-8">
            <img src="/images/room.svg" alt="Create Room" className="w-16 h-16 mb-4"/>
            <h2 className="text-xl font-semibold mb-2">Create or Join a Room</h2>
            <p className="text-gray-600 text-center">Start a contest or join your friends to solve problems together in real-time.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center py-8">
            <img src="/images/leaderboard.svg" alt="Leaderboard" className="w-16 h-16 mb-4"/>
            <h2 className="text-xl font-semibold mb-2">Live Leaderboard</h2>
            <p className="text-gray-600 text-center">Track your progress and see how you rank among your peers instantly.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center py-8">
            <img src="/images/stats.svg" alt="Stats" className="w-16 h-16 mb-4"/>
            <h2 className="text-xl font-semibold mb-2">Detailed Stats</h2>
            <p className="text-gray-600 text-center">Analyze your strengths, weaknesses, and growth over time with beautiful stats.</p>
          </CardContent>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="w-full max-w-md flex flex-col items-center bg-white/80 rounded-xl shadow-lg p-8 mb-12">
        <h3 className="text-2xl font-bold mb-4">Ready to Compete?</h3>
        <p className="text-gray-700 mb-6 text-center">
          Sign up or log in to join the next contest and challenge your friends!
        </p>
        <div className="flex gap-4 w-full">
          <Button className="w-1/2 bg-amber-500 hover:bg-amber-600 text-white text-lg font-semibold">Login</Button>
          <Button className="w-1/2 bg-white border border-amber-500 text-amber-600 hover:bg-amber-100 text-lg font-semibold">Sign Up</Button>
        </div>
      </section>

      {/* Sample Leaderboard Preview */}
      <section className="w-full max-w-2xl bg-white/90 rounded-xl shadow p-6">
        <h4 className="text-xl font-bold mb-4 text-amber-700">Leaderboard Preview</h4>
        <div className="flex flex-col gap-3">
          {[{name:'Alice',score:1200},{name:'Bob',score:1100},{name:'Charlie',score:950}].map((user, i) => (
            <div key={user.name} className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={`/images/user${i+1}.png`} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <span className="font-semibold">{user.name}</span>
              <span className="ml-auto text-amber-600 font-bold">{user.score} pts</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
