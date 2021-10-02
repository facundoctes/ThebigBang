import {
  Container,
  List,
  ListSubheader,
  Grid,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { socketContext } from "../../Context/SocketContext";
import RoomItem from "./RoomItem/RoomItem";

const useStyle = makeStyles((theme) => ({
  searchMenu: {
    border: "purple 1px solid",
    marginTop: "20px",
    padding: "10px",
    borderRadius: "4px 4px 4px 4px",
  },
}));

export default function RoomList() {
  const { roomList } = useContext(socketContext);
  const { t } = useTranslation("common");

  const classes = useStyle();

  return (
    <Container maxWidth="lg">
      <Grid container alignItems="center" className={classes.searchMenu}>
        <Select label="Select a Language" autoWidth>
          <MenuItem>English</MenuItem>
          <MenuItem>Spanish</MenuItem>
        </Select>
        <TextField label="Search Room" />
        <TextField label="participants Name" />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Show filled" />
      </Grid>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {t("rooms.rooms")}
          </ListSubheader>
        }
      >
        {roomList &&
          roomList.map((room, index) => (
            <RoomItem key={index} roomId={room.id} />
          ))}
      </List>
    </Container>
  );
}
