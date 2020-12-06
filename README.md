# Markdown in Angular 11

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.3. Find full code on [GitHub](https://github.com/maxencerb/Markup_angular11).

## Disclaimer

Doing this requires for this version of angular at least, the default builder. So it's obviously incompatible while using other packages that requires other builers such as Tailwindcss, ...

## How to

First create your Angular 11 project

```bash
ng new app-name
cd app-name
```

Then install the `ngx-markup` package and install bootsrap for easier initialization.

```bash
npm i ngx-markup --save
ng add @ng-bootstrap/ng-bootstrap
```

Now the default option with the are not very good like the default styling for visited link. That's why I created a typescript file in my app folder called `markdown-render-options.ts`. That is where we are gonna overwrite some default styling. I found these styling pretty good but you can obviously change them and overwrite over defaults.

```typescript
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
```

Now go to your `app.module.ts` file and import the MarkDownModule with our custom renderer. You also have to import some scripts and Bootstrap.


```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
+import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
+import { HttpClientModule } from '@angular/common/http';
+import { markedOptionsFactory } from './markdown-render-options';

+import 'prismjs';
+import 'prismjs/components/prism-typescript.min.js';
+import 'prismjs/components/prism-bash.min.js';
+import 'prismjs/components/prism-diff.min.js';
+import 'prismjs/components/prism-javascript.min.js';
+import 'prismjs/components/prism-python.min.js';
+import 'prismjs/components/prism-css.min.js';
+import 'prismjs/components/prism-scss.min.js';
+import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
+import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
+import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
+   HttpClientModule,
+   MarkdownModule.forRoot({
+     loader : HttpClientModule,
+     markedOptions : {
+       provide : MarkedOptions,
+       useFactory : markedOptionsFactory
+     }
+   }),
+   NgbModule
  ],
  providers: [],
+ bootstrap: [AppComponent]
})
export class AppModule { }
```

You also have to import some scripts in your global styling file `style.scss` and add some global styling.

```scss
@import 'prismjs/themes/prism-okaidia.css';
@import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
@import 'prismjs/plugins/line-highlight/prism-line-highlight.css';

* {
  padding: 0;
  margin: 0;
}

@import '~bootstrap/scss/bootstrap';

hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
```

The last thing to do is to import the scripts and styling in the builder from the `angular.json` file.

```diff
"styles": [
  "src/styles.scss",
+ "node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css",
+ "node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css"
],
"scripts": [
+ "node_modules/marked/lib/marked.js",
+ "node_modules/prismjs/prism.js",
+ "node_modules/prismjs/plugins/highlight-keywords/prism-highlight-keywords.min.js",
+ "node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js",
+ "node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js",
+ "node_modules/prismjs/components/prism-bash.min.js",
+ "node_modules/prismjs/components/prism-diff.min.js",
+ "node_modules/prismjs/components/prism-javascript.min.js",
+ "node_modules/prismjs/components/prism-markdown.min.js",
+ "node_modules/prismjs/components/prism-python.min.js",
+ "node_modules/prismjs/components/prism-scss.min.js",
+ "node_modules/prismjs/components/prism-css.min.js",
+ node_modules/prismjs/components/prism-typescript.min.js"
]
```

Then you can implement the markup as follows : 

```html
<markdown lineNumbers [src]="'https://raw.githubusercontent.com/maxencerb/angular11_tailwindcss/master/README.md'"></markdown>
<!-- Or like this -->
<div markdown lineNumbers [data]="mardown_data"></div>
<!-- Or -->
<div markdown lineNumbers ngPreserveWhiteSpace>
  # Your Markdown header
  ...
</div>
```
