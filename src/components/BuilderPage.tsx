import {FC, useState} from 'react'

type Section = {
  content: {
    type?: 'text' | 'input' | 'radio'
    value?: string
  }[]
}

type Page = {
  sections: Section[]
}

type State = {
  pages: Page[]
}

const BuilderPage: FC = () => {
  const [content, setContent] = useState<State>({
    pages: [{
      sections: [{
        content: [{
          type: 'text',
          value: 'hello'
        }]
      }, {content: [{type: 'text', value: 'hello'}]}]
    }]
  })

  return (
    <>
      <div className="main">
        <div className="content">
          {content.pages.map((page, pageIndex) => (
            <div className="page">
              <p className="title">page {pageIndex + 1}</p>
              {page.sections.map((_section, sectionIndex) => (
                <div className="section">
                  <p className="title">section {sectionIndex + 1}</p>

                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="sidebar">
          <button>section</button>
          <button>text</button>
          <button>input</button>
          <button>radio</button>
        </div>
      </div>
    </>
  )
}

export default BuilderPage
