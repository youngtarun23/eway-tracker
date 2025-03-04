
export const generateCSVTemplate = () => {
  const headers = ['vehicleNumber', 'ewayBill', 'status', 'origin', 'destination', 'distance', 'journeyProgress'];
  const sampleRow = ['TN01A1234', 'EW123456789', 'On-Track', 'Chennai', 'Bangalore', '350', '60'];
  const csvContent = [headers.join(','), sampleRow.join(',')].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  return URL.createObjectURL(blob);
};
