function getTopElements(array1, array2) {
    // Step 1: Count occurrences in the first array
    const countDict = {};
    array1.forEach((item) => {
        countDict[item] = (countDict[item] || 0) + 1;
    });

    array2.forEach((prefix) => {
        for (const key in countDict) {
            if (key.startsWith(prefix)) {
                countDict[key] += 3; // Adding the bonus
            }
        }
    });

    const sortedElements = Object.entries(countDict)
        .sort((a, b) => {
            const countDiff = b[1] - a[1]; // Compare counts
            if (countDiff !== 0) return countDiff; // Higher count first
            return array1.indexOf(a[0]) - array1.indexOf(b[0]); // Resolve ties by order
        });

    const top5 = sortedElements.slice(0, 5).map(([element]) => element);
    
    return top5;
}

const array1 = ['apple', 'banana', 'apple', 'orange', 'banana', 'grape'];
const array2 = ['ap', 'ba'];
const result = getTopElements(array1, array2);

console.log(result);