import axios from "axios";

const youBike2 =
  "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json";

export const getYouBike2Data = async () => {
  try {
    const { data } = await axios.get(youBike2);
    return data;
  } catch (error) {
    console.log(error);
  }
};
