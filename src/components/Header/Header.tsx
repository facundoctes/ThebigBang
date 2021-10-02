import React from "react";
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useTranslation } from "react-i18next";
import LanguageMenu from "./LanguageMenu/LanguageMenu";
import LoginMenu from "./LoginMenu/LoginMenu";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((thene) => ({
  title: {
    flexGrow: 1,
    cursor: "pointer"
  },
}));

export default function Header() {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation("common");

  const goToMain = () => {
    history.push("/")
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title} onClick={goToMain}>
          TheBigBang
        </Typography>
        <Button variant="contained" color="secondary" startIcon={<AddIcon />}>
          {t("header.createRoom")}
        </Button>

        <LoginMenu />
        <LanguageMenu />

      </Toolbar>
    </AppBar>
  );
}
