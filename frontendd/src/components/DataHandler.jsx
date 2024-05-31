import { Box, Typography, useTheme } from "@mui/material";
import Form from "./picHandler";
// import FlexBetween from "./FlexBetween";
function DataHandler() {
  const theme = useTheme();
  return (
    <Box
    width="100vw" 
      >
      <Box
        width={"75%"}
        backgroundColor={theme.palette.background.alt}
        p="1rem"
        m="1rem auto"
        textAlign="center">
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Color Detection
        </Typography>
      </Box>
      <Box
        width={"50%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Form />
      </Box>
    </Box>
  )
}

export default DataHandler

