const sameDay = (d1, d2) => {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

const getTimeInDate =(data, date) => {
    
    const copy = data.filter(x => sameDay(new Date(x.date), new Date(date)));
    const sum = copy.reduce((acc,cur) => acc+ cur.length, 0);
    return parseInt(sum);
}
export default getTimeInDate