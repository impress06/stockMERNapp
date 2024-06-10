
export const ModalStyle={
    width: 340,
    marginBottom: "20px",
    position: "relative",
    margin: "0 auto",
    "@media (max-width: 1200px)": {
      width: "80%",
      height: "80%",
      margin: "10px auto",
    },
    "@media (max-width: 678px)": {
      width: "360",
      height: "390px",
      margin: "10px auto",
    },
    "@media (min-width: 679px)": {
      width: "256px",
      height: "390px",
      margin: "10px auto",
    },
}
export const actionCardStyle={
    position: "absolute",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "10px",
  bottom: 0,
  width: "100%",
  backgroundColor: "white",
  boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
  zIndex: 1000,
}