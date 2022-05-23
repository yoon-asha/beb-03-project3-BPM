import { Box, Typography, CircularProgress, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Async } from "react-async";
import { useParams } from "react-router";
import CommuNav from "../CommuNav";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

export default function ColumnDetail() {
  const params = useParams();
  const [like, setLike] = useState(false);

  const getColumnPost = async () =>
    await axios
      .get(`http://localhost:4000/column/${params.columnid}`)
      .then((res) => {
        let columnDetailData = res.data.data;
        return columnDetailData;
      });

  const handleLike = (like: string) => {
    if (like === "like") {
      console.log("dasdfsZfa");
      axios
        .post(
          `http://localhost:4000/column/${params.columnid}/like`,
          {},
          {
            withCredentials: true,
          }
        )
        .then(() => {
          setLike(true);
        });
    } else if (like === "unlike") {
      axios
        .post(
          `http://localhost:4000/column/${params.columnid}/unlike`,
          {},
          {
            withCredentials: true,
          }
        )
        .then(() => {
          setLike(false);
        });
    }
  };

  return (
    <>
      <Box display="flex">
        <Box position="sticky">
          <CommuNav />
        </Box>
        <Box flexGrow={1} textAlign="center">
          <Async promiseFn={getColumnPost}>
            {({ data, error, isPending }) => {
              if (isPending) return <CircularProgress color="inherit" />;
              if (error) return `Something went wrong: ${error.message}`;

              return (
                <>
                  <Typography
                    fontSize="1.9rem"
                    m="80px 0 30px 0"
                    fontFamily="serif"
                    fontWeight="600"
                  >
                    {data.title}
                  </Typography>

                  <Box
                    sx={{
                      border: "1px solid #36AE7C",
                      //   #36AE7C
                      borderRadius: "100%",
                      width: "350px",
                      height: "350px",
                      m: "20px auto 10px",
                      p: 5,
                      display: "grid",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      //   p={2}
                      fontSize="1.1rem"
                      fontFamily="Nanum Gothic"
                    >
                      {data.chart.artist}
                    </Typography>
                    {/* <Divider sx={{ mb: 3 }} /> */}
                    <img src={data.chart.image} style={{ margin: "0 auto" }} />
                    <Typography fontSize="1rem" fontFamily="Nanum Gothic">
                      {data.chart.title}
                    </Typography>
                  </Box>

                  <Typography m="50px 0" fontSize="1.3rem" fontFamily="serif">
                    {data.body}
                  </Typography>

                  <Typography fontFamily="serif" fontSize="1.3rem" color="#333">
                    <span style={{ color: "#36AE7C" }}>critic.</span>
                    {data.username}
                  </Typography>
                  <Typography color="#888">
                    {data.updatedAt.slice(0, 10)}
                  </Typography>
                  {like ? (
                    <Button
                      sx={{ mt: 3, fontSize: 20 }}
                      onClick={() => {
                        handleLike("unlike");
                      }}
                    >
                      <ThumbUpAltIcon />
                      {data.likes}
                    </Button>
                  ) : (
                    <Button
                      sx={{ mt: 3, fontSize: 20 }}
                      onClick={() => {
                        handleLike("like");
                      }}
                    >
                      <ThumbUpOffAltIcon />
                      {data.likes}
                    </Button>
                  )}
                </>
              );
            }}
          </Async>
        </Box>
      </Box>
    </>
  );
}
