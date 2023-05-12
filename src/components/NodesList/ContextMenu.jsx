import { memo } from "react";
import { PropTypes } from "prop-types";

import * as Styles from "./styles";

const ContextMenu = memo(function ContextMenu({
  points,
  action,
  setAction,
  handleDelete,
  handlePaste,
}) {
  return (
    <Styles.ContextMenu top={points.y} left={points.x}>
      <ul>
        {action === "copying" ? (
          <li onClick={handlePaste}>Paste</li>
        ) : (
          <>
            <li onClick={() => setAction("editing")}>Rename</li>
            <li onClick={() => setAction("copying")}>Copy</li>
            <li style={{ color: "red" }} onClick={handleDelete}>
              Delete
            </li>
          </>
        )}
      </ul>
    </Styles.ContextMenu>
  );
});

ContextMenu.propTypes = {
  points: PropTypes.object,
  action: PropTypes.string,
  setAction: PropTypes.func,
  handleDelete: PropTypes.func,
  handlePaste: PropTypes.func,
};

export default ContextMenu;
