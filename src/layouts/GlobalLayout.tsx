import type * as elements from "typed-html";

export const GlobalLayout = ({ children }: elements.Children) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://unpkg.com/htmx.org@1.9.9" integrity="sha384-QFjmbokDn2DjBjq+fM+8LUIVrAgqcNW2s0PjAxHETgRn9l4fvX31ZxDxvwQnyMOX" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
  <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>
  <title>Document</title> 
</head>
  ${children}
</html>
`;
