import { useState } from "react";

export const useForm = (defaultFields = {}) => {
  const [fields, updateFields] = useState(defaultFields);

  const updateField = (e) => {
    updateFields({
      ...fields,
      [e.target.id]: e.target.value,
    });
  };

  return [fields, updateField];
};
