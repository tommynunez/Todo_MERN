import React from "react";
import { Card, Container, List, ListItemButton } from "@mui/material";
import hero3 from "@assets/images/hero-bg/hero-5.jpg";
import hero6 from "@assets/images/hero-bg/hero-1.jpg";
import { Outlet, useLocation } from "react-router-dom";

export const UnauthenticatedLayout = () => {
  const currentPath = useLocation().pathname.replace("/", "");

  const findBg = (path: string) => {
    switch (path) {
      case "email-confirmation":
        return hero6;
      case "forgot-password":
        return hero6;
      case "login":
        return hero6;
      case "reset-password":
        return hero3;
    }
  };

  const containerSize = () => {
    switch (currentPath) {
      case "registration":
        return "md";
      default:
        return "sm";
    }
  };

  return (
    <>
      <div className="app-wrapper min-vh-100 bg-white">
        <div className="hero-wrapper w-100 bg-composed-wrapper bg-light-pure min-vh-100">
          <div className="flex-grow-1 w-100 d-flex align-items-center">
            <div
              className="bg-composed-wrapper--image opacity-6"
              style={{ backgroundImage: "url(" + findBg(currentPath) + ")" }}
            />
            <div className="bg-composed-wrapper--bg bg-second opacity-7" />
            <div className="bg-composed-wrapper--bg bg-premium-dark opacity-5" />
            <div className="bg-composed-wrapper--content p-3 p-md-5">
              <Container maxWidth={containerSize()}>
                <Card className="rounded-sm modal-content p-3 bg-white-10">
                  <Card className="rounded-sm shadow-none font-size-sm p-3 p-sm-0">
                    <Outlet />
                  </Card>
                </Card>
              </Container>
            </div>
          </div>
          <div className="hero-footer w-100 pb-4">
            <Container>
              <div className="py-3 d-block d-lg-flex font-size-xs justify-content-between">
                <div className="text-center d-block mb-3 mb-md-0 text-white">
                  Copyright &copy; 2020 - UiFort.com
                </div>
                <List
                  component="div"
                  className="nav-transparent text-nowrap d-flex justify-content-center"
                >
                  <ListItemButton
                    component="a"
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                  >
                    Privacy Policy
                  </ListItemButton>
                  <ListItemButton
                    component="a"
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                  >
                    Terms of Service
                  </ListItemButton>
                </List>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};
