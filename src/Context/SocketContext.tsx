import React, {createContext, useState, useRef, useEffect, useCallback} from "react";
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { PeerStreamObject, Room, SocketContextConsumer } from "../types/socketContextTypes";
import * as SocketActions from '../types/socketActions';


const socketContext = createContext<Partial<SocketContextConsumer>>({});

const socket = io('http://localhost:5000');

interface SocketContextProviderProps {
    children: any
}

export default function SocketContextProvider({children} : SocketContextProviderProps) {
    const [serverConnected, setServerConnected] = useState(false);
    const [stream, setStream] = useState<MediaStream | undefined>(undefined);

    const [listOfPeers, setListOfPeers] = useState<PeerStreamObject[]>([]);
 
    const myVideo = useRef<any>();
    const userVideo = useRef<any>();

    const peersRef = useRef<PeerStreamObject[]>([]);
    const streamRef = useRef<MediaStream | undefined>(undefined);

    // rooms
    const [roomList, setRoomList] = useState<Room[]>([]);

    const callUser = ({idUser, name}: any) => {
        console.log('call user', streamRef.current)
        const peer = new Peer({ initiator: true, trickle: false, stream: streamRef.current});

        peer.on('signal', (data: any) =>{
            console.log('send a signal', idUser, data);
            socket.emit(SocketActions.USER_SIGNAL, {idUser, data});
        })

        peer.on('stream', (currentStream: any) => {
            console.log('stream received', peersRef.current);
            const peerObject = peersRef.current.find( (o:PeerStreamObject) => o.id === idUser) 
            if(peerObject){
                peerObject.stream = currentStream;
                console.log('stream received2', peersRef.current);
                setListOfPeers([...peersRef.current]);
            }            
        })

        const peerObject: PeerStreamObject = { id: idUser, peer, stream: undefined }
        peersRef.current.push(peerObject);
        console.log('peers ref', peersRef.current);
        setListOfPeers(peersRef.current); //[...listIfPeers, peerObject]
    };
 
    const answerCall = ({idUser, data}: any) => {
        console.log('answer call', streamRef.current);
        const peer = new Peer({ initiator: false, trickle: false, stream: streamRef.current});
        
        peer.on('signal', (data : any) =>{
            console.log('send a signal', idUser, data);
            socket.emit(SocketActions.USER_SIGNAL, {idUser, data})
        })

        peer.on('stream', (currentStream: any) => {
            console.log('stream received', peersRef.current);
            const peerObject = peersRef.current.find( (o:PeerStreamObject) => o.id === idUser) 
            if(peerObject){
                peerObject.stream = currentStream;
                console.log('stream received2', peersRef.current);
                setListOfPeers([...peersRef.current]);
            }     
        })

        peer.signal(data);
        
        const peerObject: PeerStreamObject = { id: idUser, peer, stream: undefined }
        peersRef.current.push(peerObject);
        console.log('peers ref', peersRef.current);
        setListOfPeers(peersRef.current); //[...listIfPeers, peerObject]
    };

    const signalReicived = ({idUser, data}: any) =>{
        console.log('recived signal')
        const peer = peersRef.current.find((o: PeerStreamObject) => o.id === idUser)?.peer
        if (peer) {
            console.log('already connected')
            peer.signal(data);
        } else {
            answerCall({idUser, data});
        }
    }

    const userLeftRoom = ({idUser}: any) => {
        const peerObjIndex = peersRef.current.findIndex((o:PeerStreamObject) => o.id === idUser);
        if(peerObjIndex > -1){
            peersRef.current[peerObjIndex].peer.destroy();
        }

        const a = peersRef.current.splice(peerObjIndex, 1);
        setListOfPeers([...peersRef.current])
        console.log('user left room',peersRef.current,peerObjIndex, a);
    }

    const leaveRoom = useCallback((roomId: string) => {      
        peersRef.current.forEach((o:PeerStreamObject) => o.peer.destroy())  

        peersRef.current = [];
        setListOfPeers([]);

        if(streamRef.current){
            streamRef.current.getTracks().forEach(track => track.stop());
        }
        
        console.log('leave room');
        socket.emit(SocketActions.LEAVE_ROOM, {roomId});
    },[]);

    const joinRoom = useCallback((roomId: string) => {
        navigator.mediaDevices.getUserMedia({video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user'
          }, audio: true}).then((currentStream) => {
            streamRef.current = currentStream;
            setStream(currentStream);
            // myVideo.current.srcObject = currentStream;
        });

        console.log('send join room');
        socket.emit(SocketActions.JOIN_ROOM, {roomId});
    },[]);

    const getRoomList = () => {
        setServerConnected(true);
        socket.emit(SocketActions.GET_ROOMS);
    }

    const receivedRoomList = (roomList: Room[]) => {
        setRoomList(roomList);
    }

    useEffect(()=>{
        // GENERAL
        socket.on(SocketActions.CONNECTED, getRoomList);
        socket.on(SocketActions.ROOM_LIST, receivedRoomList);

        // ROOM CALLS
        socket.on(SocketActions.USER_JOINED_ROOM, callUser);
        socket.on(SocketActions.USER_SIGNAL, signalReicived);
        socket.on(SocketActions.USER_LEFT_ROOM, userLeftRoom);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <socketContext.Provider value={{listOfPeers, myVideo, userVideo, roomList, stream, serverConnected, callUser, leaveRoom, answerCall, joinRoom}}>
            {children}
        </socketContext.Provider>
    )
}

export { socketContext, SocketContextProvider }
