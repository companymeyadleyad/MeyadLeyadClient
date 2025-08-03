// custom.d.ts
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }
  
declare module 'html2pdf.js' {
  const html2pdf: any;
  export default html2pdf;
}
  