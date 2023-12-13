export default function quickSort(bookshelf) {
    const moves = [];
    const partition = (left, right) => {
        const pivotIndex = Math.floor((left + right) / 2);
        const pivot = bookshelf[pivotIndex];
        let i = left;
        let j = right;
        while (i <= j) {
            while (bookshelf[i].name < pivot.name) {
                i++;
                moves.push({
                    indices: [i, pivotIndex],
                    type: "compare"
                });
            }
            while (bookshelf[j].name > pivot.name) {
                j--;
                moves.push({
                    indices: [j, pivotIndex],
                    type: "compare"
                });
            }
            if (i <= j) {
                if (i !== j) {
                    moves.push({
                        indices: [i, j, pivotIndex],
                        type: "swap"
                    });
                }
                [bookshelf[i], bookshelf[j]] = [bookshelf[j], bookshelf[i]];
                i++;
                j--;
            }
        }
        return i;
    };
    const quickSortRecursive = (left, right) => {
        if (left >= right) {
            return;
        }
        const index = partition(left, right);
        quickSortRecursive(left, index - 1);
        quickSortRecursive(index, right);
    };
    quickSortRecursive(0, bookshelf.length - 1);
    return moves;
}
