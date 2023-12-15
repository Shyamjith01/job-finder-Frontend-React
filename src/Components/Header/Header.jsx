/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/logo/Indeed.png";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/UserSlice";
import Footer from "../Footer/Footer";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const [headerButtonText, setheaderButtonText] = useState("Post a job");
  const pages = [
    {
      value: "Home",
      link: "/",
    },
    {
      value: "salary guide",
      link: "/salaryGuide",
    }, 
    {
      value:'Saved jobs',
      link:'/saved-jobs'
    }
  ];
  const [isHomePage, setisHomePage] = useState(true);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOptionChoose = (option) => { 
    if (option === "Logout") {
      navigate("/login");
      dispatch(logout());
    }
  };

 

  return (
    <div>
      <AppBar
        style={{ backgroundColor: "white", color: "black" }}
        position="static"
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters> 
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton> 
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.value} onClick={handleCloseNavMenu}>
                    <Link to={page.link} textAlign="center">
                      {page.value}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box> 
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.value}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  <Link
                    to={page.link}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {page.value}
                  </Link>
                </Button>
              ))}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link
                to={location.pathname == "/" ? "/employer" : "/"}
                style={{ textDecoration: "none", color: "black" }}
              >
                {location.pathname == "/" ? "Employer / Post job" : "Search jobs"}{" "}
              </Link>
              <hr style={{ margin: "0 12px", height: "1.5rem" }} />
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleOptionChoose(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Header;
