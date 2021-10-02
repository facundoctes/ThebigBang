import React from "react";
import { Avatar, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: "purple",
  },
  userName: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(3),
  },
}));

export default function LoginMenu() {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.userName}>
        Facundo Gomez Gottschalk
      </Typography>

      <Avatar className={classes.avatar}>Fa</Avatar>
    </>
  );
}
