'use client';

import {analyzeGuestReview} from '@/ai/flows/analyze-guest-reviews';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {useState} from 'react';

export default function ReviewsPage() {
  const [review, setReview] = useState('');
  const [sentimentAnalysis, setSentimentAnalysis] = useState(null);

  const handleAnalyzeReview = async () => {
    const analysis = await analyzeGuestReview({reviewText: review});
    setSentimentAnalysis(analysis);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Reviews</h1>
      <p className="text-muted-foreground">Analyze guest reviews using sentiment analysis.</p>

      <Textarea
        placeholder="Enter guest review here..."
        value={review}
        onChange={e => setReview(e.target.value)}
        className="mt-4"/>

      <Button onClick={handleAnalyzeReview} className="mt-2">
        Analyze Review
      </Button>

      {sentimentAnalysis && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Sentiment Analysis Result</h2>
          <p>Sentiment: {sentimentAnalysis.sentiment}</p>
          <p>Confidence: {sentimentAnalysis.confidence}</p>
          <p>Summary: {sentimentAnalysis.summary}</p>
        </div>
      )}
    </div>
  );
}
