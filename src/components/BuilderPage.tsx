import {FC, PropsWithChildren, useState} from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  pointerWithin,
  useDraggable,
  useDroppable
} from '@dnd-kit/core'
import {snapCenterToCursor} from '@dnd-kit/modifiers'
import ContentItem from './ContentItem.tsx'

const defaultState: State = {
  pages: [{
    sections: [{
      content: [{
        type: 'text',
        value: 'hello'
      }]
    }]
  }]
}

const Page: FC<PropsWithChildren<{ index: number }>> = ({index, children}) => {
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

const Section: FC<PropsWithChildren<{ index: number; pageIndex: number }>> = ({index, pageIndex, children}) => {
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

const Draggable: FC<PropsWithChildren<{ type: string }>> = ({type, children}) => {
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
  } = useDraggable({
    id: type,
    data: {
      type: type,
    },
  })

  return (<div className={`draggable${isDragging ? ' opacity' : ''}`}
               ref={setNodeRef} {...listeners} {...attributes}>{children}</div>)
}

const BuilderPage: FC = () => {
  const [content, setContent] = useState<State>(defaultState)
  const [activeId, setActiveId] = useState<string | null>(null)

  const addPage = () => {
    setContent(prev => {
      const newContent = structuredClone(prev)
      newContent.pages.push({sections: []})
      return newContent
    })
  }

  const addSection = (pageIndex: number) => {
    setContent(prev => {
      const newContent = structuredClone(prev)
      newContent.pages[pageIndex].sections.push({content: []})
      return newContent
    })
  }

  const addText = (pageIndex: number, sectionIndex: number) => {
    setContent(prev => {
      const newContent = structuredClone(prev)
      newContent.pages[pageIndex].sections[sectionIndex].content.push({type: 'text', value: Date.now().toString()})
      return newContent
    })
  }

  const addInput = (pageIndex: number, sectionIndex: number) => {
    setContent(prev => {
      const newContent = structuredClone(prev)
      const contentLength = newContent.pages[0].sections[sectionIndex].content.length
      newContent.pages[pageIndex].sections[sectionIndex].content.push({
        type: 'input',
        value: {name: `text${contentLength}`, label: `text${contentLength}`}
      })
      return newContent
    })
  }

  const addRadio = (pageIndex: number, sectionIndex: number) => {
    setContent(prev => {
      const newContent = structuredClone(prev)
      const contentLength = newContent.pages[0].sections[sectionIndex].content.length
      newContent.pages[pageIndex].sections[sectionIndex].content.push({
        type: 'radio',
        value: {name: `radio${contentLength}`, label: `radio${contentLength}`}
      })
      return newContent
    })
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event
    if (over?.data?.current && active?.data?.current) {
      if (over.data.current.type === 'page' && active.data.current.type !== 'section') {
        setActiveId(null)
        return
      }
      switch (active.data.current.type) {
        case 'section':
          addSection(over.data.current.id)
          break
        case 'text':
          addText(over.data.current.pageIndex, over.data.current.id)
          break
        case 'input':
          addInput(over.data.current.pageIndex, over.data.current.id)
          break
        case 'radio':
          addRadio(over.data.current.pageIndex, over.data.current.id)
          break
        default:
      }
    }
    setActiveId(null)
  }

  return (
    <>
      <DndContext
        modifiers={[snapCenterToCursor]}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="main">
          <div className="content">
            {content.pages.map((page, pageIndex) => (
              <Page key={pageIndex} index={pageIndex}>
                <>
                  {page.sections.map((section, sectionIndex) => (
                    <Section index={sectionIndex} pageIndex={pageIndex} key={sectionIndex}>
                      <>
                        {section.content.map((item, itemIndex) => (
                          <div key={itemIndex} className={'form-content'}>
                            <ContentItem content={item} isBuilder/>
                          </div>
                        ))}
                      </>
                    </Section>
                  ))}
                </>
              </Page>
            ))}
          </div>
          <div className="sidebar">
            <Draggable type={'section'}>section
            </Draggable>
            <Draggable type={'text'}>text</Draggable>
            <Draggable type={'input'}>input</Draggable>
            <Draggable type={'radio'}>radio</Draggable>

            <DragOverlay>
              {activeId ?
                <div className={'draggable'}>{activeId}</div>
                : null}
            </DragOverlay>

            <button type={'button'} className={'save-button'} onClick={() => localStorage.setItem('form', JSON.stringify(content))}>Save</button>
          </div>
          <button type={'button'} onClick={addPage} className={'addPageBtn'}>+</button>
        </div>
      </DndContext>
    </>
  )
}

export default BuilderPage
