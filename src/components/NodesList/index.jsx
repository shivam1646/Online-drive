import {
  useState,
  useContext,
  useEffect,
  memo,
  useCallback,
  useDeferredValue,
} from "react";
import { PropTypes } from "prop-types";

import * as Styles from "./styles";
import useContextMenu from "../../hooks/useContextMenu";
import { useNodes, useNodesDispatch } from "../../context/rootNodeContext";
import { PathContext } from "../../context/pathContext";
import Node from "./Node";
import AddNode from "./AddNode";
import ContextMenu from "./ContextMenu";
import {
  getCurrentNodeChildren,
  getNodesBySearchText,
  isDuplicateNode,
} from "../../utils";

const NodesList = memo(function NodesList({
  search,
  setSearch,
  setSearchCount,
}) {
  const [action, setAction] = useState("");
  const [actionNodeId, setActionNodeId] = useState("");

  const { showContextMenu, setShowContextMenu, points, setPoints } =
    useContextMenu();
  const { path, setPath } = useContext(PathContext);
  const nodes = useNodes();
  const dispatch = useNodesDispatch();

  const deferredSearchText = useDeferredValue(search.searchText);

  const filteredNodes = deferredSearchText
    ? getNodesBySearchText(nodes, search.searchText)
    : getCurrentNodeChildren(nodes, nodes[path.at(-1)]);

  useEffect(() => {
    setSearchCount(filteredNodes.length);
  }, [filteredNodes.length, setSearchCount]);

  const clearState = () => {
    setAction("");
    setActionNodeId("");
  };

  const handleContextMenuClick = useCallback(
    (event, actionNodeId) => {
      event.preventDefault();
      event.stopPropagation();
      setShowContextMenu(true);
      setPoints({
        x: event.pageX,
        y: event.pageY,
      });
      if (action === "editing") setAction("");
      if (actionNodeId) setActionNodeId(actionNodeId);
    },
    [setPoints, setShowContextMenu, action]
  );

  const handleRename = useCallback(
    (event, id) => {
      if (
        event.key !== "Enter" ||
        isDuplicateNode(filteredNodes, event.target.value)
      )
        return;
      dispatch({
        type: "rename",
        newName: event.target.value,
        id,
      });
      clearState();
    },
    [filteredNodes, dispatch]
  );

  const handlePaste = useCallback(() => {
    if (isDuplicateNode(filteredNodes, nodes[actionNodeId].name)) return;
    dispatch({
      type: "paste",
      parentId: path.at(-1),
      id: actionNodeId,
    });
    clearState();
  }, [filteredNodes, dispatch, path, actionNodeId, nodes]);

  const handleDelete = useCallback(() => {
    dispatch({
      type: "delete",
      idToDelete: actionNodeId,
      parentId: path.at(-1),
    });
    clearState();
  }, [dispatch, path, actionNodeId]);

  return (
    <Styles.NodesListWrapper
      onContextMenu={(e) => action === "copying" && handleContextMenuClick(e)}
    >
      {filteredNodes.map((node) => (
        <Node
          key={node.id}
          node={node}
          action={action}
          actionNodeId={actionNodeId}
          handleRename={handleRename}
          handleDoubleClick={() => {
            setSearch({
              ...search,
              searchText: "",
              searching: false,
            });
            setPath([...path, node.id]);
          }}
          handleContextMenuClick={(e) => {
            if (search.searchText) return;
            setAction("");
            handleContextMenuClick(e, node.id);
          }}
        />
      ))}
      {!search.searchText && <AddNode />}
      {showContextMenu && (
        <ContextMenu
          points={points}
          action={action}
          setAction={setAction}
          handleDelete={handleDelete}
          handlePaste={handlePaste}
        />
      )}
    </Styles.NodesListWrapper>
  );
});

NodesList.propTypes = {
  search: PropTypes.object,
  setSearch: PropTypes.func,
  setSearchCount: PropTypes.func,
};

export default NodesList;
