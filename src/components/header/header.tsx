import { FaSearch } from 'react-icons/fa';

export const Header = () => {
  return (
    <div className="flex flex-col sm:flex-row  justify-between p-5 ">
      <h3 className="text-white font-bold ">Todo-ask</h3>
      <form className="p-2 bg-gray-700 rounded-lg flex items-center mb-3">
        <input
          type="text"
          className="bg-transparent focus:outline-none w-24 sm:w-64"
          placeholder="Buscar por nombre..."
        />
        <FaSearch />
      </form>
      <div className="flex gap-4 items-center">
        <h5>Filtros:</h5>
        <select className=" p-2 bg-gray-700 rounded-lg  focus:outline-none  sm:w-40">
          <option className="bg-gray-700">Estado</option>
          <option className="bg-gray-700">Por hacer</option>
          <option className="bg-gray-700">En progreso</option>
          <option className="bg-gray-700">Completada</option>
        </select>

        <select className=" p-2 gap-2 bg-gray-700 rounded-lg  focus:outline-none  sm:w-40">
          <option>Prioridad</option>
          <option className="bg-gray-700">Por hacer</option>
          <option className="bg-gray-700">En progreso</option>
          <option className="bg-gray-700">Completada</option>
        </select>
      </div>
    </div>
  );
};
