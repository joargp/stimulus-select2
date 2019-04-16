# Select 2 integration for Stimulus.js

## Usage

1. Install with `npm install stimulus-select2'
2. Register component with Stimulus

```
import { Application } from "stimulus"
import Select2Controller from 'stimulus-select2'

const application = Application.start()
application.register("select2", Select2Controller)

```
3. Sprinkle your html
   
```
<select data-controller="select2">
  <option value="blue">blue</option>
  <option value="green">green</option>
  <option value="red">red</option>
</select>

```


## Development

[]

* `npm run build` - build version for distribution `lib` folder
* `npm run dev` - build with a watcher


### Releases

Project must be built (to 'lib' folder) before publishing to npm