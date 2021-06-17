function generate_cohort_id(settings) {
  // TODO: benchmark this and figure out if it shouldn't be computed on each
  // request
  let number_of_possible_cohort_ids = 0;
  const ranges = settings.cohort_id_range.split(",").map(range => {
    const range_split = range.split("-");
    let max;
    if (range_split.length == 1) {
      ++number_of_possible_cohort_ids;
      max = parseInt(range_split[0]);
    } else if (range_split.length == 2) {
      let min = parseInt(range_split[0]);
      max = parseInt(range_split[1]);
      number_of_possible_cohort_ids += max - min + 1;
    } else {
      // UNREACHABLE
    }
    return [number_of_possible_cohort_ids, max];
  });

  const cohort_index = Math.floor(Math.random() * number_of_possible_cohort_ids);
  const range = ranges[ranges.findIndex(range => cohort_index < range[0])];
  const id = range[1] - range[0] + cohort_index + 1;
  return id;
}

// TODO Is this really necessary? Maybe there is a way to run the content
// script only when it is in a secure context
// Is checking for https enough?
// https://wicg.github.io/floc/#the-api
// https://html.spec.whatwg.org/multipage/webappapis.html#secure-context
if (window.isSecureContext) {
  load_settings().then(settings => {
    const scriptElement = document.createElement('script');

    switch (settings.cohort_id_update_interval_type) {
      case "requests":
        if (settings.id == null || settings.time_since_last_update >= settings.cohort_id_update_interval) {
          settings.time_since_last_update = 1;
          settings.id = generate_cohort_id(settings);
        } else {
          ++settings.time_since_last_update;
        }
        break;
      case "seconds":
        if (settings.id == null || Date.now() - settings.time_since_last_update >= settings.cohort_id_update_interval * 1000) {
          settings.time_since_last_update = Date.now();
          settings.id = generate_cohort_id(settings);
        }
        break;
      default:
        // UNREACHABLE
        break;
    }

    browser.storage.local.set({
      time_since_last_update: settings.time_since_last_update,
      id: settings.id,
    });

    scriptElement.innerHTML = `
document.interestCohort = function() {
  return new Promise((resolve, reject) => {
    resolve({
      id: "${settings.id}",
      version: "${settings.cohort_version}"
    });
  });
}`;

    // https://github.com/duckduckgo/duckduckgo-privacy-extension/pull/591/files#diff-b9c2f21e09ff892c03a33cdbfbd1feb4ea951190527b36d08fe3d93a55ef2793
    document.documentElement.prepend(scriptElement);
    document.documentElement.removeChild(scriptElement);
  });
}

