import {useEffect, useRef, useState} from 'react'
import {Page, Section} from './Components.tsx'
import ContentItem from './ContentItem.tsx'

const PreviewPage = () => {
  const [currentForm, setCurrentForm] = useState<State | null>()
  const firstLoad = useRef(true)
  const [paginator, setPaginator] = useState<{ pages: number, current: number }>({pages: 0, current: 0})

  const stepForward = () => {
    setPaginator(prev => ({
      ...prev,
      current: prev.current + 1
    }))
  }

  const stepBackward = () => {
    setPaginator(prev => ({
      ...prev,
      current: prev.current - 1
    }))
  }

  useEffect(() => {
    if (firstLoad.current) {
      const storageContent = localStorage.getItem('form')
      if (storageContent) {
        const form: State = JSON.parse(storageContent)
        setCurrentForm(form)
        setPaginator({pages: form.pages.length, current: 0})
      } else {
        setCurrentForm(null)
      }

      firstLoad.current = false
    }
  }, [])

  if (!currentForm && firstLoad.current) {
    return <h1>Loading...</h1>
  }

  if (!currentForm) {
    return <h1>Form not found</h1>
  }

  return <div className={'preview-content'}>{
    <Page index={paginator.current}>
      <>
        {currentForm.pages[paginator.current].sections.map((section, sectionIndex) => (
          <Section index={sectionIndex} pageIndex={paginator.current} key={sectionIndex}>
            <>
              {section.content.map((item, itemIndex) => (
                item.status === 'hidden' ? null : <div key={itemIndex} className={'form-content'}>
                  <ContentItem content={item}/>
                </div>
              ))}
            </>
          </Section>
        ))}
      </>
    </Page>
  }
    {paginator.pages > 0 && <div className={'paginator'}>
      <button type={'button'} disabled={paginator.current === 0} onClick={stepBackward}>{'<'}</button>
      <button type={'button'} disabled={paginator.current === currentForm.pages.length - 1}
              onClick={stepForward}>{'>'}</button>
    </div>}
  </div>
}

export default PreviewPage
