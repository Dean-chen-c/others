(async () => {
  if (1) {
    const { m: d } = await import("./a");
    console.log("m", d);
  }
})();
export const n = 2;
