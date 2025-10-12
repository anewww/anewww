import fs from 'fs';

const calcAge = () => {
  return (new Date().getFullYear() - 2003).toString();
}

const getDayOfWeek = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[new Date().getDay()] ?? 'Monday';
}

const getLastUpdated = () => {
  return new Date().toISOString().split('T')[0];
}

const updateReadme = (readme, foo, regex) => {
  return readme.replace(
    regex,
    (match, g1) => `${g1}${foo()}`
  );
}

const updates = {
  age: {
    foo: calcAge,
    regex: /(- Age: `)(\d{1,3})/,
  },
  day: {
    foo: getDayOfWeek,
    regex: /(- Quote: `"Today is )(\S+)/,
  },
  lastUpdated: {
    foo: getLastUpdated,
    regex: /(`Last updated: )(\d{4}-\d{1,2}-\d{1,2})/,
  },
}

try {
  let readme = fs.readFileSync('./README.md', 'utf8');
  Object.values(updates).forEach(value => {
    readme = updateReadme(readme, value.foo, value.regex);
  });
  // console.log(readme);
  fs.writeFileSync('./README.md', readme, 'utf8');
  console.log('Success updating README.md');
}
catch (err) {
  console.error('Something went wrong updating README.md:', err);
}
