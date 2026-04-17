import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BarChart2, Users, Target, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-indigo-500/30 overflow-hidden relative font-sans">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[140px] rounded-full mix-blend-screen" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-violet-600/10 blur-[140px] rounded-full mix-blend-screen" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] bg-blue-600/10 blur-[140px] rounded-full mix-blend-screen" />
      </div>

      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-[#0f172a] fixed top-0 left-0 w-full z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-full shadow-[0_20px_80px_rgba(56,189,248,0.18)] bg-slate-950/90 border border-white/10">
              <Image
                src="/image/astuLogo.png"
                alt="PerformCore logo"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#overview" className="hover:text-white transition-colors">Overview</Link>
            <Link href="/report" className="hover:text-white transition-colors">Reports</Link>
            <Link href="/employee/profile" className="hover:text-white transition-colors">Profile</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/login"
              className="hidden sm:inline-flex items-center px-5 py-2 text-sm font-semibold bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-full shadow-[0_20px_60px_rgba(56,189,248,0.24)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-[0_40px_120px_rgba(15,23,42,0.4)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.25),transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),transparent_20%)]" />
            <div className="relative text-center">
              <p className="mx-auto inline-flex items-center gap-3 rounded-full bg-slate-900/90 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-300 shadow-[0_10px_30px_rgba(14,165,233,0.14)]">
                Modern employee evaluations
              </p>
              <h1 className="mt-10 text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                Elevate your team&apos;s <br className="hidden md:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-violet-400 to-indigo-400">
                  true potential
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-base md:text-xl text-slate-300 leading-relaxed">
                A modern performance platform built for clear feedback, faster goals, and smarter growth conversations. Designed to look stunning and feel intuitive for every team.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/auth/login"
                  className="group inline-flex items-center justify-center rounded-full bg-sky-500 px-9 py-4 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(56,189,248,0.25)] transition duration-300 hover:bg-sky-400"
                >
                  Get started
                  <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-white/5 px-9 py-4 text-sm font-semibold text-slate-100 transition duration-300 hover:border-slate-500 hover:bg-white/10"
                >
                  Learn more
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3 text-left">
                {[
                  { label: 'Faster reviews', value: '3x quicker process' },
                  { label: 'Smart goals', value: 'Aligned with outcomes' },
                  { label: 'Team clarity', value: 'Feedback everyone trusts' }
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400 mb-3">{item.label}</p>
                    <p className="text-lg font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section id="overview" className="mt-20 rounded-[2rem] border border-white/10 bg-slate-950/75 p-10 shadow-[0_30px_80px_rgba(15,23,42,0.4)] backdrop-blur-xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-300">Why PerformCore</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">A smarter way to manage performance and keep every team aligned.</h2>
              <p className="max-w-xl text-slate-400 leading-relaxed">From self-review flows to peer feedback and executive dashboards, PerformCore makes every evaluation easy to complete and simple to understand.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'High visibility', desc: 'Real-time progress for goals, reviews, and feedback in one place.' },
                { title: 'Clear scoring', desc: 'Intuitive evaluation metrics that every user can follow with confidence.' },
                { title: 'Flexible workflows', desc: 'Support for self, peer, and manager reviews without friction.' },
                { title: 'Instant insights', desc: 'Actionable summaries and export-ready data for faster decisions.' }
              ].map((item) => (
                <div key={item.title} className="rounded-3xl bg-slate-900/80 border border-white/10 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">{item.title}</p>
                  <p className="text-base text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 text-left animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          {[
            {
              icon: Target,
              title: "Goal Alignment",
              desc: "Ensure every team member's objectives seamlessly align perfectly with broader company milestones.",
              color: "text-blue-400",
              bg: "bg-blue-500/10",
              border: "group-hover:border-blue-500/30"
            },
            {
              icon: Users,
              title: "360° Feedback",
              desc: "Foster a culture of continuous growth with peer evaluations, self-reviews, and comprehensive assessments.",
              color: "text-indigo-400",
              bg: "bg-indigo-500/10",
              border: "group-hover:border-indigo-500/30"
            },
            {
              icon: ShieldCheck,
              title: "Unbiased Analytics",
              desc: "Leverage intelligent insights to identify top performers and areas for improvement objectively.",
              color: "text-violet-400",
              bg: "bg-violet-500/10",
              border: "group-hover:border-violet-500/30"
            }
          ].map((feature, idx) => (
            <div key={idx} className={`p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] transition-all duration-300 relative group overflow-hidden hover:-translate-y-1 ${feature.border}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/[0.03] to-transparent rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-500"></div>
              <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
        
        {/* Decorative Bottom Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      </main>
    </div>
  );
}
