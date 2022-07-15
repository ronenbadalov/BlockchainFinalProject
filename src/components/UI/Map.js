import React, { useCallback, useEffect, useState } from "react";
import Land from "./Land";
import classes from "./Map.module.scss";
import { Row, Col } from "react-bootstrap";
import MUIModal from "../Modal/MUIModal";
import LandModalInfo from "../LandModalInfo/LandModalInfo.js";

// const getMap = async () => {
//   try {
//     const res = await fetch("http://127.0.0.1:5000/land/getAll");
//     if (!res.ok) throw new Error("error while fetching map");
//     const data = await res.json();
//     return data;
//   } catch (e) {
//     console.error(e.message);
//   }
// };

const Map = () => {
  const [mapData, setMapData] = useState([]);
  const [landModalData, setLandModalData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setShowModal(false);
  }, []);

  useEffect(() => {
    setMapData([
      [
        {
          disabled: false,
          forSale: true,
          id: 1,
          isOccupied: undefined,
          owner: "",
          price: 15,
          type: "land",
        },
      ],
    ]);
  }, []);

  const MapComp = useCallback(() => {
    return (
      <div className={classes["container"]} style={{ margin: "30px" }}>
        {mapData.map((row, i) => {
          return (
            <Row className={classes["row"]} key={i} xs={"auto"}>
              {row.map((land) => {
                return (
                  <Col key={land.id} className="p-0 m-0">
                    <Land
                      id={land.id}
                      type={land.type}
                      price={land.price}
                      isOcupied={land.isOcupied}
                      owner={land.owner}
                      forSale={land.forSale}
                      disabled={land.disabled}
                      onClick={handleModalOpen}
                      setLandModalData={setLandModalData}
                    />
                  </Col>
                );
              })}
            </Row>
          );
        })}
      </div>
    );
  }, [mapData]);

  return (
    <>
      <MapComp />
      <MUIModal
        open={showModal}
        onClose={handleModalClose}
        sx={{ maxWidth: "40%" }}
      >
        <LandModalInfo landData={landModalData} onClose={handleModalClose} />
      </MUIModal>
    </>
  );
};

export default Map;

// const paintRowRoad = async (startId) =>{
//   for(let i=startId;i<startId+10000;i=i+100){
//       const res = await fetch(`http://127.0.0.1:5000/land/updateLand`,{
//           method: "PUT",
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({id:i,type:'road_land', disabled:true, forSale: false })})
//       const data = await res.json()
//   }}
// await paintRowRoad(49)

// const paintColumnRoad = async (startId) =>{
//   for(let i=startId;i<startId+100;i++){
//       const res = await fetch(`http://127.0.0.1:5000/land/updateLand`,{
//           method: "PUT",
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({id:i,type:'road_land', disabled:true, forSale: false })})
//       const data = await res.json()
//   }}

// await paintColumnRoad(4900)

// const paintSquarePark = async (startId) =>{
//   for(let i=startId;i<startId+1900;i=i+100){
//       const res = await fetch(`http://127.0.0.1:5000/land/updateLand`,{
//           method: "PUT",
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({id:i,type:'park_land', disabled:true, forSale: false })})
//       const data = await res.json()
//   }}

// const data = JSON.parse(sessionStorage.map)
// const arr=[]
// data.forEach(row =>{ row.forEach(land =>{if(land.type==="land")arr.push(land)})})
// const rand = () => {
//   const min = Math.ceil(15);
//   const max = Math.floor(200);
//   return Math.floor(Math.random() * (max - min) + min);
// };
// arr.forEach(async (land)=>{
//         const res = await fetch(`http://127.0.0.1:5000/land/updateLand`,{
//             method: "PUT",
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({id:land.id,price:rand(),innerData:{}})})
//        })
