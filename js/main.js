document.addEventListener("DOMContentLoaded", function () {
    let redirectButton = document.getElementById("redirectButton");
    if (redirectButton) {
        redirectButton.addEventListener("click", function () {
            window.location.href = "algorithm.html";
        });
    }

    // Merge Sort button
    let mergeBTN = document.getElementById("Merge");
    if (mergeBTN) {
        mergeBTN.addEventListener("click", function () {
            window.location.href = "merge_sort.html";
        });
    }

    // Quick Sort button
    let quickBTN = document.getElementById("quick");
    if (quickBTN) {
        quickBTN.addEventListener("click", function () {
            window.location.href = "quick_sort.html";
        });
    }

    // Binary Search button
    let binaryBTN = document.getElementById("binary");
    if (binaryBTN) {
        binaryBTN.addEventListener("click", function () {
            window.location.href = "binary_search.html";
        });
    }
});
