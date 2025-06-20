// AIPlannerApp.jsx (Web version)
import React, { useState } from 'react';
import './AIPlannerApp.css'; // or use styled-components/Tailwind

export default function AIPlannerApp() {
  const [budget, setBudget] = useState('');
  const [days, setDays] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [travelPlan, setTravelPlan] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const generateTravelPlan = async () => {
    if (!budget || !days || !location) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const prompt = `Create a detailed travel plan for ${days} days in ${location} with a budget of ₹${budget}. Include daily activities, accommodation suggestions, and budget breakdown.`;
      // const prompt = "Hey"
      // const prompt = "Give a detailed travel plan for 2 days in shimla, India with a budget of INR 3000. Include daily activities, accommodation suggestions, and budget breakdown."

      // const response = await fetch('http://localhost:5000/api/v1/getTravelPlan', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({content: prompt }),
      // });

      // const data = await response.json();
      
      // setTravelPlan(data);



      const response = await fetch('https://api.a0.dev/ai/llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] }),
      });

      const data = await response.json();
      setTravelPlan(data.completion);





      const imagePrompt = `Beautiful scenic view of ${location}, travel destination, high quality, professional photo`;
      const imageResponse = await fetch(
        `https://api.a0.dev/assets/image?text=${encodeURIComponent(imagePrompt)}&aspect=16:9`
      );
      console.log(imageResponse);
      
      if (imageResponse.ok) {
        // const imgData = await imageResponse.json();
        setImageUrl(imageResponse.url);
      }
    } catch (err) {
      alert("Something went wrong.");
      console.log(err);
      
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setBudget('');
    setDays('');
    setLocation('');
    setTravelPlan(null);
    setImageUrl(null);
  };

  return (
    <div className="app-container">
      <h1>AI Travel Planner</h1>
      {!travelPlan ? (
        <div className="form-card">
          <input
            type="number"
            placeholder="Budget (INR)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          <input
            type="number"
            placeholder="Number of Days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
          <input
            type="text"
            placeholder="Destination"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={generateTravelPlan} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Plan'}
          </button>
        </div>
      ) : (
        <div className="result-card">
          <h2>Trip to {location}</h2>
          {imageUrl && <img src={imageUrl} alt={location} />}
          <p><strong>Budget:</strong> ₹{budget}</p>
          <p><strong>Days:</strong> {days}</p>
          <div className="plan-text">{travelPlan}</div>
          <button onClick={reset}>Plan Another Trip</button>
        </div>
      )}
    </div>
  );
}