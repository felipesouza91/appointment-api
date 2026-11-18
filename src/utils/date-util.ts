export function convertTimeToNumber(time: string) {
  return time.split(":").map((value) => {
    if (value.length === 0) {
      return null;
    }
    return Number(value);
  });
}

export function validHoursAndMinutes(val: string) {
  const [hour, minutes] = convertTimeToNumber(val);
  if ((!hour && hour === null) || !(hour! >= 0 && hour! <= 23)) {
    return false;
  }
  if ((!minutes && minutes === null) || !(minutes! >= 0 && minutes! <= 59)) {
    return false;
  }
  return true;
}
