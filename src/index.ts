import { calculateIncreasesInto3 } from './day01/index';
import { calculatePositionWithAim, calculatePosition } from './day02';

(async () => {
  try {
    // await calculateIncreases();
    // await calculateIncreasesInto3();
    // await calculatePosition();
    await calculatePositionWithAim();
  } catch (e) {
    // Deal with the fact the chain failed
  }
})();
