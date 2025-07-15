import React, { useState, useEffect, useContext } from 'react'; // Ensure useState, useEffect, useContext are imported
import { collection, query, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { AppContext } from '../App'; // Adjust path

const JournalPage = () => {
  const { db, userId, isAuthReady } = useContext(AppContext);
  const [entryTitle, setEntryTitle] = useState('');
  const [entryContent, setEntryContent] = useState('');
  const [message, setMessage] = useState('');
  const [journalEntries, setJournalEntries] = useState([]);

  // Fetch journal entries from Firestore
  useEffect(() => {
    if (!isAuthReady) return; // Wait for auth to be ready
    if (db && userId) {
      const currentAppId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const journalCollectionRef = collection(db, `artifacts/${currentAppId}/users/${userId}/journal`);
      const q = query(journalCollectionRef);
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedEntries = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setJournalEntries(fetchedEntries.sort((a, b) => b.timestamp?.toDate() - a.timestamp?.toDate()));
      }, (error) => {
        setMessage("Error loading journal entries.");
      });
      return () => unsubscribe();
    }
  }, [db, userId, isAuthReady]);

  const handleSubmitEntry = async (e) => {
    e.preventDefault();
    if (!entryTitle || !entryContent) {
      setMessage("Please fill in both title and content.");
      return;
    }
    if (!db || !userId) {
      setMessage("App not ready. Please try again.");
      console.error("handleSubmitEntry: db or userId not available.");
      return;
    }

    try {
      const currentAppId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const journalCollectionRef = collection(db, `artifacts/${currentAppId}/users/${userId}/journal`);
      await addDoc(journalCollectionRef, {
        title: entryTitle,
        content: entryContent,
        timestamp: serverTimestamp(),
      });
      setMessage("Journal entry saved successfully!");
      setEntryTitle('');
      setEntryContent('');
      console.log("Journal entry saved successfully.");
    } catch (error) {
      console.error("Error saving journal entry:", error);
      setMessage("Failed to save journal entry. Please try again.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
      <h2 className="text-3xl font-bold font-montserrat text-brand-blue mb-8 text-center">Your Journal</h2>
      {/* Status indicator for debugging */}
      <div className="text-center text-sm font-montserrat text-brand-black/70 mb-4">
        Firebase Ready: {isAuthReady ? 'Yes' : 'No'} | DB Connected: {!!db ? 'Yes' : 'No'} | User ID: {userId ? 'Yes' : 'No'}
      </div>
      <form onSubmit={handleSubmitEntry} className="max-w-xl mx-auto p-6 bg-gray-50 rounded-lg shadow-inner mb-8">
        <div className="mb-6">
          <label htmlFor="entryTitle" className="block text-lg font-semibold font-montserrat text-brand-black mb-2">Entry Title</label>
          <input
            type="text"
            id="entryTitle"
            value={entryTitle}
            onChange={(e) => setEntryTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm"
            placeholder="A title for your thoughts..."
          />
        </div>
        <div className="mb-6">
          <label htmlFor="entryContent" className="block text-lg font-semibold font-montserrat text-brand-black mb-2">What's on your mind?</label>
          <textarea
            id="entryContent"
            rows="8"
            value={entryContent}
            onChange={(e) => setEntryContent(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-y shadow-sm"
            placeholder="Write your thoughts, feelings, and experiences here..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition duration-300 ease-in-out shadow-lg transform hover:-translate-y-0.5"
        >
          Save Entry
        </button>
        {message && (
          <div className="mt-4 p-3 bg-indigo-100 text-indigo-700 rounded-lg text-center border border-indigo-200">
            {message}
          </div>
        )}
      </form>

      <div className="mt-10 pt-8 border-t border-gray-200">
        <h3 className="text-2xl font-bold text-indigo-700 mb-4 text-center">Your Past Entries</h3>
        {journalEntries.length === 0 ? (
          <p className="text-gray-600 text-center p-4 bg-gray-50 rounded-lg shadow-inner">No journal entries yet. Start writing!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journalEntries.map((entry) => (
              <div key={entry.id} className="bg-indigo-50 p-5 rounded-xl shadow-md border border-indigo-200 transition-transform transform hover:scale-102 duration-200">
                <h4 className="text-xl font-semibold font-montserrat text-brand-blue mb-2">{entry.title}</h4>
                <p className="text-sm font-montserrat text-brand-black/60 mb-3">
                  {entry.timestamp ? new Date(entry.timestamp.toDate()).toLocaleString() : 'Loading date...'}
                </p>
                <p className="text-base font-montserrat text-brand-black break-words line-clamp-4">{entry.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalPage;