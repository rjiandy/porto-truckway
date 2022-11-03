function isGINotValid(delivery) {
  return (
    ((delivery.gi_number == null) || (delivery.gi_number === '')) ||
    ((delivery.actual_gi_date == null) || (delivery.actual_gi_date === ''))
  );
}

function isShipmentGIValid(shipment) {
  const { customers } = shipment;
  for (const { deliveries } of customers) {
    const deliveryOnly = deliveries.filter((data) => !data.is_pickup);
    if (deliveryOnly.find(isGINotValid)) {
      return false;
    }
  }
  return true;
}

export default isShipmentGIValid;
