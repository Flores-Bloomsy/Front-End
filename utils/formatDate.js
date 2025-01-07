export function formatDate(date) {
  const newDate = new Date(date);
  if (isNaN(newDate)) {
    throw new Error("Invalid date");
  }

  const day = newDate.getDate().toString().padStart(2, "0");
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const year = newDate.getFullYear();

  return `${day}/${month}/${year}`;
}
