/**
 * Backward compatibility bridge to searchEngine.
 * Chatbot logic has been removed; search and intent parsing are powered by searchEngine.ts.
 */
export type { ExtractedIntent, ScoredScheme } from './searchEngine';
export {
  parseSearchIntent,
  scoreScheme,
  matchesManualFilters,
  searchAndFilterSchemes
} from './searchEngine';
