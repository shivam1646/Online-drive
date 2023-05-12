export const getNodesBySearchText = (nodes, searchText) => {
  if (!nodes) return;
  return Object.values(nodes).filter((node) =>
    node.name.toLowerCase().includes(searchText.toLowerCase())
  );
};

export const getCurrentNodeChildren = (nodes, currNode) => {
  if (!nodes) return;
  return currNode.childIds.map((childId) => nodes[childId]);
};

export const isDuplicateNode = (nodes, nodeToBeAdded) => {
  return nodes.some((node) => node.name === nodeToBeAdded);
};
