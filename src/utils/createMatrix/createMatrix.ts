import { COLUMNS, ROWS, ScheduleTimes, State } from '../../const'

export const createMatrix = () => {
    const arr: ScheduleTimes = []
    Array.from({ length: ROWS }, (_, row) => {
        arr[row] = []
        Array.from({ length: COLUMNS }, (_, column) => {
            arr[row][column] = State.UNSELECTED
        })
    })
    return arr
}
