
export function pxToRem(pxValue: number): string {
    
    const baseFontSize = 16;
    const remValue = pxValue / baseFontSize;
    
    // console.log(remValue);
    return `${remValue}rem`; 
}