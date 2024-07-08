export function formatCurrency(value: number) {
  value = value / 100;

  const formattedValue = value.toLocaleString("pt-br", {
    minimumIntegerDigits: 2,
    minimumFractionDigits: 2,
  });

  return `R$ ${formattedValue}`;
}
