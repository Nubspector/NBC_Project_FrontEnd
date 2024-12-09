
function deepCompareEquals(a, b) {
    if (a === b) return true;
    if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) return false;
    if (Object.keys(a).length !== Object.keys(b).length) return false;
  
    for (const key in a) {
      if (!deepCompareEquals(a[key], b[key])) return false;
    }
  
    return true;
  }
  
  export default deepCompareEquals;
  