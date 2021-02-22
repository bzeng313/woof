import React from "react";
import algoliasearch from "algoliasearch/lite";
import "./searchBar.css";
import { connectStateResults } from "react-instantsearch-dom";

import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
} from "react-instantsearch-dom";

const searchClient = algoliasearch(
  "SVXVZO2ZW8",
  "9b17a4ec23a796d3bf7496e73fd930be"
);

// const StateResults = ({ searchResults }) => {
//   const hasResults = searchResults && searchResults.nbHits !== 0;
//   const nbHits = searchResults && searchResults.nbHits;

//   return (
//     <div>
//       <div hidden={!hasResults}>There are {nbHits} results</div>
//       <div hidden={hasResults}>There is no results</div>
//     </div>
//   );
// };

// const CustomStateResults = connectStateResults(StateResults);

// const CustomStateResults = connectStateResults(StateResults);

const Results = connectStateResults(({ searchState, searchResults }) =>
  searchState && searchState.query ? (
    <React.Fragment>
      <div className="SearchState">
        {searchResults ? searchResults.nbHits : 0} Results for
        {" " + searchState.query}
        {/* Results for {searchState.query} */}
      </div>
      <Hits hitComponent={Hit} />
    </React.Fragment>
  ) : (
    <div className="SearchState"></div>
  )
);

const Hit = ({ hit }) => (
  //   <p>
  <Highlight attribute="text" hit={hit} tagName="mark" />
  //   </p>
);

// const SearchBar = (videoId) => (
//   <InstantSearch searchClient={searchClient} indexName={videoId}>
//     <SearchBox />
//     {/* <CustomStateResults> */}
//     <Results></Results>
//     {/* <Hits hitComponent={Hit} /> */}
//     {/* </CustomStateResults> */}
//   </InstantSearch>
// );
// export default SearchBar;

function SearchBar(props) {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={
        "classes:" + props.courseId + ":videos:" + props.videoId + ":comments"
      }
    >
      <SearchBox />
      {/* <CustomStateResults> */}
      <Results></Results>
      {/* <Hits hitComponent={Hit} /> */}
      {/* </CustomStateResults> */}
    </InstantSearch>
  );
}

export default SearchBar;
