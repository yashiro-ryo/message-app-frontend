// TalkPaneMain
type Talk = {
  talkroomId: number;
  sentUserId: number;
  msgBody: string;
  sentTime: number;
};

var talk = new Array<Talk>();

export function setTalk(contents: Array<Talk>) {
  talk = contents;
}

export function getChoicedTalkroomId(): Array<Talk> {
  return talk;
}
