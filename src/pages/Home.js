import React, { useContext, useState } from "react";
import { Col, Row, Card, Icon, Switch } from "antd";
import { AppCtxt } from "../ctx";
import {
  GET_COUPONS,
  ARCHIVE_COUPON,
  RESTORE_COUPON,
  DELETE_COUPON
} from "../utils/graphql";
import { useQuery, useMutation } from "@apollo/react-hooks";
import AddCoupon from "../components/AddCoupon";

// TODO update coupon

const CouponT = ({
  coupon: { id, title, body, status, categories, photo }
}) => {
  const { show_archived } = useContext(AppCtxt);

  const [archiveCoupon] = useMutation(ARCHIVE_COUPON, {
    refetchQueries: [{ query: GET_COUPONS }]
  });

  const [restoreCoupon] = useMutation(RESTORE_COUPON, {
    refetchQueries: [{ query: GET_COUPONS }]
  });

  const [deleteCoupon] = useMutation(DELETE_COUPON, {
    refetchQueries: [{ query: GET_COUPONS }]
  });

  return (
    status === (show_archived ? "ARCHIVED" : "PUBLISHED") && (
      <Col span={8} style={{ maxWidth: "30%" }}>
        <Card title={title} bordered={false}>
          <p>{id} </p>
          <p>{body} </p>
          <p>{status}</p>
          {photo && photo.handle && (
            <img
              src={`https://media.graphcms.com/resize=w:100,h:100/${photo.handle}`}
              alt=""
              width="100"
              height="100"
            />
          )}
          <p>{categories.map(category => category.title)}</p>
          <p>
            {status === "PUBLISHED" && (
              <Icon
                className="icon-btn"
                type="delete"
                theme="twoTone"
                twoToneColor="#A00"
                style={{ color: "#A00", fontSize: 22 }}
                onClick={() => archiveCoupon({ variables: { id: id } })}
              />
            )}
            {status === "ARCHIVED" && (
              <Icon
                className="icon-btn"
                type="delete"
                theme="filled"
                twoToneColor="#A00"
                style={{ color: "#A00", fontSize: 22 }}
                onClick={() => deleteCoupon({ variables: { id: id } })}
              />
            )}
            <Icon
              className="icon-btn"
              type="rollback"
              style={{ fontSize: 22 }}
              onClick={() => restoreCoupon({ variables: { id: id } })}
            />
          </p>
        </Card>
      </Col>
    )
  );
};

export default function Home() {
  const context = useContext(AppCtxt);
  const { loading, error, data } = useQuery(GET_COUPONS);

  const [localState, setLocalState] = useState({
    show_else: false
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <Switch
        checked={localState.show_else}
        onChange={checked => {
          setLocalState({ show_else: checked });
          context.toggleShowState(checked);
        }}
      />
      <Row>
        {data.coupons &&
          data.coupons.map(coupon => (
            <CouponT coupon={coupon} key={coupon.id} />
          ))}
      </Row>
      <AddCoupon></AddCoupon>
    </>
  );
}
