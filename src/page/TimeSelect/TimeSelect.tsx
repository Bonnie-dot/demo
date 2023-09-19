import { Fragment, Suspense } from 'react'
import { useTimeSelect } from './hooks/useTimeSelect'
import { COLUMNS, State, TIMES, WEEK, WEEK_COLUMNS } from '../../const'
import style from './timeSelect.module.scss'

export default function TimeSelect() {
    const {
        onMouseEnd,
        onMouseEnter,
        onMouseDown,
        deferredScheduleTimes,
        clearData,
        scheduleTimes,
    } = useTimeSelect()

    return (
        <table
            border={1}
            cellSpacing={0}
            align={'center'}
            className={style.tableBox}
        >
            <thead>
                <tr>
                    <th colSpan={WEEK_COLUMNS + COLUMNS} align={'right'}>
                        <span className={style.indicatorBox}>
                            <i className={style.selected}></i>已选
                        </span>
                        <span className={style.indicatorBox}>
                            <i></i>可选
                        </span>
                    </th>
                </tr>
                <tr>
                    <td
                        colSpan={WEEK_COLUMNS}
                        rowSpan={2}
                        align={'center'}
                        className={style.weekCaption}
                    >
                        星期/时间
                    </td>
                    <th colSpan={COLUMNS / 2}>00:00-12:00</th>
                    <th colSpan={COLUMNS / 2}>12:00-24:00</th>
                </tr>
                <tr>
                    {Array.from({ length: COLUMNS / 2 }, (_, index) => (
                        <th key={index} colSpan={2}>
                            {index}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {scheduleTimes.map((items, row) => (
                    <tr key={`row${row}`}>
                        <td colSpan={WEEK_COLUMNS} align={'center'}>
                            {WEEK[row]}
                        </td>
                        {items.map((state, column) => (
                            <td
                                key={`${row}${column}`}
                                align={'center'}
                                onMouseDown={() => onMouseDown(row, column)}
                                onMouseEnter={() => onMouseEnter(row, column)}
                                onMouseUp={onMouseEnd}
                                className={style[state]}
                                title={`${WEEK[row]} ${TIMES[column]}`}
                            ></td>
                        ))}
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={COLUMNS + WEEK_COLUMNS}>
                        <section className={style.statistics}>
                            <div className={style.caption}>
                                <span></span>
                                <span>已选择时间段</span>
                                <button onClick={clearData}>清空</button>
                            </div>
                            <div className={style.scheduleBox}>
                                <Suspense fallback={<h2>正在加载请稍后...</h2>}>
                                    {deferredScheduleTimes.map(
                                        (values, row) => (
                                            <Fragment key={row}>
                                                {values.length > 0 &&
                                                    values.some(
                                                        (state) =>
                                                            state ===
                                                            State.SELECTED
                                                    ) && (
                                                        <div
                                                            className={
                                                                style.timeRow
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    style.week
                                                                }
                                                            >
                                                                {WEEK[row]}
                                                            </div>
                                                            <div
                                                                className={
                                                                    style.timeline
                                                                }
                                                            >
                                                                {values.map(
                                                                    (
                                                                        state,
                                                                        column
                                                                    ) => (
                                                                        <Fragment
                                                                            key={
                                                                                column
                                                                            }
                                                                        >
                                                                            {state ===
                                                                                State.SELECTED && (
                                                                                <span>
                                                                                    {
                                                                                        TIMES[
                                                                                            column
                                                                                        ]
                                                                                    }
                                                                                    {values.findLastIndex(
                                                                                        (
                                                                                            state
                                                                                        ) =>
                                                                                            state ===
                                                                                            State.SELECTED
                                                                                    ) !==
                                                                                    column
                                                                                        ? '、'
                                                                                        : ''}
                                                                                </span>
                                                                            )}
                                                                        </Fragment>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                            </Fragment>
                                        )
                                    )}
                                </Suspense>
                            </div>
                        </section>
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}
