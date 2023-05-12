import { Fragment, useContext } from "react";

import { useNodes } from "../../context/rootNodeContext";
import { PathContext } from "../../context/pathContext";
import * as Styles from "./styles";

function NavBox() {
  const nodes = useNodes();
  const { path, setPath } = useContext(PathContext);

  function getPath(start, end = -1) {
    return path.slice(start, end);
  }

  return (
    <Styles.NavBox>
      <Styles.BackBtn
        onClick={() => setPath(getPath(0))}
        className={path.length < 2 ? "disabled" : ""}
      />
      {path.map((bc, idx) => (
        <Fragment key={bc}>
          <Styles.Breadcrumb
            onClick={() => setPath(getPath(0, path.indexOf(bc) + 1))}
            className={idx === path.length - 1 ? "active" : ""}
          >
            {nodes[bc].name}
          </Styles.Breadcrumb>
          {idx !== path.length - 1 && <Styles.Separator>/</Styles.Separator>}
        </Fragment>
      ))}
    </Styles.NavBox>
  );
}

export default NavBox;
