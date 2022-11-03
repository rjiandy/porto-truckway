import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const getCurrentLocation = async (onSuccess, onError) => {
  const reqPermission = await PermissionsAndroid.request(
    'android.permission.ACCESS_FINE_LOCATION',
    {
      title: 'Location Access Required',
      message: 'Truckway needs to Access your location'
    }
  );

  if (reqPermission === 'granted') {
    Geolocation.getCurrentPosition(
      (position) => {
        onSuccess(position.coords.latitude, position.coords.longitude);
      },
      (e) => {
        onError(e);
      },
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
    );
  }
};

function countTotalAmount(deliveryList) {
  let [totalAmount, totalTax] = [0, 0];
  deliveryList.forEach(delivery => {
    const {
      delivery_order_items: materials,
      do_status,
      is_pickup,
      amounts_source
    } = delivery;

    if (do_status === 'SUCCESS' && is_pickup === 0 && amounts_source === 'TRUCKWAY') {
      totalAmount += delivery.total_amount_before_tax_do;
      totalTax += delivery.total_all_tax_do;
    }
    else if (do_status !== 'FAILED' && is_pickup === 0) {
      materials.forEach(material => {
        const countTotal = countTotalMaterialAmount(material);
        totalAmount += countTotal.amount;
        totalTax += countTotal.tax;
      });
    }
  });

  return {
    totalAmount: transformCurrency(Math.round(totalAmount).toString()),
    totalTax: transformCurrency(Math.round(totalTax).toString()),
    totalAmountAfterTax: transformCurrency(Math.round(totalAmount + totalTax).toString())
  };
}

function countTotalMaterialAmount(material) {
  let [amount, tax] = [0, 0];
  const {
    product_uom,
    uom_conversion,
    uom_received,
    qty_received,
    qty_conversion,
    subtotal_amt,
    tax_amount,
    final_prices_material_online
  } = material;

  if (final_prices_material_online) {
    amount += final_prices_material_online.price_after_discount_excl_tax;
    tax += final_prices_material_online.total_tax_amount;

    return { amount, tax };
  } else {
    if (product_uom === uom_conversion && qty_received === qty_conversion) {
      amount += Number(subtotal_amt);
      tax += Number(tax_amount);

      return { amount, tax };
    } else {
      const findPrice = material.uom_convertions_list.uom_price.find(price => {
        return price.uom_code === uom_received;
      });

      if (findPrice) {
        amount += Number(findPrice.amount) * qty_received;
        tax += (Number(findPrice.amount_after_tax) - Number(findPrice.amount)) * qty_received;
      }

      return { amount, tax };
    }
  }
}

function transformCurrency(value) {
  let currency = value.split('.');
  if (currency && currency.length > 0) {
    let formatCurrency = currency[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    currency.splice(0,1, formatCurrency);
  }

  return currency.join(',');
}

export {
  getCurrentLocation,
  countTotalAmount,
  countTotalMaterialAmount,
  transformCurrency
};
