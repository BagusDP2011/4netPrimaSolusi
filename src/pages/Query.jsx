import {
  Box,
  Button,
  Grid,
  GridItem,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Barang = ({ resultData }) => {
  const [tarif, setTarif] = useState([]);
  const [HSCode, setHSCode] = useState([]);
  const [resultsBarang, setResultsBarang] = useState([]);

  const toast = useToast();

  const fetchTarif = async () => {
    const tarifData = await axios.get(
      "https://insw-dev.ilcs.co.id/n/tarif?hs_code=22030091"
    );
    setTarif(tarifData.data.data);
  };

  const fetchHSCodeDetail = async () => {
    const HSCodeData = await axios.get(
      "https://insw-dev.ilcs.co.id/n/barang?hs_code=01063300"
    );
    setHSCode(HSCodeData.data.data);
    // console.log(HSCode)
  };

  const formikBarang = useFormik({
    initialValues: {
      jumlahBarang: "",
      hargaBarang: "",
    },
    onSubmit: async (values) => {
      try {
        const dataBarang = {
          jumlahBarang: values.jumlahBarang,
          hargaBarang: values.hargaBarang,
        };

        // const response = await axios.post(
        //   "https://insw-dev.ilcs.co.id/n/simpan",
        //   dataBarang
        // );

        console.log(
          "Karena post ke url simpan di limited maka saya console disini: "
        );
        console.log(dataBarang);
        setResultsBarang(dataBarang);
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
    formikBarang.setFieldValue(name, value);
  };

  useEffect(() => {
    fetchTarif();
    fetchHSCodeDetail();
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
          <Grid templateRows={"50% 50%"}>
            <GridItem>
              <Grid templateColumns={"25% 25% 25% 25%"}>
                <GridItem>
                  <Text color={"black"} paddingBottom={"30px"}>
                    HS CODE
                  </Text>
                  <Text color={"black"} paddingBottom={"30px"}>
                    JUMLAH BARANG
                  </Text>
                  <Text color={"black"} paddingBottom={"30px"}>
                    TARIF*
                  </Text>
                  <Text color={"black"} paddingBottom={"30px"}>
                    TOTAL HARGA
                  </Text>
                  <Text color={"black"} paddingBottom={"30px"} />
                </GridItem>
                <GridItem gridRowGap={"10px"}>
                  <Input
                    type="text"
                    name="hs_code"
                    placeholder={tarif[0]?.hs_code}
                    marginBottom={"10px"}
                    maxWidth={"80%"}
                    isDisabled={true}
                    onChange={formChangeHandler}
                    value={tarif[0]?.hs_code}
                  />
                  <Input
                    type="text"
                    name="jumlahBarang"
                    placeholder="Input disini"
                    marginBottom={"10px"}
                    maxWidth={"80%"}
                    onChange={formChangeHandler}
                  />
                  <Input
                    type="text"
                    placeholder={
                      resultData?.transaksi === "ekspor"
                        ? tarif[0]?.bk + "%"
                        : tarif[0]?.bm + "%"
                    }
                    isDisabled={true}
                    marginBottom={"10px"}
                    maxWidth={"80%"}
                  />

                  <Input
                    type="text"
                    placeholder="Kalkulasi"
                    marginBottom={"10px"}
                    maxWidth={"80%"}
                    isDisabled={true}
                  />
                </GridItem>
                <GridItem>
                  <Input
                    type="text"
                    placeholder={HSCode[0]?.uraian_id}
                    marginBottom={"10px"}
                    maxWidth={"80%"}
                    isDisabled={true}
                  />
                  <Text color={"black"} paddingBottom={"30px"}>
                    HARGA BARANG
                  </Text>
                  <Text color={"black"} paddingBottom={"30px"}>
                    TARIF PPN*
                  </Text>
                </GridItem>
                <GridItem>
                  <Input
                    type="text"
                    placeholder={HSCode[0]?.sub_header}
                    isDisabled={true}
                    marginBottom={"10px"}
                    marginLeft={"20%"}
                    maxWidth={"80%"}
                  />
                  <Input
                    type="text"
                    name="hargaBarang"
                    placeholder="Isi disini"
                    marginBottom={"10px"}
                    marginLeft={"20%"}
                    maxWidth={"80%"}
                    onChange={formChangeHandler}
                  />
                  <Input
                    type="text"
                    placeholder={
                      resultData?.transaksi === "ekspor"
                        ? tarif[0]?.ppnbk + "%"
                        : tarif[0]?.ppnbm + "%"
                    }
                    marginBottom={"10px"}
                    marginLeft={"20%"}
                    maxWidth={"80%"}
                    isDisabled={true}
                  />
                  <Button
                    marginTop={"60%"}
                    marginLeft={"50%"}
                    type={"submit"}
                    _hover={false}
                    onClick={formikBarang.handleSubmit}
                    isDisabled={
                      !formikBarang.values.jumlahBarang ||
                      !formikBarang.values.hargaBarang
                    }
                  >
                    Add
                  </Button>
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem>
              <Text
                color={"black"}
                paddingBottom={"20px"}
                borderBottom={"1px solid black"}
              ></Text>
              <Text color={"black"} paddingBottom={"20px"} paddingTop={"20px"}>
                * Tarif jika transaksi EKSPOR maka yang di ambil BK dan PPNBK
              </Text>
              <Text color={"black"} paddingBottom={"20px"} paddingTop={"20px"}>
                * TOTAL HARGA = HARGA BARANG + (TARIF BK atau BM * HARGA) +
                (TARIF PPNBM atau PPNBK * HARGA)
              </Text>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Barang;
