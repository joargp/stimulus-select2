import { Application } from "@hotwired/stimulus";
import Select2Controller from "../src/index";

const application = Application.start();

application.register('select2', Select2Controller);
