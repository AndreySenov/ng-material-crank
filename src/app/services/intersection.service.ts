import { Injectable } from '@angular/core'

export interface IntersectionCallback {
  (target: Element): void
}

const callbackMap: { [id: string]: IntersectionCallback } = {}

function callback(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target
      const id = target.id
      const callback = callbackMap[id]
      if (callback) {
        callback(target)
        observer.unobserve(target)
      }
    }
  })
}

const options: IntersectionObserverInit = {}
const observer = new IntersectionObserver(callback, options)

@Injectable()
export class IntersectionService {

  observe(target: Element, callback: IntersectionCallback): void {
    const id = target.id
    if (!id) {
      throw new Error('The target element must have [id] attribute')
    }
    if (callbackMap[id]) {
      throw new Error(`The element with id=[${id}] has been already observable`)
    }
    callbackMap[id] = callback
    observer.observe(target)
  }
}
