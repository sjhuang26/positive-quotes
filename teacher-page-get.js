console.log(JSON.stringify((() => {
  const items = Array.from(document.querySelectorAll('#main > article.page.type-page > div.entry-content > *'))
  const result = [];
  let currentHeader = null;
  for (const item of items) {
    if (item.nodeName === 'P') {
      // a no-subject field
      result.push({
        department: '',
        text: item.innerHTML
      });
    } else if (item.nodeName === 'UL') {
      if (currentHeader) {
        for (const child of Array.from(item.children)) {
          if (child.nodeName === 'LI') {
            result.push({
              department: currentHeader,
              text: child.innerHTML
            });
          }
        }
      }
    } else if (item.nodeName === 'H2') {
      currentHeader = item.innerText.trim();
      if (currentHeader === 'Departments') {
        // this header doesn't count!
        currentHeader = null;
      }
    }
    // ignore all other node names
  }

  return result;
})()));