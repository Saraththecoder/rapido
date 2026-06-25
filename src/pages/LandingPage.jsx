import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Car, Utensils, Package, ShieldCheck, MapPin, Clock, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const { currentUser } = useContext(AppContext);
  const navigate = useNavigate();

  const services = [
    {
      title: "Taxi Booking",
      desc: "Fast, reliable rides starting at just ₹25. Bikes, Autos, and Cabs available.",
      icon: Car,
      color: "bg-orange-500",
      link: "/user/taxi",
      btnText: "Book a Ride"
    },
    {
      title: "Food Delivery",
      desc: "Order from top rated restaurants near you and get hot meals in minutes.",
      icon: Utensils,
      color: "bg-orange-500",
      link: "/user/food",
      btnText: "Order Food"
    },
    {
      title: "Parcel Delivery",
      desc: "Send items up to 10kg across the city instantly. Starting from ₹50.",
      icon: Package,
      color: "bg-orange-500",
      link: "/user/parcel",
      btnText: "Send Parcel"
    }
  ];

  const handleServiceClick = (link) => {
    if (!currentUser) {
      navigate('/login');
    } else if (currentUser.role !== 'user') {
      navigate(`/${currentUser.role}/dashboard`);
    } else {
      navigate(link);
    }
  };

  return (
    <div className="flex-1 bg-lightbg font-sans">
      {/* Hero Section */}
      <section className="bg-dark text-white pt-20 pb-24 px-4 relative overflow-hidden">
        {/* Abstract shapes for premium feel */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <span className="bg-primary/20 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            All-In-One On-Demand Platform
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Book rides, order food, send parcels — <span className="text-primary">all in one app</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-medium">
            SwiftGo is your ultimate daily companion. Fast bikes, hot meals, and instant shipping are just a tap away. Safe, reliable, and affordable.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            {currentUser ? (
              <button
                onClick={() => handleServiceClick('/user/dashboard')}
                className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-orange-500/20 transition duration-200 flex items-center justify-center gap-2"
              >
                <span>Go to Dashboard</span>
                <ArrowRight size={18} />
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-orange-500/20 transition duration-200 flex items-center justify-center gap-2"
                >
                  Get Started Now
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/register"
                  className="w-full sm:w-auto border border-gray-700 hover:border-gray-600 hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-2xl transition duration-200"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl border border-gray-100 p-6 flex flex-col justify-between hover:-translate-y-1.5 transition duration-300 group"
              >
                <div className="space-y-4">
                  <div className={`h-14 w-14 rounded-2xl ${service.color} text-white flex items-center justify-center shadow-lg shadow-orange-500/10`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-dark leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-50">
                  <button
                    onClick={() => handleServiceClick(service.link)}
                    className="w-full bg-slate-50 group-hover:bg-primary group-hover:text-white text-dark-light font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 transition duration-300"
                  >
                    <span>{service.btnText}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16 border-t border-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="font-display font-extrabold text-3xl text-dark">
              How SwiftGo Works
            </h2>
            <p className="text-gray-500 text-sm font-medium">
              We make city living simple. Three simple steps to get whatever you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Step 1 */}
            <div className="space-y-4 relative">
              <div className="h-16 w-16 bg-orange-50 text-primary border border-orange-100 rounded-2xl flex items-center justify-center font-display font-black text-2xl mx-auto shadow-sm">
                1
              </div>
              <h4 className="font-bold text-dark text-lg">Select Service</h4>
              <p className="text-gray-500 text-xs leading-relaxed max-w-xs mx-auto">
                Open the app, select whether you need to book a taxi ride, order fresh meals, or courier a parcel.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4 relative">
              <div className="h-16 w-16 bg-orange-50 text-primary border border-orange-100 rounded-2xl flex items-center justify-center font-display font-black text-2xl mx-auto shadow-sm">
                2
              </div>
              <h4 className="font-bold text-dark text-lg">Input Details</h4>
              <p className="text-gray-500 text-xs leading-relaxed max-w-xs mx-auto">
                Choose restaurant dishes, enter parcel weight and drop addresses, or choose ride vehicle types.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4 relative">
              <div className="h-16 w-16 bg-orange-50 text-primary border border-orange-100 rounded-2xl flex items-center justify-center font-display font-black text-2xl mx-auto shadow-sm">
                3
              </div>
              <h4 className="font-bold text-dark text-lg">Track & Relax</h4>
              <p className="text-gray-500 text-xs leading-relaxed max-w-xs mx-auto">
                Our assigned riders instantly execute your request. Track their real-time location via GPS directly in the app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6">
            <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-lg text-xs font-semibold uppercase">
              Safety First
            </span>
            <h3 className="font-display font-bold text-3xl text-dark leading-tight">
              Your safety is our top priority
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Every SwiftGo ride is secured. We perform thorough background checks on all riders, supply helmets, verify vaccine status, and provide live ride tracking and 24/7 SOS assistance.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-emerald-500 shrink-0" size={18} />
                <span className="text-xs font-bold text-dark">Verified Drivers</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-emerald-500 shrink-0" size={18} />
                <span className="text-xs font-bold text-dark">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-emerald-500 shrink-0" size={18} />
                <span className="text-xs font-bold text-dark">GPS Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-emerald-500 shrink-0" size={18} />
                <span className="text-xs font-bold text-dark">Zero Contact Delivery</span>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md">
            <img 
              src="https://images.unsplash.com/photo-1624969862644-791f3dc98927?w=600&auto=format&fit=crop&q=60" 
              alt="Safety Shield" 
              className="rounded-3xl shadow-md border border-gray-100 object-cover w-full h-64 md:h-72"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
