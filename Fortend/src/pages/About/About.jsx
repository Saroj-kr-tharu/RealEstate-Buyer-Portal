import { useEffect, useRef } from "react";
import {
  HiOutlineArrowRight,
  HiOutlineHome,
  HiOutlineShieldCheck,
  HiOutlineUsers,
  HiStar
} from "react-icons/hi2";
import Layout from "../../layout/Layout";

const stats = [
  { value: "12K+", label: "Properties Listed" },
  { value: "8.4K", label: "Happy Families" },
  { value: "320+", label: "Expert Agents" },
  { value: "15yr", label: "Market Experience" },
];

const values = [
  {
    icon: <HiOutlineHome className="w-6 h-6" />,
    title: "Find Your Dream Home",
    desc: "We match buyers with properties that truly fit their lifestyle, not just their budget.",
  },
  {
    icon: <HiOutlineUsers className="w-6 h-6" />,
    title: "Trusted Agents Network",
    desc: "320+ verified agents with deep local knowledge ready to guide every step.",
  },
  {
    icon: <HiOutlineShieldCheck className="w-6 h-6" />,
    title: "Secure Transactions",
    desc: "Every deal is backed by verified listings, legal reviews, and transparent pricing.",
  },
];

function Homepage() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-7");
          }
        });
      },
      { threshold: 0.12 }
    );

    const els = sectionRef.current?.querySelectorAll("[data-reveal]");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-serif-display { font-family: 'DM Serif Display', serif; }
        .font-sans-dm { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <Layout>
        <div className=" text-slate-200 min-h-screen font-sans-dm overflow-hidden" ref={sectionRef}>
          
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-5 py-24 grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col space-y-6">
              <div data-reveal className="opacity-0 translate-y-7 transition-all duration-700 ease-out">
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-blue-500 mb-4">
                  About NestFind
                </p>
                <h1 className="font-serif-display text-5xl md:text-6xl leading-[1.1] text-slate-100 mb-6">
                  Where Every Search<br />Leads to a <span className="italic text-blue-300">Home</span>
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed max-w-lg mb-8">
                  NestFind is Nepal's premier real estate platform — built to connect buyers, renters, and sellers with verified listings, trusted agents, and the tools to make confident decisions.
                </p>
              </div>

              <div data-reveal className="opacity-0 translate-y-7 transition-all duration-700 ease-out delay-100 flex flex-wrap gap-4">
                <a href="#explore" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:-translate-y-0.5 flex items-center gap-2 text-sm">
                  Explore Properties <HiOutlineArrowRight />
                </a>
                <a href="#agents" className="border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200 px-6 py-3 rounded-lg font-medium transition-all hover:-translate-y-0.5 text-sm">
                  Meet Our Agents
                </a>
              </div>
            </div>

            <div data-reveal className="opacity-0 translate-y-7 transition-all duration-700 ease-out delay-200 relative rounded-[20px] overflow-hidden group">
              <div className="absolute inset-0 border border-blue-500/20 rounded-[20px] z-10 pointer-events-none"></div>
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                alt="Modern Home"
                className="w-full h-[440px] object-cover rounded-[20px]"
              />
              <div className="absolute bottom-5 left-5 bg-slate-900/85 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center gap-3 z-20">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <div className="text-xs text-slate-200 leading-tight">
                  <strong className="text-slate-100 font-semibold text-sm">12,000+ listings</strong><br />
                  Updated daily across Nepal
                </div>
              </div>
            </div>
          </section>

          {/* Stats Bar */}
          <section className="bg-slate-900/50 border-y border-slate-800 py-10 px-5">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  data-reveal
                  className={`opacity-0 translate-y-7 transition-all duration-700 ease-out bg-[#0d1117] border border-slate-800 rounded-2xl p-6 text-center hover:border-slate-700 transition-colors`}
                  style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                >
                  <div className="font-serif-display text-4xl text-blue-500 mb-1">{s.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Values Section */}
          <section className="max-w-7xl mx-auto px-5 py-24">
            <div className="text-center mb-16" data-reveal className="opacity-0 translate-y-7 transition-all duration-700 ease-out">
              <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-blue-500 mb-3">Our Values</p>
              <h2 className="font-serif-display text-4xl text-slate-100 mb-4">What Sets Us Apart</h2>
              <div className="w-10 h-0.5 bg-blue-600 mx-auto" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  data-reveal
                  className="opacity-0 translate-y-7 transition-all duration-700 ease-out bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-blue-600 transition-all hover:-translate-y-1 group"
                  style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-blue-600/10 border border-blue-600/25 rounded-xl flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {v.icon}
                  </div>
                  <h3 className="text-slate-100 font-bold mb-3">{v.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Mission Section */}
          <section className="bg-slate-900/50 border-t border-slate-800 py-24 px-5">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
              <div data-reveal className="opacity-0 translate-y-7 transition-all duration-700 ease-out rounded-3xl overflow-hidden border border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                  alt="Our Mission"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div data-reveal className="opacity-0 translate-y-7 transition-all duration-700 ease-out delay-150">
                <span className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/25 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-400 mb-6">
                  <HiStar className="text-blue-500" /> Our Mission
                </span>
                <h2 className="font-serif-display text-4xl text-slate-100 leading-tight mb-6">
                  Building Stronger Communities Through <span className="italic text-blue-300">Smart Living</span>
                </h2>
                <div className="space-y-4 text-slate-400 leading-relaxed mb-8">
                  <p>
                    We believe home-finding should be empowering — not overwhelming. NestFind was founded to bring transparency and trust to Nepal's real estate market, giving every family an equal shot at a place they can truly call home.
                  </p>
                  <p>
                    Through technology and community, we're reshaping how people discover, evaluate, and secure properties across the country.
                  </p>
                </div>
                <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-lg font-medium transition-all inline-flex items-center gap-2 group">
                  Get In Touch 
                  <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}

export default Homepage;