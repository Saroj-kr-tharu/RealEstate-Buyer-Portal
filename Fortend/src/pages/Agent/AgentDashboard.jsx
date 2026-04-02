import { useEffect, useState } from "react";
import { FiDollarSign, FiFileText, FiHome, FiImage, FiMapPin, FiSearch, FiTag, FiX } from "react-icons/fi";
import {
  HiOutlineCash,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineHeart,
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "../../components/itemCard/ItemCard";
import Layout from "../../layout/Layout";
import { PropertyCreate, PropertyDeleteByAgent, PropertyGetAllByAgent, PropertyUpdateByAgent } from "../../redux/Slices/propertySlice";

const INITIAL_FORM = {
  title: "",
  description: "",
  price: "",
  location: "",
  imageUrl: "",
};

function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [updateForm, setUpdateForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [updateErrors, setUpdateErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [updateSubmitting, setUpdateSubmitting] = useState(false);

  const dispatch = useDispatch();
  const propertiesList = useSelector((state) => state.property.AgentPropertyList);

  useEffect(() => {
    dispatch(PropertyGetAllByAgent());
  }, []);

  useEffect(() => {
    document.body.style.overflow = showModal || showUpdateModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showModal, showUpdateModal]);

  const handleAction = (action, item) => {
    switch (action) {
      case "view":
        alert(`Viewing: ${item.title}`);
        break;
      case "delete":
        dispatch(PropertyDeleteByAgent(item.id));
        break;
      case "update":
        setSelectedProperty(item);
        setUpdateForm({
          title: item.title || "",
          description: item.description || "",
          price: item.price !== undefined ? String(item.price) : "",
          location: item.location || "",
          imageUrl: item.imageUrl || "",
        });
        setUpdateErrors({});
        setShowUpdateModal(true);
        break;
    }
  };

  const filtered = propertiesList.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //  create form helpers 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (data) => {
    const newErrors = {};
    if (!data.title.trim())       newErrors.title       = "Title is required.";
    if (!data.description.trim()) newErrors.description = "Description is required.";
    if (!data.price.trim())       newErrors.price       = "Price is required.";
    else if (isNaN(Number(data.price))) newErrors.price = "Price must be a number.";
    if (!data.location.trim())    newErrors.location    = "Location is required.";
    if (!data.imageUrl.trim())    newErrors.imageUrl    = "Image URL is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    try {
      await dispatch(PropertyCreate({ ...form, price: Number(form.price) }));
      dispatch(PropertyGetAllByAgent());
      setForm(INITIAL_FORM);
      setErrors({});
      setShowModal(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setForm(INITIAL_FORM);
    setErrors({});
  };

  //  Update form helpers 
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({ ...prev, [name]: value }));
    if (updateErrors[name]) setUpdateErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(updateForm);
    if (Object.keys(validationErrors).length > 0) {
      setUpdateErrors(validationErrors);
      return;
    }
    setUpdateSubmitting(true);
    try {
      await dispatch(
        PropertyUpdateByAgent({
          id: selectedProperty.id,
          ...updateForm,
          price: Number(updateForm.price),
        })
      );
      dispatch(PropertyGetAllByAgent());
      setUpdateForm(INITIAL_FORM);
      setUpdateErrors({});
      setSelectedProperty(null);
      setShowUpdateModal(false);
    } finally {
      setUpdateSubmitting(false);
    }
  };

  const handleUpdateClose = () => {
    setShowUpdateModal(false);
    setUpdateForm(INITIAL_FORM);
    setUpdateErrors({});
    setSelectedProperty(null);
  };

  // Stats
  const stats = [
    {
      id: 1, label: "Total Listings", value: propertiesList.length,
      change: "+3 this month", changeUp: true,
      icon: HiOutlineOfficeBuilding, color: "text-blue-400",
      bgColor: "bg-blue-500/10", border: "border-blue-500/20",
    },
    {
      id: 2, label: "Active Inquiries", value: "18",
      change: "+5 new today", changeUp: true,
      icon: HiOutlineUserGroup, color: "text-emerald-400",
      bgColor: "bg-emerald-500/10", border: "border-emerald-500/20",
    },
    {
      id: 3, label: "Total Revenue", value: "$142K",
      change: "+12.4% vs last mo.", changeUp: true,
      icon: HiOutlineCash, color: "text-amber-400",
      bgColor: "bg-amber-500/10", border: "border-amber-500/20",
    },
    {
      id: 4, label: "Deals Closed", value: "9",
      change: "2 pending", changeUp: null,
      icon: HiOutlineCheckCircle, color: "text-purple-400",
      bgColor: "bg-purple-500/10", border: "border-purple-500/20",
    },
    {
      id: 5, label: "Avg. Days on Market", value: "21",
      change: "-4 days vs avg.", changeUp: true,
      icon: HiOutlineClock, color: "text-sky-400",
      bgColor: "bg-sky-500/10", border: "border-sky-500/20",
    },
    {
      id: 6, label: "Client Watchlists", value: "37",
      change: "+8 this week", changeUp: true,
      icon: HiOutlineHeart, color: "text-rose-400",
      bgColor: "bg-rose-500/10", border: "border-rose-500/20",
    },
  ];

  // Field config shared for both forms
  const fields = [
    {
      name: "title", label: "Property Title",
      placeholder: "e.g. Modern Downtown Apartment",
      type: "text", icon: FiTag, colSpan: "sm:col-span-2",
    },
    {
      name: "price", label: "Price ($)",
      placeholder: "e.g. 250000",
      type: "number", icon: FiDollarSign, colSpan: "",
    },
    {
      name: "location", label: "Location",
      placeholder: "e.g. New York, NY",
      type: "text", icon: FiMapPin, colSpan: "",
    },
    {
      name: "imageUrl", label: "Image URL",
      placeholder: "https://example.com/image.jpg",
      type: "url", icon: FiImage, colSpan: "sm:col-span-2",
    },
  ];

  // Reusable form fields renderer
  const renderFields = (formData, handleChangeFn, errorsObj) =>
    fields.map(({ name, label, placeholder, type, icon: Icon, colSpan }) => (
      <div key={name} className={colSpan}>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">
          {label}
        </label>
        <div
          className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 bg-[#1e2d4a] transition-colors ${
            errorsObj[name]
              ? "border-rose-500/60"
              : "border-slate-600/50 focus-within:border-blue-500/60"
          }`}
        >
          <Icon className="text-slate-500 shrink-0" size={15} />
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChangeFn}
            placeholder={placeholder}
            className="bg-transparent text-white placeholder-slate-600 text-sm flex-1 outline-none min-w-0"
          />
        </div>
        {errorsObj[name] && (
          <p className="text-rose-400 text-xs mt-1">{errorsObj[name]}</p>
        )}
      </div>
    ));

  return (
    <Layout>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-2">
              Agent Portal
            </p>
            <h1 className="text-3xl font-bold text-white leading-tight">
              Agent Dashboard
            </h1>
            <p className="text-slate-400 mt-1.5 text-sm">
              Manage your listings, track deals, and monitor client activity.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2.5 rounded-xl transition-colors font-medium"
            >
              <HiOutlineOfficeBuilding size={15} />
              Add Listing
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className={`flex flex-col gap-3 rounded-xl border ${s.border} ${s.bgColor} px-4 py-4 hover:scale-[1.02] transition-transform cursor-default`}
              >
                <div className={`flex items-center justify-center w-9 h-9 rounded-lg ${s.bgColor} border ${s.border}`}>
                  <Icon className={`${s.color} text-lg`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white leading-none">{s.value}</p>
                  <p className="text-slate-400 text-xs mt-1">{s.label}</p>
                  {s.change && (
                    <p className={`text-xs mt-1 font-medium ${
                      s.changeUp === true  ? "text-emerald-400"
                      : s.changeUp === false ? "text-rose-400"
                      : "text-slate-500"
                    }`}>
                      {s.change}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-slate-700/50" />
      </div>

      {/* Listings Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex items-center gap-3 bg-[#1e2d4a] border border-slate-600/50 rounded-xl px-4 py-3 flex-1 shadow-lg max-w-lg">
            <FiSearch className="text-slate-400 shrink-0" size={18} />
            <input
              type="text"
              placeholder="Search by location or property name…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-white placeholder-slate-500 text-sm flex-1 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-slate-500 hover:text-slate-300 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Section heading */}
        <div className="mb-5">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-1">
            My Portfolio
          </p>
          <h2 className="text-xl font-bold text-white">
            Active Listings
            <span className="ml-2 text-sm font-normal text-slate-400">
              ({filtered.length} properties)
            </span>
          </h2>
        </div>

        {/* Cards */}
        <section className="bg-[#1a2336] rounded-2xl border border-slate-700/50 min-h-[50vh]">
          <div className="p-6">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-4">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
                {filtered.map((property) => (
                  <ItemCard key={property.id} item={property} onFn={handleAction} from="agent" />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ── Add Listing Modal ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        >
          <div className="absolute inset-0" onClick={handleClose} />
          <div className="relative w-full max-w-xl bg-[#1a2336] border border-slate-700/60 rounded-2xl shadow-2xl z-10 overflow-hidden">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/50">
              <div>
                <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-0.5">
                  New Property
                </p>
                <h2 className="text-lg font-bold text-white">Add Listing</h2>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <FiX size={16} />
              </button>
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[65vh] overflow-y-auto">
                {renderFields(form, handleChange, errors)}

                {/* Description textarea */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Description
                  </label>
                  <div className={`flex gap-3 rounded-xl border px-3 py-2.5 bg-[#1e2d4a] transition-colors ${
                    errors.description
                      ? "border-rose-500/60"
                      : "border-slate-600/50 focus-within:border-blue-500/60"
                  }`}>
                    <FiFileText className="text-slate-500 shrink-0 mt-0.5" size={15} />
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Describe the property — features, amenities, highlights…"
                      rows={3}
                      className="bg-transparent text-white placeholder-slate-600 text-sm flex-1 outline-none resize-none"
                    />
                  </div>
                  {errors.description && (
                    <p className="text-rose-400 text-xs mt-1">{errors.description}</p>
                  )}
                </div>

                {/* Live image preview */}
                {form.imageUrl && (
                  <div className="sm:col-span-2">
                    <p className="text-xs font-medium text-slate-400 mb-1.5">Image Preview</p>
                    <img
                      src={form.imageUrl}
                      alt="preview"
                      onError={(e) => { e.target.style.display = "none"; }}
                      className="w-full h-36 object-cover rounded-xl border border-slate-700/50"
                    />
                  </div>
                )}
              </div>

              {/* Modal footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-700/50 bg-[#16202f]">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Saving…
                    </>
                  ) : (
                    <>
                      <HiOutlineOfficeBuilding size={15} />
                      Add Listing
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Update Listing Modal ── */}
      {showUpdateModal && selectedProperty && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        >
          <div className="absolute inset-0" onClick={handleUpdateClose} />
          <div className="relative w-full max-w-xl bg-[#1a2336] border border-slate-700/60 rounded-2xl shadow-2xl z-10 overflow-hidden">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/50">
              <div>
                <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-0.5">
                  Edit Property
                </p>
                <h2 className="text-lg font-bold text-white">Update Listing</h2>
                <p className="text-slate-500 text-xs mt-0.5 truncate max-w-xs">
                  ID: {selectedProperty.id}
                </p>
              </div>
              <button
                onClick={handleUpdateClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <FiX size={16} />
              </button>
            </div>

            {/* Form body */}
            <form onSubmit={handleUpdateSubmit} noValidate>
              <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[65vh] overflow-y-auto">
                {renderFields(updateForm, handleUpdateChange, updateErrors)}

                {/* Description textarea */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Description
                  </label>
                  <div className={`flex gap-3 rounded-xl border px-3 py-2.5 bg-[#1e2d4a] transition-colors ${
                    updateErrors.description
                      ? "border-rose-500/60"
                      : "border-slate-600/50 focus-within:border-blue-500/60"
                  }`}>
                    <FiFileText className="text-slate-500 shrink-0 mt-0.5" size={15} />
                    <textarea
                      name="description"
                      value={updateForm.description}
                      onChange={handleUpdateChange}
                      placeholder="Describe the property — features, amenities, highlights…"
                      rows={3}
                      className="bg-transparent text-white placeholder-slate-600 text-sm flex-1 outline-none resize-none"
                    />
                  </div>
                  {updateErrors.description && (
                    <p className="text-rose-400 text-xs mt-1">{updateErrors.description}</p>
                  )}
                </div>

                {/* Live image preview */}
                {updateForm.imageUrl && (
                  <div className="sm:col-span-2">
                    <p className="text-xs font-medium text-slate-400 mb-1.5">Image Preview</p>
                    <img
                      src={updateForm.imageUrl}
                      alt="preview"
                      onError={(e) => { e.target.style.display = "none"; }}
                      className="w-full h-36 object-cover rounded-xl border border-slate-700/50"
                    />
                  </div>
                )}
              </div>

              {/* Modal footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-700/50 bg-[#16202f]">
                <button
                  type="button"
                  onClick={handleUpdateClose}
                  className="px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateSubmitting}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium bg-amber-600 hover:bg-amber-500 text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {updateSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Saving…
                    </>
                  ) : (
                    <>
                      <HiOutlineOfficeBuilding size={15} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Homepage;