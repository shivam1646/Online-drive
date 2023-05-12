import { useState, useContext } from "react";
import { PropTypes } from "prop-types";

import * as Styles from "./styles";
import { useNodes, useNodesDispatch } from "../../context/rootNodeContext";
import { PathContext } from "../../context/pathContext";
import { isDuplicateNode, getCurrentNodeChildren } from "../../utils";

const TABS = [
  { text: "File", value: 0 },
  { text: "Folder", value: 1 },
];

function AddModal({ onClose }) {
  const [name, setName] = useState("");
  const [hasError, setHasError] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS[0].value);

  const { path } = useContext(PathContext);

  const nodes = useNodes();
  const dispatch = useNodesDispatch();

  function handleCreate() {
    const currNodeChildren = getCurrentNodeChildren(nodes, nodes[path.at(-1)]);
    if (isDuplicateNode(currNodeChildren, name)) {
      setHasError(true);
      return;
    }
    dispatch({
      type: "add",
      name,
      isFolder: !!activeTab,
      parentId: path.at(-1),
    });
    setHasError(false);
    onClose();
  }

  return (
    <Styles.ModalOverlay>
      <Styles.Modal>
        <Styles.ModalHeader>
          <Styles.CloseBtn onClick={onClose} />
        </Styles.ModalHeader>
        <Styles.ModalBody>
          <Styles.Title>Create New</Styles.Title>
          <Styles.TabsNav>
            {TABS.map((tab) => (
              <Styles.Tab
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={activeTab === tab.value ? "active" : ""}
              >
                {tab.text}
              </Styles.Tab>
            ))}
          </Styles.TabsNav>
          <Styles.InputField
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            className={hasError ? "error" : ""}
          />
          {hasError && (
            <span style={{ color: "red", fontSize: "0.8rem" }}>
              File/Folder name already exists!
            </span>
          )}
          <Styles.CreateBtn disabled={!name} onClick={handleCreate}>
            Create
          </Styles.CreateBtn>
        </Styles.ModalBody>
      </Styles.Modal>
    </Styles.ModalOverlay>
  );
}

AddModal.propTypes = {
  onClose: PropTypes.func,
};

export default AddModal;
