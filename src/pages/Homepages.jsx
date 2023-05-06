import {
  Box,
  Button,
  Grid,
  GridItem,
  Input,
  useToast,
  Select,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const Homepages = ({ resultData }) => {
  const [negaraTujuan, setNegaraTujuan] = useState([]);
  const [pelabuhanTujuan, setPelabuhanTujuan] = useState([]);
  const [results, setResults] = useState({});

  // resultData(results);

  const toast = useToast();

  const fetchNegaraTujuan = async () => {
    const negaraTujuanData = await axios.get(
      "https://insw-dev.ilcs.co.id/n/negara?ur_negara=IND"
    );
    setNegaraTujuan(negaraTujuanData.data.data);
  };

  const renderNegaraTujuan = () => {
    return negaraTujuan.map((val) => {
      return (
        <option key={val.ur_negara} value={val.ur_negara}>
          {val.ur_negara}
        </option>
      );
    });
  };

  const fetchPelabuhanTujuan = async () => {
    const pelabuhanTujuanData = await axios.get(
      "https://insw-dev.ilcs.co.id/n/pelabuhan?kd_negara=ID"
    );
    setPelabuhanTujuan(pelabuhanTujuanData.data.data);
  };

  const renderPelabuhanTujuan = () => {
    return pelabuhanTujuan.map((val) => {
      return <option value={val.ur_pelabuhan}>{val.ur_pelabuhan}</option>;
    });
  };

  const formikPerusahaan = useFormik({
    initialValues: {
      npwp: "",
      nama: "",
      transaksi: "",
      negaraTujuan: "",
      pelabuhanTujuan: "",
    },
    onSubmit: async (values) => {
      try {
        const dataPerusahaan = {
          npwp: values.npwp,
          nama: values.nama,
          transaksi: values.transaksi,
          negaraTujuan: values.negaraTujuan,
          pelabuhanTujuan: values.pelabuhanTujuan,
        };

        // await axios.post(
        //   "https://insw-dev.ilcs.co.id/n/simpan",
        //   dataPerusahaan
        // );
        console.log("Karena post ke url simpan di limited maka saya console disini: ")
        console.log(dataPerusahaan)
        setResults(dataPerusahaan);

        toast({
          title: "Menyimpan data sukses",
          status: "success",
        });
      } catch (error) {
        toast({
          title: "Error menyimpan data",
          status: "error",
        });
      }
    },
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formikPerusahaan.setFieldValue(name, value);
  };

  useEffect(() => {
    fetchNegaraTujuan();
    fetchPelabuhanTujuan();
  });
  return (
    <Box>
      <Grid
        marginLeft={{ base: "12px", md: "20px", lg: "26px" }}
        templateColumns={"25% 75%"}
        gap={{ base: "12px", md: "20px", lg: "26px" }}
      >
        <GridItem border={"1px solid black"} padding={"30px"} rowGap={"30px"}>
          <Link to="/">
            <Text color={"black"} paddingBottom={"30px"}>
              Perusahaan
            </Text>
          </Link>
          <Link to="/barang">
            <Text color={"black"} paddingBottom={"30px"}>
              Barang
            </Text>
          </Link>
        </GridItem>
        <GridItem border={"1px solid black"} padding={"30px"} rowGap={"30px"}>
          <Grid templateColumns={"25% 25% 25% 25%"}>
            <GridItem>
              <Text color={"black"} paddingBottom={"30px"}>
                NPWP
              </Text>
              <Text color={"black"} paddingBottom={"30px"}>
                NAMA
              </Text>
              <Text color={"black"} paddingBottom={"30px"}>
                TRANSAKSI
              </Text>
              <Text color={"black"} paddingBottom={"30px"}>
                NEGARA TUJUAN
              </Text>
              <Text color={"black"} paddingBottom={"30px"}>
                PELABUHAN TUJUAN
              </Text>
            </GridItem>
            <GridItem>
              <Input
                name="npwp"
                onChange={formChangeHandler}
                type="text"
                placeholder="Input disini"
                marginBottom={"10px"}
                maxWidth={"80%"}
              />
              <Input
                name="nama"
                onChange={formChangeHandler}
                type="text"
                placeholder="Input disini"
                marginBottom={"10px"}
                maxWidth={"80%"}
              />
              <Select
                name="transaksi"
                onChange={formChangeHandler}
                placeholder="Pilih salah satu"
                marginBottom={"10px"}
                maxWidth={"80%"}
              >
                <option value="ekspor">EKSPOR</option>
                <option value="impor">IMPOR</option>{" "}
              </Select>
              <Select
                name="negaraTujuan"
                onChange={formChangeHandler}
                placeholder="Pilih salah satu"
                marginBottom={"10px"}
                maxWidth={"80%"}
              >
                {renderNegaraTujuan()}
              </Select>
              <Select
                name="pelabuhanTujuan"
                onChange={formChangeHandler}
                placeholder="Pilih salah satu"
                marginBottom={"10px"}
                maxWidth={"80%"}
              >
                {renderPelabuhanTujuan()}
              </Select>
            </GridItem>
            <GridItem></GridItem>
            <GridItem textAlign={"right"}>
              <Link to="/barang">
                <Button
                  marginTop={"90%"}
                  type={"submit"}
                  _hover={false}
                  onClick={formikPerusahaan.handleSubmit}
                  isDisabled={
                    !formikPerusahaan.values.npwp ||
                    !formikPerusahaan.values.nama ||
                    !formikPerusahaan.values.transaksi ||
                    !formikPerusahaan.values.negaraTujuan ||
                    !formikPerusahaan.values.pelabuhanTujuan
                  }
                >
                  Send
                </Button>
              </Link>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Homepages;
