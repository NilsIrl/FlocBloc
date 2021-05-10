// TODO Is this really necessary? Maybe there is a way to run the content
// script only when it is in a secure context
// Is checking for https enough?
// https://wicg.github.io/floc/#the-api
// https://html.spec.whatwg.org/multipage/webappapis.html#secure-context
if (window.isSecureContext) {
  load_settings().then(settings => {
    const scriptElement = document.createElement('script');

    // TODO: benchmark this and figure out if it shouldn't be computed on each
    // request
    let ranges = [];
    let number_of_possible_cohort_ids = 0;
    for (const range of settings.cohort_id_range.split(",")) {
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
        // TODO guarantee this is unreachable or do something if it isn't
      }
      ranges.push([number_of_possible_cohort_ids, max]);
    }

    const cohort_index = Math.floor(Math.random() * number_of_possible_cohort_ids);
    const range = ranges[ranges.findIndex(range => cohort_index < range[0])];
    const id = range[1] - range[0] + cohort_index + 1

    // TODO: fake this shit
    // https://stackoverflow.com/questions/67392780/how-to-override-tostring-recursively-on-a-function
    scriptElement.innerHTML = `
document.interestCohort = function() {
  return new Promise((resolve, reject) => {
    resolve({
      id: "${id}",
      version: "${settings.cohort_version}"
    });
  });
}`;
    document.documentElement.prepend(scriptElement);
    document.documentElement.removeChild(scriptElement);
  });
}

