import { Timeline } from 'rsuite';
import 'rsuite/dist/rsuite.min.css'; 

const Timeline1 = ({ data }) => (
  <Timeline>
    {data.map((item, index) => (
      <Timeline.Item key={index}>{item}</Timeline.Item>
    ))}
  </Timeline>
);

export default Timeline1;
