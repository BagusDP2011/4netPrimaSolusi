import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Homepages from "./pages/Homepages";
import Barang from "./pages/Query";


function App() {
  return (
    <Box>
      <Box
        marginTop={{ base: "12px", md: "20px", lg: "26px" }}
        maxWidth={"90%"}
        width={"90%"}
        height={"90%"}
        maxHeight={"90%"}
      >
        <Routes>
          {/* <Route path="/*" element={<NotFound />} /> */}
          <Route path="/" element={<Homepages />} />
          <Route path="/barang" element={<Barang />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
