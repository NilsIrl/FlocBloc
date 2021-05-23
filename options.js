//import { DEFAULT_SETTINGS, load_settings } from "./settings.mjs";

window.onload = (event) => {
  load_settings().then(settings => {
    let form = document.forms.options;
    let cohort_id_range_input = document.getElementById("cohort_id_range");
    let cohort_id_update_interval_input = document.getElementById("cohort_id_update_interval");
    let cohort_id_update_interval_type_input = form.elements.cohort_id_update_interval_type;
    let cohort_id_update_interval_type_style = document.getElementById("cohort_id_update_interval_type")
    let cohort_version_input = document.getElementById("cohort_version");
    let form_submit = document.getElementById("form_submit");

    function save_settings(event) {
      event.preventDefault();
      settings = {
        cohort_id_range: cohort_id_range_input.value,
        cohort_id_update_interval: cohort_id_update_interval_input.value,
        cohort_id_update_interval_type: cohort_id_update_interval_type_input.value,
        cohort_version: cohort_version_input.value
      };
      browser.storage.local.set(settings);
      input_show_updated();
    }
    function display_settings(settings) {
      cohort_id_range_input.value = settings.cohort_id_range;
      cohort_id_update_interval_input.value = settings.cohort_id_update_interval;
      cohort_id_update_interval_type_input.value = settings.cohort_id_update_interval_type;
      cohort_version_input.value = settings.cohort_version;
    }
    function input_show_updated() {
      let changed = false;
      if (settings.cohort_id_range != cohort_id_range_input.value) {
        changed = true;
        cohort_id_range_input.style.color = 'orange';
      } else {
        cohort_id_range_input.style.color = '';
      }

      if (settings.cohort_id_update_interval != cohort_id_update_interval_input.value) {
        changed = true;
        cohort_id_update_interval_input.style.color = 'orange';
      } else {
        cohort_id_update_interval_input.style.color = '';
      }

      if (settings.cohort_id_update_interval_type != cohort_id_update_interval_type_input.value) {
        changed = true;
        cohort_id_update_interval_type_style.style.color = "orange";
      } else {
        cohort_id_update_interval_type_style.style.color = "";
      }

      if (settings.cohort_version != cohort_version_input.value) {
        changed = true;
        cohort_version_input.style.color = 'orange';
      } else {
        cohort_version_input.style.color = '';
      }

      if (changed) {
        form_submit.style.color = 'orange';
      } else {
        form_submit.style.color = '';
      }
    }

    display_settings(settings);

    form.addEventListener("submit", save_settings);

    form.addEventListener("change", input_show_updated);
    form.addEventListener("reset", (event) => {
      event.preventDefault();
      display_settings(DEFAULT_SETTINGS);
      input_show_updated();
    });
  });
}
