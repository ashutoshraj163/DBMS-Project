// Use server directive is needed for Genkit Flows.
'use server';
/**
 * @fileOverview A sentiment analysis AI agent for guest reviews.
 *
 * - analyzeGuestReview - A function that handles the sentiment analysis process.
 * - AnalyzeGuestReviewInput - The input type for the analyzeGuestReview function.
 * - AnalyzeGuestReviewOutput - The return type for the analyzeGuestReview function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzeGuestReviewInputSchema = z.object({
  reviewText: z.string().describe('The text of the guest review.'),
});
export type AnalyzeGuestReviewInput = z.infer<typeof AnalyzeGuestReviewInputSchema>;

const AnalyzeGuestReviewOutputSchema = z.object({
  sentiment: z.string().describe('The sentiment of the review (positive, negative, or neutral).'),
  confidence: z.number().describe('The confidence level of the sentiment analysis (0 to 1).'),
  summary: z.string().describe('A short summary of the review and the reasons for the sentiment.'),
});
export type AnalyzeGuestReviewOutput = z.infer<typeof AnalyzeGuestReviewOutputSchema>;

export async function analyzeGuestReview(input: AnalyzeGuestReviewInput): Promise<AnalyzeGuestReviewOutput> {
  return analyzeGuestReviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeGuestReviewPrompt',
  input: {
    schema: z.object({
      reviewText: z.string().describe('The text of the guest review.'),
    }),
  },
  output: {
    schema: z.object({
      sentiment: z.string().describe('The sentiment of the review (positive, negative, or neutral).'),
      confidence: z.number().describe('The confidence level of the sentiment analysis (0 to 1).'),
      summary: z.string().describe('A short summary of the review and the reasons for the sentiment.'),
    }),
  },
  prompt: `You are a sentiment analysis expert specializing in analyzing hotel guest reviews.\n\nYou will analyze the guest review and determine the sentiment (positive, negative, or neutral), the confidence level (0 to 1), and a short summary of the review and the reasons for the sentiment.\n\nReview: {{{reviewText}}}`,
});

const analyzeGuestReviewFlow = ai.defineFlow<
  typeof AnalyzeGuestReviewInputSchema,
  typeof AnalyzeGuestReviewOutputSchema
>({
  name: 'analyzeGuestReviewFlow',
  inputSchema: AnalyzeGuestReviewInputSchema,
  outputSchema: AnalyzeGuestReviewOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
