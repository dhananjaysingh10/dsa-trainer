import React, { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
// import VerifiedIcon from '@mui/icons-material/Verified';
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";


import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 240;

function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [leetcodeId, setLeetcodeId] = useState("");
  const [isVerified, setIsVerified] = useState(false); // For demo

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top App Bar */}
      {/* <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            User Profile Dashboard
          </Typography>
        </Toolbar>
      </AppBar> */}

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ padding: 2 }}>
          <PersonIcon sx={{ fontSize: 32, mb: 1 }} />
          <Typography variant="h6">Welcome User</Typography>
        </Box>
        <Divider />
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          orientation="vertical"
          sx={{ mt: 2 }}
        >
          <Tab label="LeetCode Setup" />
          <Tab label="Past Contests" />
        </Tabs>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px`, mt: 8 }}
      >
        {activeTab === 0 && (
          <Box sx={{ maxWidth: 500 }}>
            <Typography variant="h5" gutterBottom>
              Link your LeetCode ID
            </Typography>
            <TextField
              label="LeetCode Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={leetcodeId}
              onChange={(e) => setLeetcodeId(e.target.value)}
            />
            <Button variant="contained" color="primary">
              Verify ID
            </Button>
            {isVerified && (
              <Box mt={2} display="flex" alignItems="center" color="green">
                <VerifiedUserIcon  sx={{ mr: 1 }} />
                <Typography variant="body1">Verified</Typography>
              </Box>
            )}
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Past Participated Contests
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Contest Code</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Mock data: replace with real later */}
                  {[
                    { code: "ABC123", date: "2025-06-01", status: "Completed", score: 78 },
                    { code: "XYZ789", date: "2025-07-10", status: "Completed", score: 92 },
                  ].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ProfileDashboard;
