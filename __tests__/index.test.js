const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Index.html structure', () => {
  let document;

  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
    const dom = new JSDOM(html);
    document = dom.window.document;
  });

  test('contains Dysbiosis Animation section with expected content', () => {
    const section = document.querySelector('#dysbiosis-animation');
    expect(section).not.toBeNull();

    const heading = section.querySelector('h2');
    expect(heading).not.toBeNull();
    expect(heading.textContent).toContain('Gut Dysbiosis Animation');

    const bulletItems = Array.from(section.querySelectorAll('li')).map(li => li.textContent.trim());
    expect(bulletItems).toContain('Malabsorption leading to nutrient deficiencies');
  });
});
