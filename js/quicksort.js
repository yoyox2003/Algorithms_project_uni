// Delay function to add a smooth effect during visualization
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to display the array with visual effects
function displayArray(arr, pivotIndex = -1, i = -1, j = -1, swap = [], splitIndex = -1) {
    const container = document.createElement("div");
    container.style.marginBottom = "40px";

    const boxRow = document.createElement("div");
    const indexRow = document.createElement("div");
    const labelRow = document.createElement("div");

    arr.forEach((val, index) => {
        // Box for value
        const span = document.createElement("span");
        span.textContent = val;
        span.style.display = "inline-block";
        span.style.width = "40px";
        span.style.height = "40px";
        span.style.lineHeight = "40px";
        span.style.margin = "2px";
        span.style.textAlign = "center";
        span.style.border = "1px solid black";
        span.style.fontWeight = "bold";

        // Extra spacing for visual split
        if (splitIndex !== -1 && index === splitIndex) {
            span.style.marginLeft = "30px";
        }

        // Color coding
        if (index === pivotIndex) span.style.backgroundColor = "#3b82f6"; // Pivot = blue
        else if (swap.includes(index)) span.style.backgroundColor = "#f87171"; // Swapped = red
        else if (index === i || index === j) span.style.backgroundColor = "#facc15"; // Pointers = yellow
        else span.style.backgroundColor = "#d1d5db"; // Default = grey

        // Build rows
        boxRow.appendChild(span);

        // Index row
        const idx = document.createElement("div");
        idx.textContent = `[${index}]`;
        idx.style.display = "inline-block";
        idx.style.width = "40px";
        idx.style.textAlign = "center";
        if (splitIndex !== -1 && index === splitIndex) {
            idx.style.marginLeft = "30px";
        }
        indexRow.appendChild(idx);

        // Label row (left/right pointers)
        const label = document.createElement("div");
        label.style.display = "inline-block";
        label.style.width = "40px";
        label.style.textAlign = "center";
        if (index === i && index === j) label.textContent = "L/R";
        else if (index === i) label.textContent = "L";
        else if (index === j) label.textContent = "R";
        else label.textContent = "";
        if (splitIndex !== -1 && index === splitIndex) {
            label.style.marginLeft = "30px";
        }
        labelRow.appendChild(label);
    });

    container.appendChild(boxRow);
    container.appendChild(indexRow);
    container.appendChild(labelRow);
    document.getElementById("steps").appendChild(container);
}

// Partition function for QuickSort algorithm
async function partition(arr, low, high) {
    let pivot = arr[low];
    let i = low;
    let j = high;

    // Display initial state with pivot
    displayArray([...arr], low, i, j);
    await sleep(1000);

    while (i < j) {
        // Move i to the right while arr[i] <= pivot
        do {
            i++;
            displayArray([...arr], low, i, j);
            await sleep(500);
        } while (i < arr.length && arr[i] <= pivot);

        // Move j to the left while arr[j] > pivot
        do {
            j--;
            displayArray([...arr], low, i, j);
            await sleep(500);
        } while (j >= 0 && arr[j] > pivot);

        // Swap arr[i] and arr[j]
        if (i < j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            displayArray([...arr], low, i, j, [i, j]);
            await sleep(1000);
        }
    }

    // Swap pivot into correct position
    [arr[low], arr[j]] = [arr[j], arr[low]];
    displayArray([...arr], j);
    await sleep(1000);

    return j;
}

// QuickSort function (recursive)
async function quickSort(arr, low, high) {
    if (low < high) {
        let j = await partition(arr, low, high);
        await quickSort(arr, low, j);
        await quickSort(arr, j + 1, high);
    }
}

// Start the sorting process based on input from the user
async function startSort() {
    const input = document.getElementById("inputArray").value.trim();
    if (!input) {
        alert("Please enter a valid array!");
        return;
    }

    let array = input.split(",").map(x => x.trim()).filter(x => x !== "").map(Number);

    // Check for invalid input
    if (array.some(isNaN)) {
        alert("Please enter only numbers, separated by commas.");
        return;
    }

    if (array.length < 2) {
        alert("Enter at least two numbers to sort.");
        return;
    }

    // Clear previous steps and result
    document.getElementById("steps").innerHTML = "";
    document.getElementById("result").innerHTML = "";

    // Start the sorting process and measure execution time
    const startTime = performance.now();
    await quickSort(array, 0, array.length - 1);
    const endTime = performance.now();

    // Display the final result and execution time
    document.getElementById("result").innerHTML = `
      <p><strong>Sorted:</strong> ${array.join(", ")}</p>
      <p><strong>Time Complexity:</strong> Best: O(n log n), Worst: O(n²), Average: O(n log n)</p>
      <p><strong>Execution Time:</strong> ${(endTime - startTime).toFixed(2)} ms</p>
    `;
}
