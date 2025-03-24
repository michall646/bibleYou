import { summary } from 'date-streaks';
const getSummary = (data) => {
 const dateArray = data.map(x => new Date(x.date));

  return summary(dateArray);
}
export default getSummary