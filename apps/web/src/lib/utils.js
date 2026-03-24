export function formatRupiah(number) {
  if (number === null || number === undefined || isNaN(number)) {
    return 'Rp0';
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
}
