import React from 'react';
import { Async } from 'react-async';
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import CommuNav from '../CommuNav';
import axios from 'axios';

export default function MusicReview() {
  async function getReview() {
    let res = await axios.get('http://localhost:4000/review');
    let reviewPostData = res.data.data;
    return reviewPostData;
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box position='sticky'>
          <CommuNav />
        </Box>
        {/* 링크에 따라서 여기서 board가 바뀌어서 보여짐 */}
        <Box sx={{ flexGrow: 1 }}>
          <Async promiseFn={getReview}>
            {({ data, error, isPending }) => {
              if (isPending) return 'Loding...';
              if (error) return `Something went wrong: ${error.message}`;

              console.log(data);
              const tableHeadStyle = {
                fontWeight: '700',
                fontSize: '1rem',
              };
              return (
                <>
                  <Typography
                    variant='h2'
                    m='80px 0 10px 0'
                    // fontFamily='Copperplate'
                    // fontFamily='Papyrus'
                    // fontFamily='Lucida Handwriting'
                    fontFamily='Monaco'
                    // fontFamily='cursive'
                    // fontFamily='fantasy'
                    // fontFamily='Tahoma'
                    textAlign='center'
                  >
                    Music Review
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    mb='100px'
                    fontFamily='Nanum Gothic'
                    textAlign='center'
                  >
                    Music is my life
                  </Typography>
                  <TableContainer>
                    <Table sx={{ fontFamily: 'Nanum Gothic Coding' }}>
                      <TableHead>
                        <TableRow>
                          <TableCell align='center' style={tableHeadStyle}>
                            가수 - 곡명
                          </TableCell>
                          <TableCell align='center' style={tableHeadStyle}>
                            작성자
                          </TableCell>
                          <TableCell align='center' style={tableHeadStyle}>
                            작성일
                          </TableCell>
                          <TableCell align='center' style={tableHeadStyle}>
                            추천수
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      {data.map((reviewData: any, index: number) => {
                        return (
                          <>
                            <TableBody>
                              <TableRow>
                                <TableCell
                                  scope='row'
                                  sx={{
                                    fontWeight: '550',
                                    color: '#333',
                                    '&:hover': {
                                      cursor: 'pointer',
                                      color: 'purple',
                                      transition: 'color .2s',
                                    },
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  <img
                                    src={reviewData.charts_id.image}
                                    style={{
                                      width: 35,
                                      border: '1px solid #333',

                                      margin: '0 20px 0 30px',
                                    }}
                                  />
                                  {`${reviewData.charts_id.artist} - ${reviewData.charts_id.title}`}
                                </TableCell>
                                <TableCell align='center'>
                                  {reviewData.username}
                                </TableCell>
                                <TableCell align='center'>
                                  {/* 이건 시간까지 {reviewData.createdAt.slice(0, 16)} */}
                                  {reviewData.updatedAt.slice(0, 10)}
                                </TableCell>
                                <TableCell align='center'>
                                  {reviewData.likes.length}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </>
                        );
                      })}
                    </Table>
                  </TableContainer>
                </>
              );
            }}
          </Async>
        </Box>
      </Box>
    </>
  );
}
