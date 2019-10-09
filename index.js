module.exports = function ({ types: t }) {
  const directive_show = "r-show"
  function JSXElementVisitor(path) {
    path.traverse({ JSXElement: JSXElementVisitor })
    const element = path.node.openingElement
    const show_attr = getAndRemoveShowAttr(element)
    if (!show_attr) { return }
    function getAndRemoveShowAttr(openingElement) {
      if (openingElement.type !== 'JSXOpeningElement') { return; };
      const index = openingElement.attributes.findIndex(attr => (attr && attr.name && attr.name.name) === directive_show)
      if (index < 0) { return };
      const show_attr = openingElement.attributes[index].value
      openingElement.attributes = openingElement.attributes.filter(attr => attr.name && attr.name.name !== directive_show)
      return show_attr
    }
    // console.log(t.nullLiteral()) // 返回的ast🌲不能自己写出来json的要用t方法
    // 也就是{...}!==t.nullLiteral()
    // t.nullLiteral() // 这个方法会返回一个 null
    const newNode = t.jSXExpressionContainer(t.ConditionalExpression(show_attr.expression, path.node, t.nullLiteral()))
    path.replaceWith(newNode);

  }
  return {
    visitor: {
      JSXElement: JSXElementVisitor
    }
  }
}