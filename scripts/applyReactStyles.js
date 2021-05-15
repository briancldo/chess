const fs = require('fs');
const path = require('path');
const camelCase = require('lodash/camelCase');

function transformStyle(style) {
  const _style = style[style.length - 1] === ';' ? style.slice(0, -1) : style;
  const propertyStrings = _style.split(/; ?/);
  const propertyMappings = propertyStrings.map((str) => str.split(':'));

  const styleObj = {};
  propertyMappings.forEach(([property, value]) => {
    styleObj[camelCase(property)] = value;
  });
  return styleObj;
}

const args = process.argv;
if (args.length < 3)
  throw new Error('Script needs a file path relative to src directory.');
const filepathRelativeSrc = args[2];
const filepath = path.join(__dirname, '..', 'src', filepathRelativeSrc);
const file = fs.readFileSync(filepath).toString();

const fileWithReplacements = file.replace(
  /style='[^']*'/g,
  (styleProp) =>
    `style={${JSON.stringify(
      transformStyle(styleProp.split('style=').pop().slice(1, -1))
    )}}`
);
fs.writeFileSync(filepath, Buffer.from(fileWithReplacements));
