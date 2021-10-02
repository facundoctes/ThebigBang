import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import React from "react";
import FolderIcon from "@material-ui/icons/Folder";
import { useHistory } from "react-router-dom";

interface RoomItemProps {
  roomId: string
}

const useStyles = makeStyles((theme) => ({
  item: {
    border: "solid Gainsboro 1px",
    marginBottom: '2px',
    borderRadius: '3px 3px 3px 3px',

    '&:hover': {
        cursor: 'pointer',
        backgroundColor: 'MediumSlateBlue',
        color: 'white',
    }
  },
}));

export default function RoomItem({roomId} : RoomItemProps) {
  const history = useHistory();
  const classes = useStyles();

  const openRoom = (roomId: string) => {
    history.push(`/room/${roomId}`);
  }

  return (
    <>
      <ListItem className={classes.item} onClick={() => openRoom(roomId)}>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="English - Any Level" secondary={'Public'} />
        <ListItemSecondaryAction>
          <AvatarGroup max={4}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
}
