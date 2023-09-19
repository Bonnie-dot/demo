import { useDeferredValue, useMemo, useState } from 'react'
import { ScheduleTimes, State } from '../../../const'
import { createMatrix } from '../../../utils/createMatrix/createMatrix'

type Position = {
    row: number
    column: number
}

export const useTimeSelect = () => {
    const [isDrag, setDrag] = useState(false)
    const [startCell, setStartCell] = useState<Position>()
    const initScheduleTimes = useMemo(createMatrix, [])
    const [scheduleTimes, setScheduleTimes] =
        useState<ScheduleTimes>(initScheduleTimes)
    const deferredScheduleTimes = useDeferredValue(scheduleTimes)
    const isContain = (row: number, column: number): boolean => {
        const scheduleTime = scheduleTimes[row][column]
        return scheduleTime && scheduleTime === State.SELECTED
    }
    const onMouseDown = (row: number, column: number) => {
        setDrag(true)
        setStartCell({ row, column })
        if (!isContain(row, column)) {
            setScheduleTimes((prevState) => {
                const state: ScheduleTimes = JSON.parse(
                    JSON.stringify(prevState)
                )
                state[row][column] = State.SELECTED
                return state
            })
        }
    }
    const onMouseEnter = (currentRow: number, currentColumn: number) => {
        if (isDrag) {
            setScheduleTimes((prevState) => {
                const scheduleTime: ScheduleTimes = JSON.parse(
                    JSON.stringify(prevState)
                )
                let row = Math.min(currentRow, startCell.row)
                while (row <= Math.max(currentRow, startCell.row)) {
                    let column = Math.min(currentColumn, startCell.column)
                    while (
                        column <= Math.max(currentColumn, startCell.column)
                    ) {
                        scheduleTime[row][column] = State.SELECTING
                        column++
                    }
                    row++
                }
                return scheduleTime
            })
        }
    }
    const clearData = () => {
        setScheduleTimes(initScheduleTimes)
    }
    const onMouseEnd = () => {
        setDrag(false)
        setScheduleTimes((prevState) => {
            const state: ScheduleTimes = JSON.parse(JSON.stringify(prevState))
            state.forEach((items, row) => {
                items.forEach((item, column) => {
                    if (item === State.SELECTING) {
                        state[row][column] = State.SELECTED
                    }
                })
            })
            return state
        })
    }
    return {
        onMouseDown,
        onMouseEnter,
        onMouseEnd,
        deferredScheduleTimes,
        clearData,
        scheduleTimes,
    }
}
