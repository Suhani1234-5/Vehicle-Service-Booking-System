import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllServices } from '../services/api';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getAllServices();
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const features = [
    {
      icon: '📅',
      title: 'Easy Booking',
      description:
        'Schedule your service in just a few clicks. Choose your preferred date and time.',
    },
    {
      icon: '📍',
      title: 'Real-time Tracking',
      description:
        'Track your vehicle service status in real-time with our advanced tracking system.',
    },
    {
      icon: '✅',
      title: 'Quality Assured',
      description:
        'All services are performed by certified technicians with genuine spare parts.',
    },
    {
      icon: '🚗',
      title: 'Multi Vehicle',
      description:
        'Manage multiple vehicles and their service history all in one place.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-24 md:py-36 min-h-[90vh]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Book Your Vehicle Service Online
          </h1>
          <p className="text-lg md:text-2xl mb-10 text-cyan-50 max-w-2xl mx-auto">
            Hassle-free vehicle servicing. Track progress in real time and manage all your vehicles in one place.
          </p>
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="inline-block bg-white text-cyan-600 px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              View Dashboard
            </Link>
          ) : (
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/register"
                className="bg-white text-cyan-600 px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                Book Service Now
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-10 py-4 rounded-xl font-semibold hover:bg-white hover:text-cyan-600 transition"
              >
                Login to Account
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div>
              <div className="text-5xl font-bold text-cyan-600 mb-3">5000+</div>
              <div className="text-gray-600 text-lg">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-cyan-600 mb-3">10+</div>
              <div className="text-gray-600 text-lg">Service Centers</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-cyan-600 mb-3">4.9★</div>
              <div className="text-gray-600 text-lg">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Experience the easiest way to service your vehicle with our modern platform and certified partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Comprehensive vehicle maintenance and repair services for every need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service) => (
              <div
                key={service[0]}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {service[1]}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      ⏱️ {service[3]} hours
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-cyan-600">
                      ₹{service[2]}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-base mb-6">{service[4]}</p>
                <Link
                  to={isAuthenticated ? '/bookings' : '/register'}
                  className="block text-center bg-cyan-500 text-white py-3 rounded-lg font-medium hover:bg-cyan-600 transition"
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-gradient-to-r from-cyan-500 to-blue-600 text-white mt-auto">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-10 text-cyan-50 max-w-2xl mx-auto">
            Join thousands of happy customers who trust us with their vehicles.
          </p>
          {!isAuthenticated && (
            <div className="flex justify-center gap-6 flex-wrap">
              <Link
                to="/register"
                className="bg-white text-cyan-600 px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                Create Free Account
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-10 py-4 rounded-xl font-semibold hover:bg-white hover:text-cyan-600 transition"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
