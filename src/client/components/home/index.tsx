import { ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Header/Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Chore Mate
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              color="inherit"
              onClick={() => navigate("/login")}
              sx={{ textTransform: "none", fontSize: "1rem" }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate("/signup")}
              sx={{ textTransform: "none", fontSize: "1rem" }}
            >
              Sign Up
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}></Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "#fff",
          borderTop: "1px solid #e0e0e0",
          py: 3,
          mt: 4,
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" spacing={4} sx={{ mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Todo MERN
              </Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                Manage your tasks efficiently
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                Links
              </Typography>
              <Button
                color="inherit"
                size="small"
                onClick={() => navigate("/")}
              >
                Home
              </Button>
              <Button
                color="inherit"
                size="small"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Box>
          </Stack>
          <Box sx={{ borderTop: "1px solid #e0e0e0", pt: 2, mt: 2 }}>
            <Typography
              variant="body2"
              sx={{ color: "#999", textAlign: "center" }}
            >
              © 2026 Chore Mate. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
