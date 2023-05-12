import { createContext, useReducer, useContext } from "react";
import { PropTypes } from "prop-types";

const NodesContext = createContext(null);

const NodesDispatchContext = createContext(null);

export const NodesProvider = ({ children }) => {
  const [nodes, dispatch] = useReducer(nodesReducer, INITIAL_NODES);

  return (
    <NodesContext.Provider value={nodes}>
      <NodesDispatchContext.Provider value={dispatch}>
        {children}
      </NodesDispatchContext.Provider>
    </NodesContext.Provider>
  );
};

NodesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export function useNodes() {
  return useContext(NodesContext);
}

export function useNodesDispatch() {
  return useContext(NodesDispatchContext);
}

function nodesReducer(nodes, action) {
  switch (action.type) {
    case "add": {
      const node = {
        id: crypto.randomUUID(),
        name: action.name,
        childIds: action.isFolder ? [] : null,
      };
      return {
        ...nodes,
        [node.id]: node,
        [action.parentId]: {
          ...nodes[action.parentId],
          childIds: [...nodes[action.parentId].childIds, node.id],
        },
      };
    }
    case "delete": {
      const clonedNodes = { ...nodes };
      const cascadeDeleteNodes = (idToDelete) => {
        const childIds = clonedNodes[idToDelete].childIds;
        if (childIds) {
          childIds.forEach((childId) => {
            cascadeDeleteNodes(childId);
          });
        }
        delete clonedNodes[idToDelete];
      };
      cascadeDeleteNodes(action.idToDelete);
      return {
        ...clonedNodes,
        [action.parentId]: {
          ...clonedNodes[action.parentId],
          childIds: clonedNodes[action.parentId].childIds.filter(
            (childId) => childId !== action.idToDelete
          ),
        },
      };
    }
    case "rename": {
      return {
        ...nodes,
        [action.id]: {
          ...nodes[action.id],
          name: action.newName,
        },
      };
    }
    case "paste": {
      const clonedNodes = { ...nodes };
      const deepCopyPasteNodes = (id, parentId) => {
        const newNode = {
          ...clonedNodes[id],
          id: crypto.randomUUID(),
          childIds: clonedNodes[id].childIds ? [] : null,
        };
        clonedNodes[newNode.id] = newNode;
        if (clonedNodes[id].childIds) {
          clonedNodes[id].childIds.forEach((childId) => {
            deepCopyPasteNodes(childId, newNode.id);
          });
        }
        clonedNodes[parentId] = {
          ...clonedNodes[parentId],
          childIds: [...clonedNodes[parentId].childIds, newNode.id],
        };
      };
      deepCopyPasteNodes(action.id, action.parentId);
      return clonedNodes;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const INITIAL_NODES = {
  0: {
    id: "0",
    name: "root",
    childIds: [1, 2],
  },
  1: {
    id: "1",
    name: "Apps",
    childIds: [],
  },
  2: {
    id: "2",
    name: "Budget.jpg",
    childIds: null,
  },
};
