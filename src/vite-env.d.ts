/// <reference types="vite/client" />


type Content = {
  type?: 'text' | 'input' | 'radio'
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
