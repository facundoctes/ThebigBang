import { IconButton, Menu, MenuItem } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";

export default function LanguageMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [, i18n] = useTranslation('common');

    const handleOnClose = () => {
        setAnchorEl(null)
    }

    const handleOnClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    }

    const changeLanguage = (event: any) => {
        i18n.changeLanguage(event.target.childNodes[0].data)
        setAnchorEl(null);
    }

    return (
    <>
      <IconButton color="secondary" aria-label="language" component="span" onClick={handleOnClick}>
        <MdLanguage />
      </IconButton>
      <Menu id="language-menu" keepMounted open={Boolean(anchorEl)} onClose={handleOnClose} anchorEl={anchorEl}>
        <MenuItem onClick={changeLanguage}>en</MenuItem>
        <MenuItem onClick={changeLanguage}>es</MenuItem>
      </Menu>
    </>
  );
}
