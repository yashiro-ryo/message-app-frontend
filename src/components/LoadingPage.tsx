import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import '../style/loading-page.scss'

export default function LoadingPage() {
  const [percent, setPercent] = useState(0);
  for(var i = 0;i < 100;i++){
    setInterval(() => {
      setPercent(i);
    }, 500);
  }
  return (
    <div className="loading-page">
      <ProgressBar animated variant="info" now={percent}></ProgressBar>
      <p>ロード中</p>
    </div>
  );
}
