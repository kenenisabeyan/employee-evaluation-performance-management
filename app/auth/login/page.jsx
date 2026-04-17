'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ArrowRight, ChevronLeft } from 'lucide-react'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [selectedPortal, setSelectedPortal] = useState(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      if (session.user.role === 'admin') {
        router.push('/admin/dashboard')
      } else if (session.user.role === 'team-leader') {
        router.push('/team-leader/dashboard')
      } else if (session.user.role === 'employee') {
        router.push('/employee/employee-dashboard')
      }
    }
  }, [session, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPending(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email: form.email,
        password: form.password,
        role: selectedPortal,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else if (result?.ok) {
        console.log('Login successful')
      }
    } catch (error) {
      setError('An error occurred during login')
      console.error('Login error:', error)
    } finally {
      setPending(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[url('/image/astuget1.jpg')] bg-cover bg-center bg-no-repeat">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-0" />
      
      {/* Main Content - Centered */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <Card className="w-full max-w-md p-6 sm:p-8 shadow-xl backdrop-blur-md bg-white/95 rounded-xl border border-gray-200">
          <CardHeader className="space-y-4 pb-6 border-b border-gray-100 mb-6">
            <div className="flex flex-col items-center justify-center space-y-3">
              <Image
                src="/image/astuLogo.png"
                alt="ASTU Logo"
                width={70}
                height={70}
                className="rounded-full shadow-md"
              />
              <h1 className="text-xl font-bold text-gray-800 text-center uppercase tracking-wide">
                ASTU Staff Performance Evaluator
              </h1>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {!selectedPortal ? (
              <div className="space-y-6 pt-2 pb-2">
                <div className="text-left space-y-1.5 mb-6">
                  <h2 className="text-[26px] font-bold text-[#0f172a] tracking-tight">Welcome Back</h2>
                  <p className="text-[#64748b] text-[15px]">Select your portal to securely access the system.</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedPortal('admin')}
                    className="w-full flex items-center justify-between p-4 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-gray-100 rounded-xl transition-all hover:shadow-sm text-left group"
                  >
                    <span className="font-semibold text-gray-800">Admin Portal</span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                  </button>

                  <button
                    onClick={() => setSelectedPortal('employee')}
                    className="w-full flex items-center justify-between p-4 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-gray-100 rounded-xl transition-all hover:shadow-sm text-left group"
                  >
                    <span className="font-semibold text-gray-800">Employee Portal</span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <button 
                  onClick={() => setSelectedPortal(null)}
                  className="mb-6 flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back to portals
                </button>
                
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm mb-4">
                    {error}
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="relative">
                    <Input
                      type="email"
                      name="email"
                      disabled={pending}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder=" "
                      className="peer h-12 px-5 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-full transition-all"
                      required
                    />
                    <label className="absolute left-4 -top-2.5 bg-white px-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-indigo-600 peer-focus:text-sm">
                      Email
                    </label>
                  </div>

                  <div className="relative">
                    <Input
                      type="password"
                      name="password"
                      disabled={pending}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder=" "
                      className="peer h-12 px-5 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-full transition-all"
                      required
                    />
                    <label className="absolute left-4 -top-2.5 bg-white px-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-indigo-600 peer-focus:text-sm">
                      Password
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={pending}
                    className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-colors shadow-md"
                  >
                    {pending ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </span>
                    ) : `Login to ${selectedPortal === 'admin' ? 'Admin' : 'Employee'} Portal`}
                  </Button>
                </form>

                <Separator className="my-5" />
                
                <div className="text-center">
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}