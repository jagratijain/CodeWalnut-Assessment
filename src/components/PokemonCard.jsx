
const PokemonCard = ({ pokemon, onClick }) => {
  return (
    <div
      className="bg-gradient-to-br from-white to-yellow-200 via-yellow-300 rounded-2xl shadow-lg p-5 text-center transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer relative overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)] transition-opacity duration-500 opacity-0 hover:opacity-100"></div>
      <img
        className="w-36 mb-4 transition-transform duration-300 hover:scale-110 hover:brightness-110"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <div className="text-blue-600">
        <h2 className="text-2xl capitalize transition-colors duration-300 hover:text-blue-800">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h2>
        <p className="mt-2">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className={`px-2 py-1 rounded-md text-white text-sm mr-1 transition-colors duration-300 ${getTypeClass(type.type.name)}`}
            >
              {type.type.name.toUpperCase()}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

const getTypeClass = (type) => {
  const typeClasses = {
    water: 'bg-blue-500',
    fire: 'bg-orange-600',
    grass: 'bg-green-500',
    electric: 'bg-yellow-500',
    ice: 'bg-cyan-400',
    fighting: 'bg-red-600',
    bug: 'bg-green-600',
    normal: 'bg-gray-300',
    ghost: 'bg-purple-600',
    rock: 'bg-brown-500',
    ground: 'bg-orange-400',
    fairy: 'bg-pink-400',
    psychic: 'bg-purple-500',
    dragon: 'bg-indigo-600',
    dark: 'bg-gray-700',
    steel: 'bg-gray-400',
    flying: 'bg-blue-300',
  };
  
  return typeClasses[type] || 'bg-gray-400'; // Fallback for unknown types
};

export default PokemonCard;
