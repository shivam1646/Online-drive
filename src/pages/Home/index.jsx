import { useMemo, useState } from "react";

import { NodesProvider } from "../../context/rootNodeContext";
import { PathContext } from "../../context/pathContext";
import Header from "../../components/Header";
import NodesList from "../../components/NodesList";

function Home() {
  const [path, setPath] = useState(["0"]);
  const [search, setSearch] = useState({
    searchText: "",
    searching: false,
  });
  const [searchCount, setSearchCount] = useState(0);

  const pathValue = useMemo(() => ({ path, setPath }), [path]);

  return (
    <NodesProvider>
      <PathContext.Provider value={pathValue}>
        <Header
          search={search}
          setSearch={setSearch}
          searchCount={searchCount}
        />
        <NodesList
          search={search}
          setSearch={setSearch}
          setSearchCount={setSearchCount}
        />
      </PathContext.Provider>
    </NodesProvider>
  );
}

export default Home;
