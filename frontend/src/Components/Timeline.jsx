import { Timeline } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const Timeline1 = ({ data, onSubtopicClick }) => (
  <Timeline>
    {data.map((item, index) => (
      <Timeline.Item
        key={index}
        onClick={() => onSubtopicClick(item)} 
        style={{ cursor: 'pointer', color: '#007bff' }} // Make it look clickable
        
      >
        {item}
      </Timeline.Item>
    ))}
  </Timeline>
);

export default Timeline1;
