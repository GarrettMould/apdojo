/**
 * Generates a deterministic Dojo name based on a seed string.
 * The same seed will always produce the same name.
 * 
 * @param seed - A string used to deterministically generate the name
 * @returns A formatted Dojo name (e.g., 'Rising Tiger Protocol')
 */
export function getDojoName(seed: string): string {
  const adjectives = ['Iron', 'Golden', 'Shadow', 'Silent', 'Swift', 'Blind', 'Rising', 'Hidden'];
  const nouns = ['Dragon', 'Tiger', 'Crane', 'Lotus', 'Fist', 'Mantis', 'Viper', 'Phoenix'];
  const types = ['Protocol', 'Drill', 'Sparring', 'Challenge', 'Session', 'Kata'];

  // Create a simple hash from the seed string
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Use the hash to deterministically select indices
  const adjectiveIndex = Math.abs(hash) % adjectives.length;
  const nounIndex = Math.abs(hash >> 8) % nouns.length;
  const typeIndex = Math.abs(hash >> 16) % types.length;

  return `${adjectives[adjectiveIndex]} ${nouns[nounIndex]} ${types[typeIndex]}`;
}

