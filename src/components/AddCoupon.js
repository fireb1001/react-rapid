import React, { useState } from "react";
import { Modal, Button, Spin } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_COUPON, GET_COUPONS } from "../utils/graphql";

export default function AddCoupon(props) {
  const [localState, setLocalState] = useState({
    visible: false,
    title: "",
    url: ""
  });
  const [createCoupon, { loading }] = useMutation(CREATE_COUPON, {
    refetchQueries: [{ query: GET_COUPONS }]
  });
  const handleOK = _ => {
    setLocalState({ ...localState, visible: false });
  };
  const handleImageChange = e => {
    setLocalState({ ...localState, url: e.target.value });
  };
  const handleChange = e => {
    setLocalState({ ...localState, title: e.target.value });
  };
  return (
    <>
      <Modal
        title="Add Coupon"
        onCancel={handleOK}
        onOk={handleOK}
        visible={localState.visible}
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            console.log(localState);
            createCoupon({
              variables: {
                title: localState.title,
                published: true,
                categories: [],
                photo: localState.url ? { upload: { url: localState.url } } : {}
              }
            });
            setLocalState({
              ...localState,
              visible: false,
              title: "",
              url: ""
            });
            //props.onDone(true);
          }}
        >
          <input
            type="text"
            value={localState.title || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            value={localState.url || ""}
            onChange={handleImageChange}
          />
          <button type="submit">Add Recipe</button>
        </form>
      </Modal>
      {loading && <Spin />}
      {!loading && (
        <Button
          type="primary"
          icon="plus"
          onClick={() => {
            setLocalState({ visible: true });
          }}
        >
          Add
        </Button>
      )}
    </>
  );
}
