"use client";

import PokemonCard from '@/components/PokemonCard';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Spinner from '@/components/Spinner';

const ITEMS_PER_PAGE = 15; // 15 Pokémon per page

const Dashboard = () => {
  const { logout } = useAuth(); // Get logout function from context
  const router = useRouter(); // Use Next.js router

  const [allPokemons, setAllPokemons] = useState([]); // Holds all Pokémon
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [searchTerm, setSearchTerm] = useState(''); // Track search term
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state for invalid search
  const [sortCriteria, setSortCriteria] = useState('name'); // State for sorting
  const [typeFilters, setTypeFilters] = useState({}); // State for type filters
  const [isNavExpanded, setIsNavExpanded] = useState(false); // State for toggling mobile navbar
  const [selectedPokemon, setSelectedPokemon] = useState(null); // State for selected Pokémon modal

  // Fetch all Pokémon when the component mounts
  const fetchAllPokemons = async () => {
    setLoading(true); // Show loading spinner while fetching
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`);

      const results = await Promise.all(
        response.data.results.map((pokemon) => axios.get(pokemon.url))
      );
      setAllPokemons(results.map((res) => res.data));
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    //   setError('Error fetching Pokémon data.');
    } finally {
      setLoading(false); // Hide loading spinner once fetching is complete
    }
  };

  const handleLogout = () => {
    logout(); // Call logout to update context and local storage
  };

  useEffect(() => {
    fetchAllPokemons();
  }, []);

  // Handle search by name only
  const fetchPokemon = async (name) => {
    setLoading(true); // Show loading spinner while searching
    setError(''); // Clear any previous errors
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      setAllPokemons([response.data]); // Only show searched Pokémon
      setCurrentPage(1); // Reset to the first page
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      setError('No Pokémon found with that name.'); // Set error for invalid Pokémon name
      setAllPokemons([]); // Clear the list if no Pokémon found
    } finally {
      setLoading(false); // Hide loading spinner after search is complete
    }
  };

  // Validate the search term and handle empty search
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();

    if (!trimmedSearchTerm) {
      setError('Please enter a Pokemon name.');
      setAllPokemons([]); // Clear the list if no search term is entered
      return;
    }

    const isValidName = /^[a-zA-Z]+$/.test(trimmedSearchTerm); // Only letters allowed
    if (!isValidName) {
      setError('Pokemon names should only contain letters.');
      setAllPokemons([]); // Clear the list if no search term is entered
      return;
    }

    fetchPokemon(trimmedSearchTerm);
  };

  const sortPokemons = (pokemons) => {
    return pokemons.sort((a, b) => {
      if (sortCriteria === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortCriteria === 'base_experience') {
        return b.base_experience - a.base_experience; // Sort by base experience (descending)
      } else if (sortCriteria === 'fetched') {
        return allPokemons.indexOf(a) - allPokemons.indexOf(b); // Maintain original order as fetched
      } else {
        return 0; // Default case
      }
    });
  };

  const filterPokemons = (pokemons) => {
    if (Object.keys(typeFilters).length === 0 || Object.values(typeFilters).every(value => !value)) {
      return pokemons; // Return all Pokémon if no filters are applied
    }

    return pokemons.filter(pokemon => {
      const types = pokemon.types.map(typeObj => typeObj.type.name);
      return types.some(type => typeFilters[type]);
    });
  };

  const handleTypeFilterChange = (type) => {
    setTypeFilters((prev) => ({
      ...prev,
      [type]: !prev[type], // Toggle filter state
    }));
  };

  const filteredPokemons = filterPokemons(allPokemons);
  const sortedPokemons = sortPokemons(filteredPokemons);

  const nextPage = () => {
    if (currentPage < Math.ceil(sortedPokemons.length / ITEMS_PER_PAGE)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePokemonClick = (pokemon) => {
    router.push(`/pokemon/${pokemon.name}`);
  };

  return (
    <div className="flex flex-col items-center justify-start font-poppins">
      <nav className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 py-4 shadow-md sticky top-0 z-50 transition-all duration-300">
        <div className="flex justify-between items-center flex-wrap px-4 gap-x-10">
          <h1 className="text-2xl text-blue-700 font-semibold ">PokiMon</h1>
          <button 
            className="md:hidden bg-transparent border-none cursor-pointer p-2"
            onClick={() => setIsNavExpanded(!isNavExpanded)}
          >
            <span className="block w-6 h-0.5 bg-blue-700 mb-1 transition-transform duration-300"></span>
            <span className="block w-6 h-0.5 bg-blue-700 mb-1 transition-transform duration-300"></span>
            <span className="block w-6 h-0.5 bg-blue-700 transition-transform duration-300"></span>
          </button>

          <div className={`flex items-center flex-grow justify-end ${isNavExpanded ? 'flex flex-col bg-white w-full py-4' : 'hidden md:flex md:flex-row md:justify-end'} gap-x-10`}>
            <form className="flex gap-2 mb-4 md:mb-0" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search Pokemon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 rounded-full border-2 border-blue-700 outline-none transition duration-300 text-gray-700"
              />
              <button type="submit" className="bg-blue-700 text-white rounded-full px-4 py-2 transition duration-300 font-semibold">Search</button>
            </form>

            <div className="flex items-center gap-5 mb-4 md:mb-0">
              <select 
                onChange={(e) => setSortCriteria(e.target.value)} 
                value={sortCriteria}
                className="p-2 rounded-full border-2 border-blue-700 bg-white outline-none cursor-pointer text-gray-700"
              >
                <option value="fetched">Sort: Fetched</option>
                <option value="name">Sort: Name</option>
                <option value="base_experience">Sort: Base Exp</option>
              </select>

             
            </div>

            <button className="bg-red-500 text-white rounded-full px-4 py-2 font-semibold transition duration-300 hover:bg-red-600" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>

      {loading && <div className="flex justify-center items-center"><Spinner/></div>}
      {error && <div className="text-red-600">{error}</div>}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {sortedPokemons.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <div className="flex justify-between p-4 w-full">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold transition duration-300 hover:bg-blue-600"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold transition duration-300 hover:bg-blue-600"
          onClick={nextPage}
          disabled={currentPage === Math.ceil(sortedPokemons.length / ITEMS_PER_PAGE)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
