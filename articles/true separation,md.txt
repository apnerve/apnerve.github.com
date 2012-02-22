# In ssearch of true separation

Separation, in web design, is a good thing. Content, style and behavior all deserve their own space.

```
    <style>
      /* some rules here */
    </style>
```
This is like saying

Dear browser,
I've written an inline stylesheet. Please apply those rules to paint the render tree.

```
    <style>
      @import "style.css";
    </style>
```
translates to

Dear browser,
I've written an inline stylesheet which uses @import to import rules from style.css. Please use those rules to paint the render tree.

```
<link rel="stylesheet" href="style.css">
```

translates to

Dear browser,
I've written the rules in an external stylesheet. Please refer to those rules to paint the render tree.