export type ValueGetter<T> = (item: T) => string | number;

export type SortingOrder = "asc" | "desc";

const sortBy = <T>(array: T[], key: ValueGetter<T>, order: SortingOrder = "asc") => {
    if (order === "asc") {
        return [...array].sort((a, b) => key(a) > key(b) ? 1 : -1)
    }

    return [...array].sort((a, b) => key(a) > key(b) ? -1 : 1)
}

export { sortBy };
