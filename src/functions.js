export const randomNro = (quantity, negative = false, positive = true) => {
    let nro = Math.ceil(Math.random()*quantity);
    if (negative && positive) {
        if (Math.floor(Math.random()*2) === 0) nro = -nro;
    }
    if (negative && !positive) nro = -nro
    if (!negative && !positive) nro = 0;
    return nro
  }