function renderBlocks(blocks) {
  return blocks.map((block, index) => {
    if (block.type === 'text') {
      return (
        <div key={index} className="space-y-3">
          {block.lines.map((line, lineIndex) => (
            <p key={lineIndex} className="text-muted-foreground leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      );
    }

    if (block.type === 'list') {
      return (
        <ul
          key={index}
          className="list-disc list-inside space-y-2 text-muted-foreground my-3"
        >
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    }

    return null;
  });
}

export { renderBlocks };
