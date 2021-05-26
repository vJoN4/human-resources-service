import { message} from 'antd';

//To create an update
export const infoTable = (oResponse, handleCancel, handleData) => {
  if (oResponse.data.code === 201 || oResponse.data.code === 200) {
    message.success(oResponse.data.message);
    handleCancel();
    handleData();
  }
  else{
    message.error(oResponse.data.message);
  }
};

//To delete
export const infoDelete = (oResponse, handleData) => {
  if (oResponse.data.code === 201 || oResponse.data.code === 200) {
    message.success(oResponse.data.message);
    handleData();
  }
  else{
    message.error(oResponse.data.message);
  }
};

export const info = (oResponse,) => {
  if (oResponse.data.code === 201 || oResponse.data.code === 200) {
    if(oResponse.data.message.length <= 105){
      message.success("Inicio de sesión correcto");
      return oResponse.data.message;
    }
    else{
      message.info(oResponse.data.message);
    }
  }
  else{
    message.error(oResponse.data.message);
  }
};

export const skipSameValues = (oOriginal, oChanges) => {
  let oResult = Array.isArray(oOriginal) ? [] : {},
    oTemp = Array.isArray(oChanges) ? [] : {};

  for (let sKey in oChanges) {
    // modificación para arreglos, comparar los elementos de un arreglo
    if (sKey === 'id') {
      oResult[sKey] = oOriginal[sKey];
      continue;
    }
    if (Array.isArray(oChanges[sKey])) {
      if (oOriginal[sKey].length === oChanges[sKey].length) {
        oTemp = skipSameValues(oOriginal[sKey], oChanges[sKey]);
      } else {
        oTemp = oChanges[sKey];
      }
      if (Object.keys(oTemp).length !== 0) {
        oResult[sKey] = oTemp;
      }
    } else if (typeof oChanges[sKey] === 'object') {
      if (oOriginal[sKey]) {
        oTemp = skipSameValues(oOriginal[sKey], oChanges[sKey]) || null;
      }
      if (Object.keys(oTemp).length !== 0) {
        oResult[sKey] = oTemp;
      }
    } else {
      if (oChanges[sKey] !== oOriginal[sKey]) {
        oResult[sKey] = oChanges[sKey];
      }
    }
  }

  if (Object.keys(oResult).length === 1
    && Object.keys(oResult)[0] === 'id'
  ) {
    oResult = {};
  }
  return oResult;
};
