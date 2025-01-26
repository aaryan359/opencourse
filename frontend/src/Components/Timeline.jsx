import React, { useState } from 'react';
import { Timeline, Progress } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const Timeline1 = ({ data, onSubtopicClick }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleItemClick = (item, index) => {
    setSelectedIndex(index);
    onSubtopicClick(item);
  };

  const completionPercentage = selectedIndex !== null 
    ? ((selectedIndex + 1) / data.length) * 100
    : 0;

  return (
    <div>
      {/* Timeline */}
      <Timeline>
        {data.map((item, index) => (
          <Timeline.Item
            key={index}
            onClick={() => handleItemClick(item, index)}
            style={{
              cursor: 'pointer',
              color: selectedIndex === index ? '#007bff' : '#fff', 
              fontWeight: selectedIndex === index ? 'bold' : 'normal', 
              borderRadius: '5px',
            }}
          >
            {item}
          </Timeline.Item>
        ))}
      </Timeline>

      {/* Progress Bar */}
      {/* <div style={{ marginTop: '20px' }}>
        <Progress.Line 
          percent={completionPercentage} 
          showInfo 
          strokeColor="#007bff"
        />
      </div> */}
    </div>
  );
};

export default Timeline1;
