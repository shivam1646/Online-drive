import { PropTypes } from "prop-types";

import * as Styles from "./styles";
import NavBox from "./NavBox";
import SearchBox from "./SearchBox";

function Header({ search, setSearch, searchCount }) {
  return (
    <Styles.Header>
      {!search.searching && <NavBox />}
      {search.searching && (
        <div style={{ display: "flex" }}>
          <Styles.CloseBtn
            onClick={() => {
              setSearch({
                searching: false,
                searchText: "",
              });
            }}
          />
          <span>
            {search.searchText
              ? `Found results: ${searchCount} items`
              : "Search page: Type atleast 1 character"}
          </span>
        </div>
      )}
      <SearchBox
        searchText={search.searchText}
        handleInputFocus={() => {
          setSearch({
            ...search,
            searching: true,
          });
        }}
        handleInputChange={(e) => {
          setSearch({
            ...search,
            searchText: e.target.value,
          });
        }}
      />
    </Styles.Header>
  );
}

Header.propTypes = {
  search: PropTypes.object,
  setSearch: PropTypes.func,
  searchCount: PropTypes.number,
};

export default Header;
