# jquery.iframeShim (legacy)
Draws an empty iframe behind html element which are overlapped with an java applet in firefox

## Usage

```html
<ul class="navigation">
  <li class="js--iframeShim__button">
    <a href="#" title="Help">Menu</a>
    <ul class="js--iframeShim__dropdown">
        <li>
            <a href="...">SubMenu</a>
        </li>
        ...
    </ul>
  </li>
  ...
</ul>
```

```js
$('.js--iframeShim__dropdown').iframeShim({
  putInRoot: true,
  dropdownFor: '.js--iframeShim__button'
});
```
