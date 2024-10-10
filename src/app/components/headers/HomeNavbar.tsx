import {
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import React, { useState, useEffect } from "react";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;

  const { authMember } = useGlobals();
  const [count, setCount] = useState<number>(0);
  const [value, setValue] = useState<boolean>(true);

  useEffect(() => {
    setCount(count + 1);
  }, [value]);

  /* HANDLERS */
  const buttonHandler = () => {
    setValue(!value);
  };

  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack
          className="menu"
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <NavLink to="/">
            <img
              className="brand-logo"
              src="/icons/dambog.svg"
              alt="Brand Logo"
            />
          </NavLink>

          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            className="links"
          >
            <Box className="hover-line">
              <NavLink to="/" activeClassName="underline">
                Home
              </NavLink>
            </Box>
            <Box className="hover-line">
              <NavLink to="/products" activeClassName="underline">
                Products
              </NavLink>
            </Box>

            {authMember && (
              <>
                <Box className="hover-line">
                  <NavLink to="/orders" activeClassName="underline">
                    Orders
                  </NavLink>
                </Box>
                <Box className="hover-line">
                  <NavLink to="/member-page" activeClassName="underline">
                    My Page
                  </NavLink>
                </Box>
              </>
            )}

            <Box className="hover-line">
              <NavLink to="/help" activeClassName="underline">
                Help
              </NavLink>
            </Box>

            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />

            {!authMember ? (
              <Stack direction="row" spacing={2}>
                <Button
                  className="signup-button"
                  variant="contained"
                  onClick={() => setSignupOpen(true)}
                >
                  SIGN UP
                </Button>
                <Button
                  className="login-button"
                  variant="contained"
                  onClick={() => setLoginOpen(true)}
                >
                  LOGIN
                </Button>
              </Stack>
            ) : (
              <img
                className="user-avatar"
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember?.memberImage}`
                    : "/icons/default-user.svg"
                }
                aria-haspopup="true"
                onClick={handleLogoutClick}
                alt="User Avatar"
              />
            )}
          </Stack>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleCloseLogout}
            onClick={handleCloseLogout}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleLogoutRequest}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Stack>

        {/* Centered Text Content */}
        <Stack
          className="header-frame"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          spacing={2}
          mt={4}
        >
          <Box className="head-main-txt">World's Most Delicious Cuisine</Box>
          <Box className="wel-txt">The Choice, not just a choice</Box>
          <Box className="service-txt">24 hours service</Box>
        </Stack>
      </Container>
    </div>
  );
}
