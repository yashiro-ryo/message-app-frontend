import React from "react";
import '../../../style/TalkPage/TalkPageMainHeader.scss'

type Props = {
  talkName: string
}

function TalkPageMainHeader(props: Props){
  return (
    <div className="talk-name">
      <p>{props.talkName}</p>
    </div>
  )
}

export default TalkPageMainHeader;
