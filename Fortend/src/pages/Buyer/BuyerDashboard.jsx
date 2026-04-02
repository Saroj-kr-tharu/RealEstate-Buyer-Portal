import { useEffect, useState } from "react";
import { FiHome, FiSearch } from "react-icons/fi";
import {
  HiOutlineClipboardList,
  HiOutlineHeart,
  HiOutlineTrendingUp,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "../../components/itemCard/ItemCard";
import Layout from "../../layout/Layout";
import { FavoriteGetAll } from "../../redux/Slices/favoriteSlice";

const stats = [
  {
    id: 1,
    label: "Favorited Items",
    value: "12",
    icon: HiOutlineHeart,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    id: 2,
    label: "Market Interest",
    value: "+5.4%",
    icon: HiOutlineTrendingUp,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    id: 3,
    label: "Recent Inquiries",
    value: "3",
    icon: HiOutlineClipboardList,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
];

function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const propertiesList = useSelector((state) => state.favorite.PropertyList);

  function loadProperty() {
    dispatch(FavoriteGetAll());
  }

  useEffect(() => {
    loadProperty();
  }, []);

  const handleView = (item) => {
    alert(`Viewing: ${item.title}`);
  };

  const filtered = propertiesList.filter(
    (p) =>
      p.Property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.Property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      {/* ── Page Header ── */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-8">
        <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-2">
          Welcome back
        </p>
        <h1 className="text-3xl font-bold text-white leading-tight">
          Buyer Dashboard
        </h1>
        <p className="text-slate-400 mt-1.5 text-sm">
          Track your saved nests and activity.
        </p>
      </div>

      {/* ── Stats Row ── */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className={`flex items-center gap-4 rounded-xl border ${s.border} ${s.bgColor} px-5 py-4`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-lg ${s.bgColor} border ${s.border}`}
                >
                  <Icon className={`${s.color} text-xl`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white leading-none">
                    {s.value}
                  </p>
                  <p className="text-slate-400 text-xs mt-1">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-slate-700/50" />
      </div>

      {/* ── Search Bar ── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 bg-[#1e2d4a] border border-slate-600/50 rounded-xl px-4 py-3 max-w-lg shadow-lg">
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

      {/* ── Listings Grid ── */}
      <section className="bg-[#1a2336] min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Section heading */}
          <div className="mb-8">
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-1">
              Browse Listings
            </p>
            <h2 className="text-2xl font-bold text-white">
              Featured Properties
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-500 gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
                <FiHome size={28} />
              </div>
              <p className="text-base text-slate-400">No properties found.</p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-blue-400 text-sm hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((property) => (
                <ItemCard
                  key={property.id}
                  item={property.Property}
                  onFn={handleView}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Homepage;