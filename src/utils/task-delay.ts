function taskDelay(delay: number) {
  return new Promise((resolve) => {
    const id = setTimeout(() => {
      console.log(`delay time: ${delay}`);
    }, delay);
    resolve(id);
  });
}

export default taskDelay;
