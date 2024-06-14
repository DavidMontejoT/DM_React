import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = () => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(response => response.json())
      .then(result => {
        setData(result.results);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-black text-green-500 min-h-screen">
      <div className="w-11/12 m-auto">
        <div className="flex justify-center py-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/2560px-Rick_and_Morty.svg.png"
            alt="Rick and Morty Logo"
            className="w-2/3 md:w-1/3"
          />
        </div>
        <div className="flex justify-center py-4">
          <input
            type="text"
            className="p-2 rounded-lg border-2 border-green-500 bg-gray-800 text-green-500 focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Buscar personaje..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredData.map(item => (
            <div key={item.id} className="bg-gray-900 rounded-lg p-4 shadow-lg hover:shadow-neon-green">
              <h2 className="text-center p-3 text-green-300">{item.name}</h2>
              <div className="flex items-center justify-center">
                <span className={`w-3 h-3 rounded-full mr-2 ${item.status === 'Alive' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <h3 className="text-center text-green-200">{item.status}</h3>
              </div>
              <img
                className="w-full h-auto rounded-lg border-4 border-green-500 hover:bg-white hover:opacity-75 transition duration-300"
                src={item.image}
                alt={item.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
