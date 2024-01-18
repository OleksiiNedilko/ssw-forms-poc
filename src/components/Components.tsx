import {FC, PropsWithChildren} from 'react'
import {useDroppable} from '@dnd-kit/core'

export const Page: FC<PropsWithChildren<{ index: number }>> = ({index, children}) => {
  const {setNodeRef, isOver} = useDroppable({
    id: `page-${index}`,
    data: {
      id: index,
      type: 'page',
    },
  })

  return (
    <div className={`page${isOver ? ' outline' : ''}`} ref={setNodeRef}>
      <p className="title">page {index + 1}</p>
      {children}
    </div>
  )
}

export const Section: FC<PropsWithChildren<{ index: number; pageIndex: number }>> = ({index, pageIndex, children}) => {
  const {setNodeRef, isOver} = useDroppable({
    id: `section-${index}`,
    data: {
      id: index,
      type: 'section',
      pageIndex: pageIndex,
    },
  })

  return (
    <div className={`section${isOver ? ' outline' : ''}`} ref={setNodeRef}>
      <p className="title">section {index + 1}</p>
      {children}
    </div>
  )
}
