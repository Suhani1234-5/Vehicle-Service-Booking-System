// src/pages/Bookings.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getUserVehicles,
  getUserBookings,
  getAllServices,
  createBooking,
} from '../services/api';

const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    vehicle_id: '',
    service_id: '',
    booking_date: '',
    booking_time: '',
  });

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [bookingsRes, vehiclesRes, servicesRes] = await Promise.all([
        getUserBookings(user.user_id),
        getUserVehicles(user.user_id),
        getAllServices(),
      ]);
      setBookings(bookingsRes.data);
      setVehicles(vehiclesRes.data);
      setServices(servicesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ add this function before return()
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await createBooking({
      user_id: user.user_id,
      ...formData,
    });

    if (response.data.error) {
      alert(response.data.error);
      return;
    }

    alert(response.data.message || 'Booking created successfully!');
    setShowModal(false);
    setFormData({
      vehicle_id: '',
      service_id: '',
      booking_date: '',
      booking_time: '',
    });
    fetchData();
  } catch (error) {
    console.error('Error creating booking:', error);
    alert('Failed to create booking. Please try again.');
  }
};


  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

 const getVehicleName = (vehicleId) => {
  const vehicle = vehicles.find((v) => v.id === vehicleId);
  return vehicle ? vehicle.vehicle_name : 'Unknown Vehicle';
};


const getServiceName = (serviceId) => {
  const service = services.find((s) => s.id === serviceId);
  return service ? service.service_name : 'Unknown Service';
};


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Bookings</h1>
            <p className="text-gray-600">Track and manage your service bookings</p>
          </div>
          <button
            onClick={() => {
              if (vehicles.length === 0) {
                alert('Please add a vehicle first');
                return;
              }
              setShowModal(true);
            }}
            className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition flex items-center"
          >
            <span className="mr-2">📅</span> Book Service
          </button>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No bookings yet
            </h3>
            <p className="text-gray-600 mb-6">
              Book your first service to get started
            </p>
            <button
              onClick={() => {
                if (vehicles.length === 0) {
                  alert('Please add a vehicle first');
                  return;
                }
                setShowModal(true);
              }}
              className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition"
            >
              Book Your First Service
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking[0]}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1 mb-4 md:mb-0">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-800 mr-3">
                        Booking #{booking[0]}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          booking[7]
                        )}`}
                      >
                        {booking[7]}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">Vehicle</p>
                        <p className="font-semibold text-gray-800">
                          {getVehicleName(booking[2])}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Service</p>
                        <p className="font-semibold text-gray-800">
                          {getServiceName(booking[3])}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Date</p>
                        <p className="font-semibold text-gray-800">{booking[5]}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Time</p>
                        <p className="font-semibold text-gray-800">{booking[6]}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:flex-col gap-2">
                    <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition text-sm">
                      View Details
                    </button>
                    {booking[7] === 'pending' && (
                      <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Booking Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-8 max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Book Service</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Select Vehicle
                  </label>
                  <select
  name="vehicle_id"
  value={formData.vehicle_id}
  onChange={handleChange}
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
  required
>
  <option value="">Choose a vehicle</option>
  {vehicles.map((vehicle) => (
    <option key={vehicle.id} value={vehicle.id}>
      {vehicle.vehicle_name} - {vehicle.vehicle_number}
    </option>
  ))}
</select>

                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Select Service
                  </label>
                  <select
                    name="service_id"
                    value={formData.service_id}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  >
                    <option value="">Choose a service</option>
                    {services.map((service) => (
                      <option key={service[0]} value={service[0]}>
                        {service[1]} - ₹{service[2]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Booking Date
                  </label>
                  <input
                    type="date"
                    name="booking_date"
                    value={formData.booking_date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Booking Time
                  </label>
                  <select
                    name="booking_time"
                    value={formData.booking_time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  >
                    <option value="">Choose a time slot</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                  </select>
                </div>

                {formData.service_id && (
                  <div className="mb-6 p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Service Details</p>
                    {services
                      .filter((s) => s[0] === parseInt(formData.service_id))
                      .map((service) => (
                        <div key={service[0]}>
                          <p className="font-semibold text-gray-800">{service[1]}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Duration: {service[3]} hours
                          </p>
                          <p className="text-lg font-bold text-cyan-600 mt-2">
                            ₹{service[2]}
                          </p>
                        </div>
                      ))}
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;