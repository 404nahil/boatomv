"use client"; // Add this directive to mark as a Client Component

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function SpeedBoatBooking() {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<{
   date: string;
   departureIsland: string;
   arrivalIsland: string;
   adults: number;
   infants: number;
   selectedTrip: number | null;
   selectedSeats: number[];
   paymentSlip: File | null;
 }>({
   date: '',
   departureIsland: '',
   arrivalIsland: '',
   adults: 1,
   infants: 0,
   selectedTrip: null,
   selectedSeats: [],
   paymentSlip: null,
 });
 
 
 

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const updateBookingData = (data: Partial<typeof bookingData>) => {
   setBookingData({ ...bookingData, ...data });
 }; 

  return (
   <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
            Step {step} of 4
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {step === 1 && "Choose Your Trip"}
            {step === 2 && "Select Available Trip"}
            {step === 3 && "Choose Your Seats"}
            {step === 4 && "Confirm and Pay"}
          </h2>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => updateBookingData({ date: e.target.value })}
                  className="mt-1 block w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Departure Island</label>
                <select
                  className="mt-1 block w-full p-2 border rounded"
                  onChange={(e) => updateBookingData({ departureIsland: e.target.value })}
                >
                  <option value="">Select departure island</option>
                  <option value="Island A">Island A</option>
                  <option value="Island B">Island B</option>
                  <option value="Island C">Island C</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Arrival Island</label>
                <select
                  className="mt-1 block w-full p-2 border rounded"
                  onChange={(e) => updateBookingData({ arrivalIsland: e.target.value })}
                >
                  <option value="">Select arrival island</option>
                  <option value="Island A">Island A</option>
                  <option value="Island B">Island B</option>
                  <option value="Island C">Island C</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Adults</label>
                  <input
                    type="number"
                    min="1"
                    value={bookingData.adults}
                    onChange={(e) => updateBookingData({ adults: parseInt(e.target.value) })}
                    className="mt-1 block w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Infants</label>
                  <input
                    type="number"
                    min="0"
                    value={bookingData.infants}
                    onChange={(e) => updateBookingData({ infants: parseInt(e.target.value) })}
                    className="mt-1 block w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
          )}


          {step === 2 && (
            <div className="space-y-4">
              {[{ id: 1, time: '09:00 AM', availableSeats: 20 }, { id: 2, time: '11:00 AM', availableSeats: 15 }, { id: 3, time: '02:00 PM', availableSeats: 30 }].map((trip) => (
                <div
                  key={trip.id}
                  className={`p-4 border rounded-lg cursor-pointer ${bookingData.selectedTrip === trip.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}
                  onClick={() => updateBookingData({ selectedTrip: trip.id })}
                >
                  <div className="font-semibold">Departure: {trip.time}</div>
                  <div className="text-sm text-gray-500">Available Seats: {trip.availableSeats}</div>
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="mb-4">Select {bookingData.adults + bookingData.infants} seat(s)</p>
              <div className="grid grid-cols-6 gap-2">
                {Array.from({ length: 48 }, (_, i) => i + 1).map((seat) => (
                  <button
                    key={seat}
                    className={`p-2 text-center rounded ${bookingData.selectedSeats.includes(seat) ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => {
                      const updatedSeats = bookingData.selectedSeats.includes(seat)
                        ? bookingData.selectedSeats.filter((s) => s !== seat)
                        : [...bookingData.selectedSeats, seat];
                        if (updatedSeats.length <= bookingData.adults + bookingData.infants) {
                           updateBookingData({ selectedSeats: updatedSeats });
                        }
                         
                    }}
                    disabled={!bookingData.selectedSeats.includes(seat) && bookingData.selectedSeats.length >= bookingData.adults + bookingData.infants}

                  >
                    {seat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Booking Summary</h3>
                <p>Date: {bookingData.date}</p>
                <p>Departure: {bookingData.departureIsland}</p>
                <p>Arrival: {bookingData.arrivalIsland}</p>
                <p>Passengers: {bookingData.adults + bookingData.infants}</p>
                <p>Selected Trip: Trip {bookingData.selectedTrip}</p>
                <p>Selected Seats: {bookingData.selectedSeats.join(', ')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Upload Payment Slip</label>
                <input
                  type="file"
                  onChange={(e) => updateBookingData({ paymentSlip: e.target.files ? e.target.files[0] : null })}
                  className="mt-1 block w-full p-2 border rounded"
                />
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <button onClick={handleBack} className="px-4 py-2 border rounded-md border-gray-300 bg-white">
                Back
              </button>
            )}
            {step < 4 ? (
              <button onClick={handleNext} className="ml-auto flex items-center px-4 py-2 border rounded-md border-indigo-500 bg-indigo-500 text-white">
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            ) : (
              <button onClick={() => console.log('Booking completed:', bookingData)} className="ml-auto px-4 py-2 border rounded-md border-indigo-500 bg-indigo-500 text-white">
                Complete Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
