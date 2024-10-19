const probability: number[] = [];
const initTime = Date.now();

for (let i = 1; i < 1000000; i++) {
  let divisible = 0;
  // const maxNeededNumber = Math.sqrt(i);

  for (let j = 1; j < Math.sqrt(i); j++) {
    if (i % j === 0) {
      divisible++;
    }
  }
  probability.push((divisible / i) * 100);
}

// console.log(probability);
const finishTime = Date.now();
console.log(`Done in ${(finishTime - initTime) / 1000} seconds`);

// Write it in the results.json file
Bun.write("results.json", JSON.stringify(probability)).then(() => {
  console.log(`${Bun.file("results.json").size / 1024 / 1024} MB`);
  console.log(`Saved in ${(Date.now() - finishTime) / 1000} seconds`);
});
 