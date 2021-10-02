import { Grid, Typography } from '@material-ui/core';
import React, {useContext, useEffect} from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom'
import { socketContext } from '../../Context/SocketContext';
import { PeerStreamObject, SocketContextConsumer } from '../../types/socketContextTypes';
import Header from '../Header/Header';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

export default function Room() {
    const { t } = useTranslation("common");

    const { roomId } = useParams<{roomId: string}>();
    const { joinRoom, leaveRoom, listOfPeers }: Partial<SocketContextConsumer> = useContext(socketContext);

    useEffect(() => {
        console.log('joined a room')
        joinRoom(roomId);
        return () => { leaveRoom(roomId) }
    }, [joinRoom,roomId,leaveRoom]);

    return (
        <div>
            <Header/>
            <Grid container>
                <Grid item md={8}>
                <Typography>{t("rooms.room")}: {roomId}</Typography>
                {listOfPeers && listOfPeers.map( (peerObj: PeerStreamObject) => (
                    <VideoPlayer key={peerObj.id} stream={peerObj.stream} />
                ))}
                </Grid>
                <Grid item md={4}>
                    <>
                    <Typography> Chat</Typography>
                    </>
                </Grid>
            </Grid>
        </div>
    )
}
