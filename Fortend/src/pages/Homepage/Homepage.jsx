import { useEffect, useState } from "react";
import { FiHome, FiMapPin, FiSearch, FiTrendingUp } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ItemCard from "../../components/itemCard/ItemCard";
import Layout from "../../layout/Layout";
import { AddedToFavorite, RemovedFavorite } from "../../redux/Slices/favoriteSlice";
import { PropertyGetAll } from "../../redux/Slices/propertySlice";
 

import { toast } from "react-hot-toast";

const stats = [
  { icon: <FiHome size={22} />, value: "1,200+", label: "Properties Listed" },
  { icon: <FiMapPin size={22} />, value: "30+", label: "Cities Covered" },
  { icon: <FiTrendingUp size={22} />, value: "98%", label: "Happy Clients" },
];

function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const propertiesList = useSelector((state) => state.property.PropertyList);

  function loadProperty(){
      dispatch(PropertyGetAll()); 
    }

  useEffect( ()=> { loadProperty() }, [] )

  function checkUserLoggedIn() {
    const isLoggedIn = localStorage.getItem("isLoggedIn"); 
    if (!isLoggedIn) {
      toast.error("Please Logined")
      navigate("/login"); 
      return false;
    }
    return true;
  }

  const handleAction = (action, item) => {
    if (!checkUserLoggedIn()) return;
    switch (action) {
      case "view":
        alert(`Viewing: ${item.title}`); break;
      case "like":
        dispatch(AddedToFavorite(item.id));
        break;
      case "dislike":
        dispatch(RemovedFavorite(item.id)); 
        break;
      case "buy":
        alert(`Buying: ${item.title}`); break;
    }
}
  

  const filtered = propertiesList.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      
      <section
        className="relative min-h-[420px] flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a2236 0%, #1e2d4a 60%, #162032 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            <FiMapPin size={12} /> Nepal&apos;s #1 Real Estate Platform
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Find Your Perfect <span className="text-blue-400">Nest</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg mb-10 max-w-xl mx-auto">
            Discover verified properties across Nepal — apartments, villas, commercial spaces and more.
          </p>

          <div className="flex items-center gap-2 bg-[#1e2d4a] border border-slate-600/50 rounded-xl px-4 py-3 max-w-lg mx-auto shadow-lg">
            <FiSearch className="text-slate-400 shrink-0" size={18} />
            <input
              type="text"
              placeholder="Search by location or property name…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-white placeholder-slate-500 text-sm flex-1 outline-none"
            />
            <button className="btn btn-primary btn-sm px-5 rounded-lg text-sm">
              Search
            </button>
          </div>
        </div>
      </section>

      
      <section className="bg-[#161f2e] border-b border-slate-700/50">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-3 gap-4 text-center">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-blue-400">{s.icon}</span>
              <span className="text-2xl font-bold text-white">{s.value}</span>
              <span className="text-slate-400 text-xs">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      
      <section className="bg-[#1a2336] min-h-screen px-6 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-1">
              Browse Listings
            </p>
            <h2 className="text-2xl font-bold text-white">Featured Properties</h2>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-500 gap-3">
              <FiHome size={40} />
              <p className="text-lg">No properties available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((property) => (
                <ItemCard key={property.id} item={property} onFn={handleAction} from="home"/>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Homepage;