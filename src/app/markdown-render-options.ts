import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = (text: string) => {
    return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
  };

  renderer.link = (href : string, title: string, text: string) => {
    return `<a href="${href}" title="link" class="link">${text}</a>`;
  }

  renderer.codespan = (code : string) : string => {
    return `<span class="bg-secondary px-1 rounded text-white">${code}</span>`
  }

  renderer.heading = (text: string, level, raw, slugger) : string => {
    return `<br><h${level}>${text}</h${level}>
            <hr class="w-${level == 1 ? 100 : level == 2 ? 75 : 50}"/><br>`
  }

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false,
  };
}
