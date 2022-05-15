import React from "react";

type Props = {
  isVisible: boolean;
};

export default function ErrorPage(props: Props) {
  return (
    <div className="error-page">
      {props.isVisible ? <p>接続されていません</p> : ""}
    </div>
  );
}
