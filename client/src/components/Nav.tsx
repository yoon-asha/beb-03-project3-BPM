import React from "react";
import {
  Grid,
  InputBase,
  IconButton,
  AppBar,
  Toolbar,
  Tooltip,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// icons
import SearchIcon from "@mui/icons-material/Search";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export default function Nav() {
  const theme = useTheme();
  const userInfo = useSelector((state: any) => state.userReducer).data;
  return (
    <>
      <AppBar
        position="sticky"
        sx={{ bgcolor: "#333", zIndex: theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item color={"#fff"} xs={2}>
              <Link to="/">
                <p style={{ color: "#fff" }}>Logo</p>
              </Link>
            </Grid>
            <Grid item xs={7} textAlign="center">
              <InputBase
                placeholder="검색어를 입력하세요"
                sx={{
                  color: "#eee",
                  padding: "0.5em 2em",
                  bgcolor: "#222",
                  mr: "10px",
                  width: "20vw",
                }}
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon sx={{ color: "#fff", fontSize: "1.2em" }} />
              </IconButton>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{ display: "flex", justifyContent: "space-evenly" }}
            >
              {/* chart 버튼 */}
              <Link to="/chart">
                <Tooltip title="차트">
                  <IconButton sx={{ color: "#fff" }}>
                    <InsertChartIcon />
                  </IconButton>
                </Tooltip>
              </Link>

              {/* community 버튼 */}
              <Link to="/community/627b5e9dd6b52cc4fe03a75d">
                <Tooltip title="커뮤니티">
                  <IconButton>
                    <GroupsIcon sx={{ color: "#fff" }} />
                  </IconButton>
                </Tooltip>
              </Link>

              {/* wallet 버튼 */}
              <Link to="/signin">
                <Tooltip title="로그인">
                  <IconButton>
                    <AccountBalanceWalletIcon sx={{ color: "#fff" }} />
                  </IconButton>
                </Tooltip>
              </Link>

              {/* mypage 버튼 */}
              {userInfo !== null ? (
                <Link to="/mypage">
                  <Tooltip title="마이페이지">
                    <IconButton>
                      <AccountBoxIcon sx={{ color: "#fff" }} />
                    </IconButton>
                  </Tooltip>
                </Link>
              ) : (
                <Tooltip title="마이페이지">
                  <IconButton
                    onClick={() => {
                      alert("로그인 해주세요");
                    }}
                  >
                    <AccountBoxIcon sx={{ color: "#fff" }} />
                  </IconButton>
                </Tooltip>
              )}

              {/* 
              버튼 누르는 효과 더 잘보이고 아래 버튼 명 나오는거
              > 대신 모바일 버전은 따로 만들어야 될 듯
              위에거를 모바일 아래를 풀화면 으로 사용해도 괜찮을 듯 하지만
              우선은 이렇게,,
              <BottomNavigation showLabels sx={{ bgcolor: '#333' }}>
                <BottomNavigationAction
                  sx={{ color: '#fff' }}
                  label='chart'
                  icon={<InsertChartIcon />}
                ></BottomNavigationAction>
                <BottomNavigationAction
                  sx={{ color: '#fff' }}
                  label='community'
                  icon={<GroupsIcon />}
                ></BottomNavigationAction>
                <BottomNavigationAction
                  sx={{ color: '#fff' }}
                  label='wallet'
                  icon={<AccountBalanceWalletIcon />}
                ></BottomNavigationAction>
                <BottomNavigationAction
                  sx={{ color: '#fff' }}
                  label='my'
                  icon={<AccountBoxIcon />}
                ></BottomNavigationAction>
              </BottomNavigation> */}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}
