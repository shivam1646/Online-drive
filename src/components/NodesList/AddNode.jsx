import { useState } from "react";

import * as Styles from "./styles";
import AddBtnImg from "/src/assets/add_btn.png";
import AddModal from "../AddModal";

function AddNode() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <Styles.NodeDiv className="add" onClick={() => setShowAddModal(true)}>
        <img src={AddBtnImg} alt="Add" />
      </Styles.NodeDiv>
      {showAddModal && <AddModal onClose={() => setShowAddModal(false)} />}
    </>
  );
}

export default AddNode;
