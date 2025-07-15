import React, { useState, useEffect, useContext } from 'react'; // Ensure useState, useEffect, useContext are imported
import { collection, query, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AppContext } from '../App'; // Adjust path
import CustomTooltip from '../components/CustomTooltip'; // Adjust path

const CheckInPage = () => {
  const { db, userId, isAuthReady } = useContext(AppContext);
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [checkIns, setCheckIns] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Map mood strings to numerical values for charting
  const moodToValue = {
    '😊 Happy': 5,
    '😐 Neutral': 3,
    '😟 Sad': 2,
    '😠 Angry': 1,
    ' anxious': 1.5,
  };

  // Fetch check-ins from Firestore and prepare chart data
  useEffect(() => {
    if (!isAuthReady) return; // Wait for auth to be ready
    if (db && userId) {
      const currentAppId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const checkInsCollectionRef = collection(db, `artifacts/${currentAppId}/users/${userId}/checkins`);
      const q = query(checkInsCollectionRef);
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedCheckIns = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        const sortedCheckIns = fetchedCheckIns.sort((a, b) => a.timestamp?.toDate() - b.timestamp?.toDate());
        setCheckIns(sortedCheckIns.reverse());
        const newChartData = sortedCheckIns.map(checkIn => ({
          date: checkIn.timestamp ? new Date(checkIn.timestamp.toDate()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A',
          moodValue: moodToValue[checkIn.mood] || 0,
          mood: checkIn.mood,
        }));
        setChartData(newChartData);
      }, (error) => {
        setMessage("Error loading check-ins.");
      });
      return () => unsubscribe();
    }
  }, [db, userId, isAuthReady]);

  const handleSubmitCheckIn = async (e) => {
    e.preventDefault();
    if (!mood) {
      setMessage("Please select your mood.");
      return;
    }
    if (!db || !userId) {
      setMessage("App not ready. Please try again.");
      console.error("handleSubmitCheckIn: db or userId not available.");
      return;
    }

    try {
      const currentAppId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const checkInsCollectionRef = collection(db, `artifacts/${currentAppId}/users/${userId}/checkins`);
      await addDoc(checkInsCollectionRef, {
        mood,
        notes,
        timestamp: serverTimestamp(),
      });
      setMessage("Check-in saved successfully!");
      setMood('');
      setNotes('');
      console.log("Check-in saved successfully.");
    } catch (error) {
      console.error("Error saving check-in:", error);
      setMessage("Failed to save check-in. Please try again.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
      <h2 className="text-3xl font-bold font-montserrat text-brand-blue mb-8 text-center">Daily Check-in</h2>
      <form onSubmit={handleSubmitCheckIn} className="max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-inner mb-8">
        <div className="mb-6">
          <label htmlFor="mood" className="block text-lg font-semibold font-montserrat text-brand-black mb-3">How are you feeling today?</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {['😊 Happy', '😐 Neutral', '😟 Sad', '😠 Angry', ' anxious'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMood(m)}
                className={`w-full py-3 px-4 rounded-lg border-2 font-medium transition duration-200 ease-in-out transform hover:scale-105 ${mood === m ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-50 hover:border-indigo-400'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="notes" className="block text-lg font-semibold font-montserrat text-brand-black mb-2">Any notes or thoughts?</label>
          <textarea
            id="notes"
            rows="4"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-y shadow-sm"
            placeholder="Write down anything on your mind..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition duration-300 ease-in-out shadow-lg transform hover:-translate-y-0.5"
        >
          Save Check-in
        </button>
        {message && (
          <div className="mt-4 p-3 bg-indigo-100 text-indigo-700 rounded-lg text-center border border-indigo-200">
            {message}
          </div>
        )}
      </form>

      <div className="mt-10 pt-8 border-t border-gray-200">
        <h3 className="text-2xl font-bold font-montserrat text-brand-blue mb-6 text-center">Your Mood Trend</h3>
        {chartData.length > 0 ? (
          <div className="w-full h-80 bg-gray-50 p-4 rounded-lg shadow-inner">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis
                  domain={[0, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  tickFormatter={(value) => {
                    if (value === 1) return 'Angry';
                    if (value === 2) return 'Sad';
                    if (value === 3) return 'Neutral';
                    if (value === 4) return 'Good';
                    if (value === 5) return 'Happy';
                    return '';
                  }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="moodValue"
                  stroke="#6366f1"
                  strokeWidth={3}
                  activeDot={{ r: 8, fill: '#4f46e5', stroke: '#a5b4fc', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-gray-600 text-center p-4 bg-gray-50 rounded-lg shadow-inner">No enough data to display mood trend. Check in daily!</p>
        )}
      </div>

      <div className="mt-10 pt-8 border-t border-gray-200">
        <h3 className="text-2xl font-bold font-montserrat text-brand-blue mb-4 text-center">Your Past Check-ins</h3>
        {checkIns.length === 0 ? (
          <p className="text-gray-600 text-center">No check-ins yet. Start by adding one!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {checkIns.map((checkIn) => (
              <div key={checkIn.id} className="bg-indigo-50 p-5 rounded-xl shadow-md border border-indigo-200 transition-transform transform hover:scale-102 duration-200">
                <p className="text-lg font-semibold text-indigo-800 mb-2">{checkIn.mood}</p>
                <p className="text-sm text-gray-500 mb-3">
                  {checkIn.timestamp ? new Date(checkIn.timestamp.toDate()).toLocaleString() : 'Loading date...'}
                </p>
                {checkIn.notes && (
                  <p className="text-gray-700 text-base italic break-words">{checkIn.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckInPage;