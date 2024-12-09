import React, { useEffect, useRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "react-daisyui";
import { getImage } from "../../../api";

const formatToRupiah = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
};

// Deep comparison function for deep equality check
function deepCompareEquals(a, b) {
  if (a === b) return true;
  if (typeof a !== "object" || a === null || typeof b !== "object" || b === null)
    return false;
  if (Object.keys(a).length !== Object.keys(b).length) return false;

  for (const key in a) {
    if (!deepCompareEquals(a[key], b[key])) return false;
  }

  return true;
}

function useDeepCompareMemoize(value) {
  const ref = useRef();

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffect(callback, dependencies) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default function TransactionProducts({ transaction_product, onProductChange }) {
  const { control, setValue } = useFormContext();
  const { fields, remove } = useFieldArray({
    control,
    name: "products",
  });

  // Precompute the products array
  const initialProducts = transaction_product?.map((product) => ({
    id: product.id,
    quantity: product.quantity,
    product: product.product,
  })) || [];

  // Use deep compare effect to avoid re-running unless `transaction_product` changes deeply
  useDeepCompareEffect(() => {
    if (transaction_product) {
      setValue("products", initialProducts);
    }
  }, [transaction_product, setValue]);

  const handleRemove = (index) => {
    remove(index);
    onProductChange(fields.filter((_, idx) => idx !== index));
  };

  return (
    <div className="space-y-6 border-t pt-4 mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        Transaction Products
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative block overflow-hidden bg-white shadow-md rounded-lg border-gray-100 p-4 sm:p-6 lg:p-8"
          >
            <div className="sm:flex sm:justify-between sm:gap-4 mb-4">
              <div>
                <p className="text-lg font-bold text-gray-900 sm:text-xl">
                  {field.product?.name || "N/A"}
                </p>
                <p className="mt-1 text-xs font-medium text-gray-600">
                  {field.product?.category || "Category not available"}
                </p>
              </div>
              {field.product?.image && (
                <div className="hidden sm:block sm:shrink-0">
                  <img
                    alt={field.product?.name || "Product Image"}
                    src={getImage(field.product?.image)}
                    className="h-16 w-16 rounded-lg object-cover shadow-sm"
                  />
                </div>
              )}
            </div>
            <div className="mb-4">
              <p className="text-pretty text-sm text-gray-500">
                {field.product?.description || "No description available for this product."}
              </p>
            </div>
            <dl className="flex gap-4 sm:gap-6">
              <div className="flex flex-col-reverse">
                <dt className="text-sm font-medium text-gray-600">Quantity</dt>
                <p className="text-xs text-gray-500">{field.quantity}</p>
              </div>
              <div className="flex flex-col-reverse">
                <dt className="text-sm font-medium text-gray-600">
                  Unit Price
                </dt>
                <p className="text-xs text-gray-500">
                  {formatToRupiah(field.product?.price)}
                </p>
              </div>
              <div className="flex flex-col-reverse">
                <dt className="text-sm font-medium text-gray-600">Total</dt>
                <p className="text-xs text-gray-500">
                  {formatToRupiah(field.product?.price * field.quantity)}
                </p>
              </div>
            </dl>
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                type="button"
                className="text-red-500 border-red-500 border-2 px-2 py-1 rounded"
                onClick={() => handleRemove(index)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
