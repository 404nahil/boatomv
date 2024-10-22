"use client"; // Add this directive to mark as a Client Component

import { useState } from "react";
import { Users, Ship, Plus, Edit, Trash } from "lucide-react";

export default function Dashboard() {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      date: "2024-10-20",
      time: "09:00",
      from: "Island A",
      to: "Island B",
      capacity: 48,
    },
    {
      id: 2,
      date: "2024-10-20",
      time: "14:00",
      from: "Island B",
      to: "Island A",
      capacity: 48,
    },
    {
      id: 3,
      date: "2024-10-21",
      time: "10:00",
      from: "Island A",
      to: "Island C",
      capacity: 48,
    },
  ]);

  const [bookings] = useState([
    {
      id: 1,
      date: "2024-10-20",
      time: "09:00",
      from: "Island A",
      to: "Island B",
      adults: 2,
      infants: 1,
    },
    {
      id: 2,
      date: "2024-10-20",
      time: "14:00",
      from: "Island B",
      to: "Island A",
      adults: 4,
      infants: 1,
    },
    {
      id: 3,
      date: "2024-10-21",
      time: "10:00",
      from: "Island A",
      to: "Island C",
      adults: 2,
      infants: 0,
    },
  ]);

  const [newSchedule, setNewSchedule] = useState({
    date: "",
    time: "",
    from: "",
    to: "",
    capacity: 48,
  });

  const handleAddSchedule = () => {
    setSchedules([...schedules, { id: schedules.length + 1, ...newSchedule }]);
    setNewSchedule({ date: "", time: "", from: "", to: "", capacity: 48 });
  };

  const handleDeleteSchedule = (id: number) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 mt-4 sm:mt-10">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">
        Speed Boat Booking Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <div className="p-4 sm:p-6 rounded-lg shadow">
          <h1>Today&#39;s Bookings</h1>
          <div className="text-3xl sm:text-4xl font-bold">
            {bookings.filter((booking) => booking.date === "2024-10-20").length}
          </div>
        </div>
        <div className="p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
            <Users className="mr-2" /> Total Passengers Today
          </h2>
          <div className="text-3xl sm:text-4xl font-bold">
            {bookings
              .filter((booking) => booking.date === "2024-10-20")
              .reduce(
                (sum, booking) => sum + booking.adults + booking.infants,
                0
              )}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
          <Ship className="mr-2" /> Boat Schedules
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 sm:p-4 text-left">Date</th>
                <th className="p-2 sm:p-4 text-left">Time</th>
                <th className="p-2 sm:p-4 text-left">From</th>
                <th className="p-2 sm:p-4 text-left">To</th>
                <th className="p-2 sm:p-4 text-left">Seats</th>
                <th className="p-2 sm:p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => (
                <tr key={schedule.id} className="border-b">
                  <td className="p-2 sm:p-4">{schedule.date}</td>
                  <td className="p-2 sm:p-4">{schedule.time}</td>
                  <td className="p-2 sm:p-4">{schedule.from}</td>
                  <td className="p-2 sm:p-4">{schedule.to}</td>
                  <td className="p-2 sm:p-4">{schedule.capacity}</td>
                  <td className="p-2 sm:p-4">
                    <button className="mr-2 p-1 sm:p-2 rounded-md hover:bg-gray-100">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSchedule(schedule.id)}
                      className="p-1 sm:p-2 rounded-md hover:bg-gray-100"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 sm:p-6 rounded-lg shadow">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
          <Plus className="mr-2" /> Add New Schedule
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <input
            type="date"
            className="p-2 border rounded-md bg-gray-700 border-gray-600"
            placeholder="Date"
            value={newSchedule.date}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, date: e.target.value })
            }
          />
          <input
            type="time"
            className="p-2 border rounded-md bg-gray-700 border-gray-600"
            placeholder="Time"
            value={newSchedule.time}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, time: e.target.value })
            }
          />
          <select
            className="p-2 border rounded-md bg-gray-700 border-gray-600"
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, from: e.target.value })
            }
          >
            <option value="">From</option>
            <option value="Male">Male</option>
            <option value="Kanditheem">Kanditheem</option>
          </select>
          <select
            className="p-2 border rounded-md bg-gray-700 border-gray-600"
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, to: e.target.value })
            }
          >
            <option value="">To</option>
            <option value="Male">Male</option>
            <option value="Kanditheem">Kanditheem</option>
          </select>
          <button
            onClick={handleAddSchedule}
            className="p-2 border rounded-md bg-indigo-500 text-white"
          >
            Add Schedule
          </button>
        </div>
      </div>

      <div className="mt-6 bg-gray-800 p-4 sm:p-6 rounded-lg">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Recent Bookings
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 sm:p-4 text-left">Date</th>
                <th className="p-2 sm:p-4 text-left">Time</th>
                <th className="p-2 sm:p-4 text-left">From</th>
                <th className="p-2 sm:p-4 text-left">To</th>
                <th className="p-2 sm:p-4 text-left">Adults</th>
                <th className="p-2 sm:p-4 text-left">Infants</th>
                <th className="p-2 sm:p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b">
                  <td className="p-2 sm:p-4">{booking.date}</td>
                  <td className="p-2 sm:p-4">{booking.time}</td>
                  <td className="p-2 sm:p-4">{booking.from}</td>
                  <td className="p-2 sm:p-4">{booking.to}</td>
                  <td className="p-2 sm:p-4">{booking.adults}</td>
                  <td className="p-2 sm:p-4">{booking.infants}</td>
                  <td className="p-2 sm:p-4">
                    <button className="p-1 sm:p-2 rounded-md hover:bg-gray-100">
                      <Edit className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
