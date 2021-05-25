const DEFAULT_SETTINGS = {
  // Defines the default values
  // These should also be updated in the value fields of options.html
  // Obtained from `wc -c Google/Chrome/Floc/<version>/SortingLshClusters`
  // Thanks to Bennet Cyphers for explaining how to obtain this number
  cohort_id_range: "1-33872",
  cohort_id_update_interval: 1,
  cohort_id_update_interval_type: "requests",
  cohort_version: "chrome/1.1",
  // Can be either a number of request or datetime
  // If it is a datetime, it is the time of the last update
  // If it is for requests, it is the number of requests since the last update
  time_since_last_update: 1,
  id: undefined,
};

function load_settings() {
  return browser.storage.local.get(DEFAULT_SETTINGS);
}
