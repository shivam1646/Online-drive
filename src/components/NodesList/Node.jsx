import { memo } from "react";
import { PropTypes } from "prop-types";

import FolderImg from "/src/assets/folder.png";
import FileImg from "/src/assets/file.png";
import * as Styles from "./styles";
import { useNodes } from "../../context/rootNodeContext";

const Node = memo(function Node({
  node,
  action,
  actionNodeId,
  handleRename,
  handleContextMenuClick,
  handleDoubleClick,
}) {
  const nodes = useNodes();

  return (
    <Styles.NodeDiv
      onDoubleClick={() => {
        if (!node.childIds) return;
        handleDoubleClick();
      }}
      className={node.childIds ? "folder" : "file"}
      onContextMenu={handleContextMenuClick}
    >
      <img src={node.childIds ? FolderImg : FileImg} alt={node.name} />
      {!node.childIds && (
        <Styles.FileExt>
          {node.name.indexOf(".") > -1
            ? node.name.substring(node.name.indexOf("."))
            : "N/A"}
        </Styles.FileExt>
      )}
      {action === "editing" && node.name === nodes[actionNodeId].name ? (
        <Styles.InputField
          defaultValue={node.name}
          onKeyDown={(e) => handleRename(e, node.id)}
        />
      ) : (
        <Styles.NodeText>{node.name}</Styles.NodeText>
      )}
    </Styles.NodeDiv>
  );
});

Node.propTypes = {
  node: PropTypes.object,
  action: PropTypes.string,
  actionNodeId: PropTypes.string,
  handleRename: PropTypes.func,
  handleContextMenuClick: PropTypes.func,
  handleDoubleClick: PropTypes.func,
};

export default Node;
