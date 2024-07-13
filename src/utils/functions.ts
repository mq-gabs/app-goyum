export function formatCurrency(value: number) {
  if (!value) {
    value = 0;
  }

  value = value / 100;

  const formattedValue = value.toLocaleString("pt-br", {
    minimumIntegerDigits: 2,
    minimumFractionDigits: 2,
  });

  return `R$ ${formattedValue}`;
}

export function formatDate(value: string) {
  const dateTime = new Date(
    new Date(value).getTime() - 3 * 60 * 60 * 1000
  ).toJSON();

  const [date, time] = dateTime.split("T");
  const [year, month, day] = date.split("-");
  const [hours, minutes] = time.split(":");

  return `${day}/${month}/${year} às ${hours}:${minutes}`;
}
