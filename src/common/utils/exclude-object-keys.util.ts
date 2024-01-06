import { copyObject } from './copy-object';

export const excludeObjectKeys = <TObj extends Record<string, any>>(
  object: TObj,
  ...keys: (keyof TObj)[]
) => {
  const copyedObject = copyObject(object);
  const objectEntries = Object.entries(copyedObject).filter(
    ([key]) => !keys.includes(key as keyof TObj),
  );
  return Object.fromEntries(objectEntries) as TObj;
};
