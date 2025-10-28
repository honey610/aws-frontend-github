// import React,{useState,useEffect} from 'react'
// import HeatMap from "@uiw/react-heat-map"

// const  generateActivityData = (startDate, endDate) => {
//     const data=[]
//     const currentDate = new Date(startDate)
//     const end= new Date(endDate)
//     while(currentDate<=end){
//         const count = Math.floor(Math.random()*50)+1
//         data.push({
//             date:currentDate.toISOString().split('T')[0],
//             count:count
//         })
//         currentDate.setDate(currentDate.getDate()+1)

//     }
//     return data


// }


// const getPanelColours=(maxCount)=>{
//     const colours={}
//     for(let i=0;i<=maxCount;i++){
//         const greenValue=Math.floor((i/maxCount)*255)
//         colours[i]=`rgb(0,${greenValue},0)`
        
//     }
//     return colours

// }

// const UHeatMap= () => {
//     const [activitydata,setActivityData]=useState([])
//     const [getColours,setGetColours]=useState({})

//     useEffect(()=>{
//         const fetchData=async()=>{
//             const startDate="2023-01-01"
//             const endDate="2023-01-31"
//             const data=generateActivityData(startDate,endDate)
//             setActivityData(data)
//             const maxCount=Math.max(...data.map(item=>item.count))
//             const colours=getPanelColours(maxCount)
//             setGetColours(colours)
//         }
//         fetchData() 
//     },[])
   
//   return (
//     <>
//     <div>
//         <h4>Recent Contributions</h4>
//         <HeatMap className="HeatMapProfile"
//         style={{maxWidth:"700px",height:"200px",color:"white"}}
//         value={activitydata}
//         weeklabels={["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}
//         // monthlabels={["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}
//         startDate={new Date("2023-01-01")}
//         reactSize={15}
//         space={3}
//         rectProps={{
//             sx:2.5
//         }}
//         getpanelColours={getColours}

//         />
        
        
//     </div>
//     </>
//   )
// }

// export default UHeatMap
import React, { useState, useEffect } from "react";
import HeatMap from "@uiw/react-heat-map";

const generateActivityData = (startDate, endDate) => {
  const data = [];
  const currentDate = new Date(startDate);
  const end = new Date(endDate);
  while (currentDate <= end) {
    const count = Math.floor(Math.random() * 50) + 1;
    data.push({
      date: currentDate.toISOString().split("T")[0],
      count,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
};

const getPanelColours = (maxCount) => {
  const colours = {};
  for (let i = 0; i <= maxCount; i++) {
    const greenValue = Math.floor((i / maxCount) * 255);
    colours[i] = `rgb(0, ${greenValue}, 0)`;
  }
  return colours;
};

const UHeatMap = () => {
  const [activityData, setActivityData] = useState([]);
  const [panelColours, setPanelColours] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const startDate = "2023-01-01";
      const endDate = "2023-01-31";
      const data = generateActivityData(startDate, endDate);
      setActivityData(data);
      const maxCount = Math.max(...data.map((item) => item.count));
      const colours = getPanelColours(maxCount);
      setPanelColours(colours);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h4>Recent Contributions</h4>
      <HeatMap
        className="HeatMapProfile"
        style={{ maxWidth: "700px", height: "200px", color: "white" }}
        value={activityData}
        weekLabels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
        startDate={new Date("2023-01-01")}
        rectSize={15}
        space={3}
        panelColors={panelColours}
      />
    </div>
  );
};

export default UHeatMap;
