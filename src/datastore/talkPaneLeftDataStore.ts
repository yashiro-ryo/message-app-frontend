// types
type Talkroom = { talkroomId: number; talkroomName: string };
type Talkrooms = Array<Talkroom>;

// TalkpaneLeft
var choicedTalkroomId: number = 0;
var talkrooms = new Array<Talkroom>();

export function setChoicedTalkroomid(id: number) {
  choicedTalkroomId = id;
}

export function getChoicedTalkroomId(): number {
  return choicedTalkroomId;
}

export function setTalkrooms(talkroom: Talkrooms) {
  talkrooms = talkroom;
}

export function getTalkroom(): Array<Talkroom>{
  return talkrooms
}
