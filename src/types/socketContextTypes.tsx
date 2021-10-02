import Peer from "simple-peer";

// ROOMS
export enum Language {
  English,
  Spanish
}

export interface Room {
  id: string,
  name: string,
  moderatorId: string,
  language: Language,
}

// CALLS
export interface SocketContextConsumer {
  listOfPeers: PeerStreamObject[];
  myVideo: any;
  userVideo: any;
  stream: any;
  callEnded: any;
  callUser: any;
  leaveRoom: any;
  answerCall: any;
  serverConnected: any;
  joinRoom: any;
  roomList: Room[];
}

export interface PeerStreamObject {
  id: string;
  peer: Peer.Instance;
  stream: MediaStream | undefined;
}
