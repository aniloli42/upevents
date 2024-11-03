import { Dispatch, FormEvent, FormEventHandler, SetStateAction } from "react";

type Props = {
  countries: any[] | undefined;
  setCurrentCountry: Dispatch<SetStateAction<string>>;
};

const Search = ({ countries, setCurrentCountry }: Props) => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const searchTerm = formData.get("search");
    if (searchTerm == "" || searchTerm == null) return;
    setCurrentCountry(searchTerm as string);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="search"
        id="search"
        list="countries"
        className="py-2 px-4 border-gray-200 text-white bg-gray-700/60 placeholder:text-white/80 max-w-96 w-full border rounded"
        placeholder="Search Another Country "
      />
      <button className="text-white/80 backdrop-blur-lg px-6 py-2 border rounded mx-2 hover:bg-gray-200 focus-within:bg-gray-200 hover:text-black focus-within:text-black">
        Search
      </button>

      <datalist id="countries">
        {countries?.map((country) => (
          <option key={country.country_name} value={country["country_name"]} />
        ))}
      </datalist>
    </form>
  );
};

export default Search;
