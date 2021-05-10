const DEFAULT_SETTINGS = {
  // Defines the default values
  // These should also be updated in the value fields of options.html
  cohort_id_range: "0-4294967295",
  cohort_id_update_interval: "1 req",
  cohort_version: "chrome/1.1"
};

function load_settings() {
  return browser.storage.local.get(DEFAULT_SETTINGS);
}

//Content scripts cannot use native modules
//export { DEFAULT_SETTINGS, load_settings };
