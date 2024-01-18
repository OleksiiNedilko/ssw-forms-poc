/// <reference types="vite/client" />


type Content = {
  type?: 'text' | 'input' | 'radio'
  status: 'active' | 'hidden'
  value?: string | { [key: string]: string }
}

type Section = {
  content: Content[]
}

type Page = {
  sections: Section[]
}

type State = {
  pages: Page[]
}
