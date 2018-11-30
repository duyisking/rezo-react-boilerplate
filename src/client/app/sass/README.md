# IMPORTANT
When using url() in Sass, make sure to add '~' before the path. <br />
This help webpack to locate the alias to the absolute path.
Ex:
```
background-image: url(~images/an_image.png)
```