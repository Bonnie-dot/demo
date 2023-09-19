import { act, renderHook } from '@testing-library/react'
import { useTimeSelect } from './useTimeSelect'
import { State } from '../../../const'
import { createMatrix } from '../../../utils/createMatrix/createMatrix'

describe('#useTimeSelect', () => {
    it('should return selected cell when simulate click event', () => {
        const { result } = renderHook(() => useTimeSelect())
        act(() => {
            result.current.onMouseDown(2, 2)
        })
        act(() => {
            result.current.onMouseEnd()
        })
        expect(result.current.scheduleTimes[2][2]).toEqual(State.SELECTED)
    })

    it('should return multiple selected cells when simulate twice click event', () => {
        const { result } = renderHook(() => useTimeSelect())
        act(() => {
            result.current.onMouseDown(2, 2)
        })
        act(() => {
            result.current.onMouseEnd()
        })
        act(() => {
            result.current.onMouseDown(4, 3)
        })
        act(() => {
            result.current.onMouseEnd()
        })
        expect(result.current.scheduleTimes[2][2]).toEqual(State.SELECTED)
        expect(result.current.scheduleTimes[4][3]).toEqual(State.SELECTED)
    })

    it('should return multiple selected cells when simulate drag event', () => {
        const { result } = renderHook(() => useTimeSelect())
        act(() => {
            result.current.onMouseDown(2, 2)
        })
        act(() => {
            result.current.onMouseEnter(2, 4)
        })
        act(() => {
            result.current.onMouseEnd()
        })
        expect(result.current.scheduleTimes[2].slice(2, 4 + 1)).toStrictEqual([
            'selected',
            'selected',
            'selected',
        ])
    })

    it('should return multiple selected cells when simulate twice drag event', () => {
        const { result } = renderHook(() => useTimeSelect())
        act(() => {
            result.current.onMouseDown(2, 2)
        })
        act(() => {
            result.current.onMouseEnter(2, 4)
        })
        act(() => {
            result.current.onMouseEnd()
        })

        act(() => {
            result.current.onMouseDown(3, 2)
        })
        act(() => {
            result.current.onMouseEnter(3, 4)
        })
        act(() => {
            result.current.onMouseEnd()
        })

        expect(result.current.scheduleTimes[2].slice(2, 4 + 1)).toStrictEqual([
            'selected',
            'selected',
            'selected',
        ])
        expect(result.current.scheduleTimes[3].slice(2, 4 + 1)).toStrictEqual([
            'selected',
            'selected',
            'selected',
        ])
    })

    it('should return init scheduleTime when call clearData', () => {
        const { result } = renderHook(() => useTimeSelect())
        act(() => {
            result.current.onMouseDown(2, 2)
        })
        act(() => {
            result.current.onMouseEnd()
        })
        act(() => {
            result.current.clearData()
        })
        expect(result.current.scheduleTimes).toEqual(createMatrix())
    })
})
