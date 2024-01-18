import {FC} from 'react'

const ContentItem: FC<{ content: Content; isBuilder?: boolean }> = ({content, isBuilder = false}) => {
  if (!isBuilder && content.status === 'hidden') {
    return null
  }

  switch (content.type) {
    case 'text':
      return <h4>{content.value as string}</h4>
    case 'input':
      return <div className={'input-wrapper'}>
        <label>{(content.value as { [key: string]: string }).label}</label>
        <input type={'text'} name={(content.value as { [key: string]: string }).name} disabled={isBuilder}/>
      </div>
    case 'radio':
      return <div className={'input-wrapper'}>
        <label>{(content.value as { [key: string]: string }).label}</label>
        <input type={'radio'} name={(content.value as { [key: string]: string }).name + '1'} disabled={isBuilder}/>
        <input type={'radio'} name={(content.value as { [key: string]: string }).name + '2'} disabled={isBuilder}/>
      </div>
    default:
      return null
  }
}

export default ContentItem
