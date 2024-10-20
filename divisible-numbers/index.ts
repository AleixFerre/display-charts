const probability: number[] = [];
const probabilityTotal: number[] = [];
const initTime = Date.now();

let divisibleTotal = 0;
for (let i = 1; i < 10000; i++) {
  let divisible = 1;
  const maxNeededNumber = i / 2;

  for (let j = 1; j <= maxNeededNumber; j++) {
    if (i % j === 0) {
      divisible++;
      divisibleTotal++;
    }
  }
  probability.push((divisible / i) * 100);
  probabilityTotal.push(((divisibleTotal * 2 + i) / (i * i)) * 100);
}

const finishTime = Date.now();
console.log(`Done in ${(finishTime - initTime) / 1000} seconds`);

// Write it in the results.json file
Bun.write("results.json", JSON.stringify(probability)).then(() => {
  console.log(`${Bun.file("results.json").size / 1024 / 1024} MB`);
  console.log(`Saved in ${(Date.now() - finishTime) / 1000} seconds`);
});

Bun.write("resultsTotal.json", JSON.stringify(probabilityTotal)).then(() => {
  console.log(`${Bun.file("resultsTotal.json").size / 1024 / 1024} MB`);
  console.log(`Saved in ${(Date.now() - finishTime) / 1000} seconds`);
});
