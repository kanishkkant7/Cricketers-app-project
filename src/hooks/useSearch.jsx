// hooks/useSearch.js
import { useState } from 'react';
import getPlayers from '../data/getPlayers';

export function useSearch() {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchCricketers = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const allPlayers = await getPlayers();
      const results = allPlayers.filter(player => {
        const searchLower = searchTerm.toLowerCase();
        // Safely check for type existence
        const playerType = player.type || 'Not Specified';
        
        return (
          player.name.toLowerCase().includes(searchLower) ||
          playerType.toLowerCase().includes(searchLower)
        );
      });
      
      setSearchResults(results.slice(0, 5));
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return {
    searchResults,
    isSearching,
    searchCricketers
  };
}