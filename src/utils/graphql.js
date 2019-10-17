import { gql } from "apollo-boost";

export const GET_COUPONS = gql`
  query getCoupons {
    coupons {
      id
      title
      body
      status
      categories(first: 1) {
        title
      }
      photo {
        handle
      }
    }
  }
`;

export const DELETE_COUPON = gql`
  mutation deleteCoupon($id: ID!) {
    deleteCoupon(where: { id: $id }) {
      id
    }
  }
`;

export const ARCHIVE_COUPON = gql`
  mutation archiveCoupon($id: ID!) {
    updateCoupon(where: { id: $id }, data: { status: ARCHIVED }) {
      status
    }
  }
`;

export const RESTORE_COUPON = gql`
  mutation restorCoupon($id: ID!) {
    updateCoupon(where: { id: $id }, data: { status: PUBLISHED }) {
      status
    }
  }
`;

export const UPDATE = gql`
  mutation updateCoupon($id: ID!, $data: CouponUpdateInput!) {
    updateCoupon(data: $data, where: { id: $id }) {
      id
    }
  }
`;

export const CREATE_COUPON = gql`
  mutation createCoupon(
    $title: String!
    $body: String
    $photo: AssetCreateOneWithoutPhotoCouponInput
    $categories: [CategoryCreateWithoutCouponInput!]
  ) {
    createCoupon(
      data: {
        title: $title
        body: $body
        status: PUBLISHED
        categories: { create: $categories }
        photo: $photo
      }
    ) {
      id
    }
  }
`;
