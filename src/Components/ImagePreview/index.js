// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AppBar from "@mui/material/AppBar";
// import Button from "@mui/material/Button";
// import CameraIcon from "@mui/icons-material/PhotoCamera";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import CssBaseline from "@mui/material/CssBaseline";
// import Grid from "@mui/material/Grid";
// import Stack from "@mui/material/Stack";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Link from "@mui/material/Link";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// const defaultTheme = createTheme();

// function Album() {
//   const [responseData, setResponseData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const FormData = require("form-data");
//         let data = new FormData();

//         let config = {
//           method: "get",
//           maxBodyLength: Infinity,
//           url: "http://192.168.20.162:1111/api/import-img/?page=1&page_size=10",
//           data: data,
//         };

//         axios
//           .request(config)
//           .then((response) => {
//             console.log(response.data.results);
//             setResponseData(response.data.results);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <>
//       <ThemeProvider theme={defaultTheme}>
//         <main>
//           <Container sx={{ py: 8 }} maxWidth="md">
//             {/* End hero unit */}
//             <Grid container spacing={4}>
//               {responseData.map((item) => (
//                 <Grid item key={item} xs={12} sm={6} md={4}>
//                   <Card
//                     sx={{
//                       height: "100%",
//                       display: "flex",
//                       flexDirection: "column",
//                     }}
//                   >
//                     <CardMedia
//                       component="div"
                      
//                       sx={{
//                         // 16:9
//                         pt: "56.25%",
//                       }}
//                       image={`http://192.168.20.162:1111/media//import/tailnt//${item.model_name}/${item.name_file}`}
//                     />
//                     <CardContent sx={{ flexGrow: 1 }}>
//                       <Typography gutterBottom variant="h5" component="h2">
//                         {item.name_file}
//                       </Typography>
//                       {/* <Typography>
//                         This is a media card. You can use this section to
//                         describe the content.
//                       </Typography> */}
//                     </CardContent>
//                     {/* <CardActions>
//                       <Button size="small">View</Button>
//                       <Button size="small">Edit</Button>
//                     </CardActions> */}
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Container>
//         </main>
//       </ThemeProvider>
//     </>
//   );
// }

// export default Album;
