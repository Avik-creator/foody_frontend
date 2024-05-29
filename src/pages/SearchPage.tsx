import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();
  return (
    <div>
      <h1>Search Page</h1>
      <h2>City: {city}</h2>
    </div>
  );
};
export default SearchPage;
