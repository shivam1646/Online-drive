import { PropTypes } from "prop-types";

import * as Styles from "./styles";

function SearchBox({ handleInputFocus, handleInputChange, searchText }) {
  return (
    <Styles.SearchBox>
      <Styles.SearchIcon />
      <Styles.SearchInput
        placeholder="Search for anything"
        value={searchText}
        onFocus={handleInputFocus}
        onChange={handleInputChange}
      />
    </Styles.SearchBox>
  );
}

SearchBox.propTypes = {
  searchText: PropTypes.string,
  handleInputFocus: PropTypes.func,
  handleInputChange: PropTypes.func,
};

export default SearchBox;
