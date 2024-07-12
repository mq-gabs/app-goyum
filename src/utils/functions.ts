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
