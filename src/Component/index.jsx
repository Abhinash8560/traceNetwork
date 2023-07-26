import React, { useState, useEffect } from 'react';
import Styles from './Interaction.module.css';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const Interaction = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [data, setData] = useState([]);
  const [traceId1Data, setTraceId1Data] = useState([]);
  const [traceId2Data, setTraceId2Data] = useState([]);
  const [expanded, setExpanded] = React.useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleAccordionClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const fetchAccordionData = () => {
    axios
      .get('https://mocki.io/v1/40059489-6a19-4ca7-a41c-1c5c920e312c')
      .then((res) => {
        setData(res.data.spans);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    fetchAccordionData();
  }, []);


  
  useEffect(() => {
    console.log("Data:", data); 
    const filteredTraceId1Data = data.filter((item) => item.trace_id === "TraceID_1");
    const filteredTraceId2Data = data.filter((item) => item.trace_id === "TraceID_2");
  
    console.log("Filtered Trace ID 1 Data:", filteredTraceId1Data);
    console.log("Filtered Trace ID 2 Data:", filteredTraceId2Data);
  
    setTraceId1Data(filteredTraceId1Data);
    setTraceId2Data(filteredTraceId2Data);
  }, [data]);
  

  return (
    <section className={Styles.parentGrid}>

     {/* Accordion for trace_id2 */}
     <Accordion style={{   backgroundColor: '#030303e2',color:'#fff'}} expanded={expanded === 'panel'} onChange={handleAccordionChange('panel')}>
        {traceId2Data.length > 0 ? (
          traceId2Data.map((item, index) => (
            <div key={index}   >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon   style={{color:'#fff'}} />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
                onClick={() => handleAccordionClick(index)}
               
              >
                <Typography>{item.trace_id}</Typography>
 
      
              </AccordionSummary>
              <div style={{display:'flex',flexDirection:'row',justifyContent:'spaceBetween',gap:'1rem',marginLeft:'1rem',backgroundColor:'000',height:'46px'}}>
                <Stack direction="row" spacing={3}>
      <Chip label="4 Spans" variant="outlined" style={{   backgroundColor: '#aaaa',color:'#fff'}} />
    </Stack>
      
                
                <Stack direction="row" spacing={3}>
      <Chip label="1 Errors" variant="outlined" style={{   backgroundColor: '#FF5733',color:'#fff'}} />
    </Stack>
                </div>

                <AccordionDetails >
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '16rem' }}>
    <Typography>{item.req_info.req_method} {item.req_info.req_path}</Typography>

    {item.req_info.latency.split(',').map((latency) => parseFloat(latency)).sort((a, b) => a - b)
      .map((parsedLatency, index, latencies) => (
        <Chip
          key={index}
          label={`${parsedLatency.toFixed(2)}ms`}
          variant="outlined"
          style={{
            backgroundColor: 'transparent',
            color: parsedLatency === Math.max(...latencies) ? '#fff' : 'red', 
          }}
        />
      ))}
  </div>
  <Typography>{item.source} -> {item.destination}</Typography>
</AccordionDetails>




            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Accordion>






      {/*  Accordion for trace_id1 */}
      <Accordion style={{   backgroundColor: '#030303e2',color:'#fff'}}>
        { traceId1Data && traceId1Data.length > 0 ? (
          traceId1Data && traceId1Data.map((item, index) => (
            <div key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon   style={{color:'#fff'}} />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
                onClick={() => handleAccordionClick(index)}
              >

                <Typography>{item.trace_id}</Typography>
              </AccordionSummary>
              <div style={{display:'flex',flexDirection:'row',justifyContent:'spaceBetween',gap:'1rem',marginLeft:'1rem',backgroundColor:'000',height:'46px'}}>
                <Stack direction="row" spacing={3}>
      <Chip label="3 Spans" variant="outlined" style={{   backgroundColor: '#aaaa',color:'#fff'}} />
    </Stack>
      
                
                <Stack direction="row" spacing={3}>
      <Chip label="1 Errors" variant="outlined" style={{   backgroundColor: '#FF5733',color:'#fff'}} />
    </Stack>
                </div>
                <AccordionDetails>
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: '16rem' }}>
    <Typography>{item.req_info.req_method} {item.req_info.req_path}</Typography>

    {item.req_info.latency.split(',').map((latency) => parseFloat(latency)).sort((a, b) => a - b)
      .map((parsedLatency, index, latencies) => (
        <Chip
          key={index}
          label={`${parsedLatency.toFixed(2)}ms`}
          variant="outlined"
          style={{
            backgroundColor: 'transparent',
            color:'#fff'
          }}
        />
      ))}
  </div>
  <Typography>{item.source} -> {item.destination}</Typography>
</AccordionDetails>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Accordion>

 
    </section>
  );
};

export default Interaction;
